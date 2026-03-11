import "./css/testsCommonStyles.css"

import { Outlet } from "react-router-dom"

export const TestViewer = () => {

    return (
        <div
            className="test-wrapper">

            <div
                className="test-header">

                <div
                    className="test-header-text">

                    Название теста
                </div>

                <div
                    className="test-additional-text">

                    вопрос 1 из 50
                </div>
            </div>

            <div
                className="test-outlet">

                <Outlet />
            </div>
        </div>
    )
}