import "./css/layoutStyle.css"

import { FC, useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Menu } from "../ui/menu/Menu"
import { useAuth } from "../../contexts/AuthContext"
import { routeTitles } from "./routeMap"

export const Layout: FC = () => {
    const { getToken } = useAuth()
    const location = useLocation()

    const isAuthPage = location.pathname === "/login" || location.pathname.startsWith("/register")
    const isAdminPage = location.pathname.startsWith("/admin")
    const shouldHideHeader = isAuthPage || isAdminPage

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="layout-wrapper">
            <div className="background" />

            {!shouldHideHeader && (
                <div className="header">
                    {routeTitles[location.pathname] || "Загрузка..."}
                </div>
            )}

            <div className="outlet" style={{ paddingTop: `${isAdminPage ? "20px" : ""}`, paddingBottom: `${isAdminPage ? "20px" : ""}` }}>
                <Outlet />
            </div>

            {(getToken() && !isAdminPage && !isMobile) && <Menu />}
        </div>
    )
}