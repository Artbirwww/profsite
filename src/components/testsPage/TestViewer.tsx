import "./css/testsCommonStyles.css"

import { Outlet } from "react-router-dom"

export const TestViewer = () => {

    return (
        <div className="test-viewer-wrapper">
            <Outlet />
        </div>
    )
}