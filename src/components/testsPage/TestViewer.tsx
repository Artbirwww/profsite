import "./css/testsViewerStyles.css"

import { Outlet, useLocation } from "react-router-dom"
import { useTestStore } from "./TestStore"
import { useEffect } from "react"

export const TestViewer = () => {
    const { pathname } = useLocation()

    const currentNumber = useTestStore((state) => state.currentNumber)
    const totalNumber = useTestStore((state) => state.totalNumber)
    const reset = useTestStore((store) => store.reset)

    useEffect(() => {
        reset()
    }, [pathname, reset])

    return (
        <div
            className="test-viewer-wrapper">

            <div
                className="test-header">

                <div
                    className="test-header-text">

                    Название теста
                </div>

                <div
                    className="test-additional-text">

                    вопрос {currentNumber} из {totalNumber}
                </div>

                <div
                    className="test-additional-text">

                    Здесь прогресс бар
                </div>
            </div>

            <div
                className="test-outlet">

                <Outlet />
            </div>
        </div>
    )
}