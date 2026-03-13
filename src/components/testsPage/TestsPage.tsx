import "./css/testsPageStyles.css"

import { FC, useCallback, useEffect, useRef, useState } from "react"
import { testsList } from "./TestsData"
import { TestComponent } from "./TestComponent"
import { useNavigate } from "react-router-dom"
import { CheckCheck } from "lucide-react"

export const TestsPage: FC = ({ }) => {
    const navigate = useNavigate()
    const testContainerRef = useRef<HTMLDivElement>(null)

    const [visibleIds, setVisibleIds] = useState<number[]>([])

    useEffect(() => {
        const container = testContainerRef.current
        if (!container) return

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
        <div
            className="test-wrapper">

            <div
                className="test-header">

                <div
                    className="test-header-text">

                    Тестирование
                </div>


                <div
                    className="test-additional-text">

                    3 / {testsList.length}
                    <CheckCheck size={20} strokeWidth={2} className="test-item-icon" />
                </div>

                <div
                    className="test-completness-progress-bar-container">

                    <div
                        className="progress-bar-line"
                        style={{ width: "30%" }} />
                </div>
            </div>

            <div
                ref={testContainerRef}
                className="test-grid">

                {testsList.map((item, index) => (

                    <div
                        key={index}
                        data-id={index}
                        className="test-grid-item">

                        <TestComponent
                            dataId={item.id}
                            item={item}
                            onClick={handleClick} />
                    </div>
                ))}
            </div>

            <div
                className="test-indicator">

                {testsList.map((_, index) => (

                    <div
                        key={index}
                        className={`dot ${visibleIds.includes(index) ? "active" : ""}`} />
                ))}
            </div>
        </div>

    )
}