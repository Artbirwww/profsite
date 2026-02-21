import React, { FC, memo } from "react"
import { TestItem } from "./TestsData"

interface TestItemProps {
    item: TestItem
    dataId: string
    background: string
    onClick: (path: string) => void
}

export const TestComponent: FC<TestItemProps> = memo(({ item, dataId, background, onClick }) => {
    const handleClick = () => {
        onClick(item.path)
    }

    return (
        <div className="test-item-wrapper" data-id={dataId} onClick={handleClick}>

            <div className="test-item-content">

                <div className="test-item-container">
                    <h1>{item.label}</h1>
                </div>

                <div className="test-item-container">
                    <span>{item.author}</span>

                    <span>{item.description}</span>
                </div>

                <div className="test-item-background" aria-hidden="true">
                    <img src={background} alt="" className="background-svg-host" />
                </div>
            </div>
        </div>
    )
})

TestComponent.displayName = "TestComponent"