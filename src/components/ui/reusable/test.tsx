import "./css/testStyle.css"

import React, { FC, useCallback } from "react";
import { TestItem } from "../../../types/tests/TestsData";

interface TestItemProps {
    item: TestItem
    onClick: (path: string) => void
}

export const Test: FC<TestItemProps> = ({ item, onClick }) => {
    const Icon = item.icon
    const BackgroundSVG = item.background
    const label = item.label
    const author = item.author
    const description = item.description

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        onClick(item.path)
    }, [item.path, onClick])

    return (
        <div className="test-item-wrapper" onClick={handleClick}>
            <div className="test-item-content">
                <div className="test-item-container">
                    <div>
                        <h1>{label}</h1>
                    </div>
                    <div>
                        <span>{author}</span>
                    </div>
                </div>
                <div className="test-item-container">
                    <div>
                        <span>{description}</span>
                    </div>
                </div>
                <div className="test-item-background">
                    {BackgroundSVG && <BackgroundSVG
                        className="backgroundSVG"
                        preserveAspectRatio="xMaxYMid slice"/>}
                </div>
            </div>
        </div>
    )
}