import "./css/testsViewerStyles.css"

import "./css/temperamentResultStyles.css"

import { Outlet } from "react-router-dom"

export const TestViewer = () => {
    return (
        <div
            className="test-viewer-wrapper">

            <div
                className="test-outlet">

                <Outlet />

            </div>
        </div>
    )
}