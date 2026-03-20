import toast from "react-hot-toast"
import { useAuth } from "../../contexts/AuthContext"
import "./css/testsViewerStyles.css"
import "./css/generalTemplatesStyles.css"
import "./css/temperamentResultStyles.css"

import { Outlet } from "react-router-dom"
import { useEffect } from "react"

export const TestViewer = () => {
    const {isFirstLogin} = useAuth()
    useEffect(() => {
        if (isFirstLogin()) toast("Перед выполнением тестов обязательно заполните профиль", {
            style: {backgroundColor: "orange"},
            duration: 4500
        })
    }, [])
    
    return (
        <div className="test-viewer-wrapper">
            <div className="test-outlet">
                <Outlet />
            </div>
        </div>
    )
}