import "./css/testsPageStyles.css"

import { FC, useCallback, useEffect, useRef, useState } from "react"
import { testsList } from "./TestsData"
import { TestComponent } from "./TestComponent"
import { useNavigate } from "react-router-dom"
import { Check } from "lucide-react"
import { Toaster } from "react-hot-toast"
import { testApi } from "../../services/api/testApi"
import { useAuth } from "../../contexts/AuthContext"
import { TestResultResponse } from "../../types/testTypes"

export const TestsPage: FC = ({ }) => {
    const navigate = useNavigate()
    const {getToken} = useAuth()

    const testContainerRef = useRef<HTMLDivElement>(null)

    const [displayHeight, setDisplayHeight] = useState(0)
    const [visibleIds, setVisibleIds] = useState<number[]>([])

    const [recentTests, setRecentTests] = useState<Record<string, TestResultResponse>>({})

    const calculateProgress = (current: number, total: number) => {
        if (total <= 0)
            return 0

        const rawPercent = (current / total) * 100

        return Math.min(Math.max(rawPercent, 0), 95)
    }

    useEffect(() => {
        if (!recentTests) return
        const timer = setTimeout(() => {
            console.log("set height")
            setDisplayHeight(calculateProgress(Object.keys(recentTests).length, testsList.length))
        }, 100)

        return () => clearTimeout(timer)
    }, [recentTests])
    useEffect(()=> {
        const loadRecentTests = async () => {
            const tests = await testApi.getRecentTests(getToken())
            console.log(tests)
            setRecentTests(tests)
        }
        loadRecentTests()
    }, [])

    useEffect(() => {
        const container = testContainerRef.current
        if (!container)
            return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {

                    const index = Number(entry.target.getAttribute("data-id"))

                    if (entry.isIntersecting) {
                        entry.target.classList.add("show")
                        setVisibleIds(prev => (prev.includes(index) ? prev : [...prev, index]))

                    } else {
                        entry.target.classList.remove("show")
                        setVisibleIds(prev => prev.filter(i => i !== index))
                    }
                })
            },
            {
                root: container,
                threshold: .2,
            }
        )

        const items = container.querySelectorAll(".test-grid-item")
        items.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [testsList.length])

    const handleClick = useCallback((path: string) => {
        navigate(path)
    }, [navigate])

    return (
        <div className="test-wrapper">

            <div className="test-header">
                <h1>Тестирование</h1>
            </div>

            <div className="test-container">
                <div className="test-completness">
                    <div className="test-count">
                        {/*TODO - Подсосать данные о кол-во выполненых тестах и подставить вместо N*/}
                        <span><Check size={18} strokeWidth={1.5} />{Object.keys(recentTests).length}</span>
                        <div className="divider"></div>
                        <span>{testsList.length}</span>
                    </div>
                    <div className="progress-container">
                        <div className="progress-fill" style={{ height: `${displayHeight}%` }}>
                            <div className="wave-element wave-front" />
                            <div className="wave-element wave-back" />
                        </div>
                    </div>
                </div>

                <div ref={testContainerRef} className="test-grid">
                    {testsList.map((item, index) => {
                        return (
                            <div key={index} data-id={index} className="test-grid-item">
                                <TestComponent
                                    dataId={item.id}
                                    index={index}
                                    isAvailable={item.isAvailable}
                                    item={item}
                                    onClick={handleClick}
                                    isComplete = {recentTests ? recentTests[item.name] != null : false} />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="test-indicator">
                {testsList.map((_, index) => (
                    <div key={index} className={`dot ${visibleIds.includes(index) ? "active" : ""}`} />
                ))}
            </div>

        </div>
    )
}