import React, { FC, useCallback } from "react";
import { TestsItem } from "./testsData";
import { Button } from "../../ui/reusable/button";

interface TestItemProps {
    item: TestsItem
    onClick: (path: string) => void
}

export const TestComponent: FC<TestItemProps> = ({ item, onClick }) => {
    const Icon = item.icon
    const orderNumber = item.orderNumber
    const label = item.label
    const author = item.author
    const descritpion = item.description

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        onClick(item.path)
    }, [item.path, onClick])

    return (
        <div className="test-item-component"
            onClick={handleClick}>

            <div className="test-item-order">
                {orderNumber}
            </div>

            <div className="test-item-content">

                <div className="test-item-name">
                    
                    <div className="test-item-label">
                        {label}
                    </div>

                    <div className="test-item-author">
                        {author}
                    </div>
                </div>


                <div className="test-item-description">
                    {descritpion}
                </div>
            </div>

            <div className="test-item-button">

            </div>
        </div>
    )
}