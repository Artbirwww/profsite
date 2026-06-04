import "./css/layoutStyle.css"
import { FC, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Menu } from "../ui/menu/Menu"
import { useAuth } from "../../contexts/AuthContext"
import { routeTitles } from "./routeMap"
import { MenuIcon } from "lucide-react"
import { Sidebar } from "../ui/menu/Sidebar"
import { Button } from "../ui/reusable/button"

export const Layout: FC = () => {
    const { getToken, getEmail } = useAuth()
    const location = useLocation()

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const isAuthPage = location.pathname === "/login" || location.pathname.startsWith("/register")
    const isAdminPage = location.pathname.startsWith("/admin")
    const shouldHideHeader = isAuthPage || isAdminPage
    const hasToken = !!getToken()

    const navigate = useNavigate()
    return (
        <div className="layout-wrapper">
            <div className="background" />

            {!shouldHideHeader && (
                <header className="header">
                    <div className="header-title">
                        <h4>{routeTitles[location.pathname] || "Загрузка..."}</h4>
                        {!getEmail() && 
                            <Button label="Войти" onClick={() => navigate("/login")} />}
                    </div>
                    
                    {getEmail() &&
                        <span>Профиль: {getEmail()} </span>
                    }

                    {hasToken && (
                        <div className="sidebar-button" onClick={() => setIsSidebarOpen(true)}>
                            <MenuIcon />
                        </div>
                    )}
                </header>
            )}

            <div className="outlet">
                <Outlet />
            </div>

            {hasToken && !isAdminPage && (
                <div className="menu">
                    <Menu />
                </div>
            )}

            {hasToken && (
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>
            )}
        </div>
    )
}