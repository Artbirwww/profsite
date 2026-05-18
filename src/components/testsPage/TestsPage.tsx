import "./css/layoutGrid.css"
import "./css/progressBar.css"

import { FC, useCallback, useEffect, useRef, useState } from "react"
import { testsList } from "./TestsData"
import { TestCard } from "./TestCard"
import { useNavigate } from "react-router-dom"
import { CheckCheck } from "lucide-react"
import { testApi } from "../../services/api/testApi"
import { useAuth } from "../../contexts/AuthContext"
import { TestResultResponse } from "../../types/testTypes"

export const TestsPage: FC = ({ }) => {
    const navigate = useNavigate()
    const { getToken } = useAuth()
    const testContainerRef = useRef<HTMLDivElement>(null)

    const [displayProgress, setDisplayProgress] = useState(0)
    const [visibleIds, setVisibleIds] = useState<number[]>([])
    const [recentTests, setRecentTests] = useState<Record<string, TestResultResponse>>({})
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerHeight < 768)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const loadRecentTests = async () => {
            try {
                const tests = await testApi.getRecentTests(getToken())
                setRecentTests(tests || {})

            } catch (error) {
                console.error("Failed to load recent tests:", error)
            }
        }

        loadRecentTests()
    }, [recentTests])

    useEffect(() => {
        if (!recentTests || testsList.length === 0) return

        const completedCount = Object.keys(recentTests).length
        const rawPercent = (completedCount / testsList.length) * 100
        const finalPercent = isMobile ? Math.min(rawPercent, 100) : Math.min(Math.max(rawPercent, 0), 95)

        const timer = setTimeout(() => setDisplayProgress(finalPercent), 100)
        return () => clearTimeout(timer)
    }, [recentTests, isMobile])

    useEffect(() => {
        const container = testContainerRef.current
        if (!container) return

        const observer = new IntersectionObserver(
            (entries) => {
                setVisibleIds((prev) => {
                    let updated = [...prev]
                    let hasChanges = false

                    entries.forEach((entry) => {
                        const id = Number(entry.target.getAttribute("data-id"))
                        if (entry.isIntersecting) {
                            entry.target.classList.add("show")
                            if (!updated.includes(id)) {
                                updated.push(id)
                                hasChanges = true
                            }
                        } else {
                            entry.target.classList.remove("show")
                            if (updated.includes(id)) {
                                updated = updated.filter((i) => i !== id)
                                hasChanges = true
                            }
                        }
                    })

                    return hasChanges ? updated.sort((a, b) => a - b) : prev
                })
            },
            { root: container, threshold: 0.15 }
        )

        const items = container.querySelectorAll(".test-card")
        items.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    const handleClick = useCallback((path: string) => {
        navigate(path)
    }, [navigate])

    return (
        <div className="test-container">

            {/* Прогресс-бар */}
            <div className="progress-container">
                <div
                    className="progress-fill"
                    style={isMobile ? { width: `${displayProgress}%` } : { height: `${displayProgress}%` }}>

                    {!isMobile && <div className="wave-element wave-front" />}
                    {!isMobile && <div className="wave-element wave-back" />}
                </div>

                <div className="progress-count">
                    <CheckCheck />
                    <span>{Object.keys(recentTests).length} / {testsList.length}</span>
                </div>
            </div>

            {/* Сетка карточек */}
            <div
                ref={testContainerRef}
                className="test-grid">
                {testsList.map((item, index) => {
                    return (
                        <TestCard
                            key={item.id || index}
                            dataId={item.id}
                            index={index}
                            isAvailable={item.isAvailable}
                            item={item}
                            onClick={handleClick}
                            resultOnClick={handleClick}
                            isComplete={!!recentTests[item.name]}
                            className={"test-card"}
                            data-id={index} />
                    )
                })}
            </div>

            {/* Индикатор страниц */}
            <div className="test-indicator">
                {testsList.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${visibleIds.includes(index) ? "active" : ""}`} />
                ))}
            </div>
        </div>
    )
}