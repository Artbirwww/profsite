import "./css/temepramentStyle.css"




import "./css/positiveNegativeStyle.css"
import "./css/constantSliderStyle.css"
import "./css/commonTestsStyles.css"

import { Outlet } from "react-router-dom"

export const TestViewer = () => {

    return (
        <div className="test-viewer-wrapper">
            <Outlet />
        </div>
    )
}