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
    const hasToken = !!getToken()

    return (
        <div className="layout-wrapper">
            <div className="background" />

            {!shouldHideHeader && (
                <header className="header">
                    {routeTitles[location.pathname] || "Загрузка..."}
                </header>
                <>
                    <div className="header">
                        { isTestsPage ? `${getEmail()}` : routeTitles[location.pathname] || "Загрузка..."}
                    </div>
                </>
            )}

            <main className="outlet">
                <Outlet />
            </main>

            {hasToken && !isAdminPage && (
                <div className="menu">
                    <Menu />
                </div>
            )}
        </div>
    )
}