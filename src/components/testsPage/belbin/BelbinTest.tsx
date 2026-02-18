import { Dispatch, SetStateAction, useEffect, useReducer, useRef, useState } from "react"
import { BelbinQuestion, groupQuestions } from "./belbinData"
import { ConstantSumSlider, SliderData } from "../generalTemplates/constantSumSlider/ConstantSumSlider"
import { useNavigate } from "react-router-dom"

export const BelbinTest = () => {
    const [currentGroupNumber, setCurrentGroupNumber] = useState<number>(0)
    const [currentQuestions, setCurrentQuestions] = useState<BelbinQuestion[]>(groupQuestions[currentGroupNumber])
    const [groupQuestionsResult, setGroupQuestionsResult] = useState<BelbinQuestion[][]>([])
    const maxValue: number = 10

    const navigate = useNavigate()
    //waterfall changes, next page -> save array of cerrent qs -> next group of qs

    useEffect(()=> {
        if (groupQuestions && groupQuestions[currentGroupNumber])
            setCurrentQuestions(groupQuestions[currentGroupNumber])
    }, [currentGroupNumber])
    
    const nextQuestionsGroup = () => {
        
        const updatedResults = [...groupQuestionsResult, currentQuestions]
        if (currentGroupNumber === groupQuestions.length-1) {
            console.log(groupQuestionsResult)
            navigate("/tests/belbin-results", {
                state: {
                    groupQuestionsResult: updatedResults
                }
            })
            return
        }
        setGroupQuestionsResult(updatedResults)
        setCurrentGroupNumber(prev => prev + 1)
    }
    return (<>
        <p>Вопрос номер {currentGroupNumber + 1}</p>
        <ConstantSumSlider sliders={currentQuestions} setSliders={setCurrentQuestions as Dispatch<SetStateAction<SliderData[]>>} nextPage={nextQuestionsGroup} maxValue={maxValue} />
    </>)
}