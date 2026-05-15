import "./css/layoutStyle.css"

import { FC } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Menu } from "../ui/menu/Menu"
import { useAuth } from "../../contexts/AuthContext"
import { routeTitles } from "./routeMap"

export const Layout: FC = () => {
    const { getToken, getEmail } = useAuth()
    const location = useLocation()

    const isAuthPage = location.pathname === "/login" || location.pathname.startsWith("/register")
    const isAdminPage = location.pathname.startsWith("/admin")
    const isTestsPage = location.pathname === "/tests"
    console.log(isTestsPage)
    const shouldHideHeader = isAuthPage || isAdminPage

    return (
        <div className="layout-wrapper">
            <div className="background" />

            {!shouldHideHeader && (
                <>
                    <div className="header">
                        {routeTitles[location.pathname] || "Загрузка..."}
                    </div>
                    <div className="header center-align">
                        {isTestsPage && <p>{getEmail()}</p>}
                    </div>
                </>
            )}

            <div className="outlet" style={{ paddingTop: `${isAdminPage ? "20px" : ""}`, paddingBottom: `${isAdminPage ? "20px" : ""}` }}>
                <Outlet />
            </div>

            {(getToken() && !isAdminPage) && <Menu />}
        </div>
    )
}