import React, { FC, memo, useRef, useState } from "react"
import { TestItem } from "./TestsData"
import { Timer, FileQuestion, ArrowRight } from "lucide-react"
import { Button } from "../ui/reusable/button"
import { title } from "process"

interface TestItemProps {
    item: TestItem
    dataId: string
    index?: number
    isAvailable?: boolean
    isComplete?: boolean
    onClick: (path: string) => void
}

export const TestComponent: FC<TestItemProps> = memo(({ item, dataId, isAvailable, isComplete, onClick }) => {
    const handleClick = () => {
        if (!isAvailable)
            return

        onClick(item.path)
    }

    const declension = (count: number, titles: [string, string, string]) => {
        const cases = [2, 0, 1, 1, 1, 2]
        return titles[
            count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
        ]
    }

    return (
        <div className={`test-selection-item ${!isAvailable ? "locked" : ""}`} data-id={dataId} onClick={handleClick}>

            <div className="test-selection-item-label">
                <div className="test-selection-item-name">
                    <h4>{item.label}</h4>
                    <span>{item.author}</span>
                </div>
            </div>

            <div className="test-selection-item-description">
                <span>{item.description}</span>
            </div>

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
                <ArrowRight />
            </div>
        </div>
    )
})