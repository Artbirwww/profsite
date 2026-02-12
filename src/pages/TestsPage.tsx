import "./css/testsPageStyle.css"

import { FC, useCallback } from "react"
import { Scroll } from "../components/ui/reusable/scroll"
import { testsList } from "../types/tests/TestsData"
import { Test } from "../components/ui/reusable/test"
import { useNavigate } from "react-router-dom"

export const TestsPage: FC = ({ }) => {
    const navigate = useNavigate()

    const handleClick = useCallback((path: string) => {
        navigate(path)
    }, [navigate])

    return (
        <div className="quiz-selector-wrapper">
            <Scroll
                items={testsList}
                visibleCount={3}
                step={3}
                scrollDelay={300}
                renderItem={(item) =>
                    <Test
                        item={item}
                        onClick={handleClick} />} />
        </div>
    )
}