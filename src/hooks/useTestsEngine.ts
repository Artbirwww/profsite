import { useCallback, useMemo, useState } from 'react'
import { TestConfig } from '../components/OLD_tests/testEngine/testsTypes'
import { stat } from 'fs'

export const useTestsEngine = (testConfig: TestConfig, onComplete: (results: any) => void) => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)

    const [answers, setAnswers] = useState<any[]>(() => 
        testConfig.questions.map(q => q.type === "distribution" ? Array(q.options.length).fill(0) : null)
    )

    const [remainingTime, setRemainigTime] = useState(testConfig.timer || 0)

    const stats = useMemo(() => {
        const answeredCount = answers.filter(a => 
            a !== null && (Array.isArray(a) ? a.some(val => val > 0) : true)
        ).length

        return {
            answeredCount,
            progress: Math.round((answeredCount / testConfig.questions.length) * 100),
            isLast: currentQuestion === testConfig.questions.length - 1,
            isFirst: currentQuestion === 0,
        }
    }, [answers, currentQuestion, testConfig.questions.length])

    const questionInfo = useMemo(() => {
        const questions = testConfig.questions

        if (!questions.length) return { blockIndex: 0, questionBlockIndex: 0, totalInBlock: 0 }

        const currentCategory = questions[currentQuestion].category

        let start = currentQuestion
        while (start > 0 && questions[start - 1].category === currentCategory) start--

        let end = currentQuestion
        while (end < questions.length - 1 && questions[end + 1].category === currentCategory) end++

        let blockCount = 0
        let lastCat = ""
        for (let i = 0; i <= start; i++) {
            if (questions[i].category !== lastCat) {
                lastCat = questions[i].category || ""
                blockCount++
            }
        }

        return {
            blockIndex: blockCount,
            questionBlockIndex: currentQuestion - start + 1,
            totalInBlock: end - start + 1,
        }
    }, [currentQuestion, testConfig.questions])

    const completeTest = useCallback(async () => {
        try {
            const results = testConfig.calculateScore(answers, testConfig.questions)
            console.log("Тест завершен")
            
        } catch (error) {
            console.error("Error while complete test:", error)
        } 
    }, [answers, testConfig, remainingTime, onComplete])

    const handleAnswer = useCallback((answer: any) => {
        setAnswers(prev => {
            const next = [...prev]
            next[currentQuestion] = answer
            return next
        })
    }, [currentQuestion])

    const handleNext = useCallback(() => {
        if (stats.isLast) {
            completeTest()
        } else {
            setCurrentQuestion(v => v + 1)
        }
    }, [stats.isLast, completeTest])

    const handlePrevious = useCallback(() => {
        setCurrentQuestion(v => Math.max(0, v - 1))
    }, [])

    const handleSkip = useCallback(() => {
        if (!stats.isLast) {
            setCurrentQuestion(v => v + 1)
        }
    }, [stats.isLast])

    return {
        state: {
            currentQuestion,
            answers,
            remainingTime,
            isCompleted,
            questionInfo,
            ...stats,
        },
        actions: {
            handleAnswer,
            handleNext,
            handlePrevious,
            handleSkip,
            completeTest,
            setCurrentQuestion,
        },
    }
}