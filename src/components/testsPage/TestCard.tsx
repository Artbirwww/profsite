import "./css/testCardStyles.css"

import { FC, memo, useRef, MouseEvent, useEffect } from "react"
import { TestItem } from "./TestsData"
import { Timer, FileQuestion, ArrowRight, CheckCheck } from "lucide-react"

interface TestItemProps {
    item: TestItem
    dataId: string
    index?: number
    isAvailable?: boolean
    isComplete?: boolean
    onClick: (path: string) => void
    resultOnClick: (path: string) => void
}

export const TestCard: FC<TestItemProps> = memo(({ item, dataId, isAvailable, isComplete, onClick, resultOnClick }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const targetPos = useRef({ x: 0, y: 0 })
    const currentPos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        let frameId: number

        const animate = () => {
            const lerpFactor = 0.1

            currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor
            currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor

            if (cardRef.current) {
                cardRef.current.style.setProperty("--mouse-x", `${currentPos.current.x}px`)
                cardRef.current.style.setProperty("--mouse-y", `${currentPos.current.y}px`)
            }

            frameId = requestAnimationFrame(animate)
        }

        frameId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(frameId)
    }, [])

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()

        targetPos.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        }
    }

    const handleClick = () => {
        if (!isAvailable)
            return

        if (item.path)
            onClick(item.path)
    }

    const declension = (count: number, titles: [string, string, string]) => {
        const cases = [2, 0, 1, 1, 1, 2]
        return titles[
            count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
        ]
    }

    return (<>
        <div ref={cardRef}
            className={`test-selection-item ${!isAvailable ? "locked" : ""} ${isComplete ? "complete" : ""}`}
            onMouseMove={handleMouseMove}
            data-id={dataId}
            onClick={handleClick}>

            <div className="hover-circle" />

            <div className="test-selection-item-label">
                <div className="test-selection-item-name">
                    <h4>{item.label}</h4>
                    <span>{item.author}</span>
                </div>
            </div>

            {!isComplete && (
                <div className="test-selection-item-description">
                    <span>{item.description}</span>
                </div>
            )}

            <div className="test-selection-item-info">
                <div className="test-selection-item-hint">
                    <Timer />
                    <span>{item.time} {declension(item.time, ["минута", "минуты", "минут"])}</span>
                </div>

                <div className="test-selection-item-hint">
                    <FileQuestion />
                    <span>{item.questionscount} {declension(item.questionscount, ["вопрос", "вопроса", "вопросов"])}</span>
                </div>
            </div>

            <div className="test-selection-decal">
                {isComplete ? <CheckCheck /> : <ArrowRight />}
            </div>
        </div>

        {isComplete && (
            <div className="test-selection-result">
                <h4>Результаты</h4>

                <div className="test-selection-decal">
                    <ArrowRight />
                </div>
            </div>
        )}
    </>)
})