import "./layout-style.css"

import { FC } from "react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "../ui/menu/sidebar"
import { Menu } from "../ui/menu/Menu"
import { useAuth } from "../../contexts/AuthContext"

export const Layout: FC = () => {
    const { getToken } = useAuth()

    return (
        <div className="layout-base">


            <div className="layout-content">
                <p style={{ textTransform: "uppercase" }}>*** Интерефейс все еще в разработке, это не финальная версия (stay calm)</p>
                <Outlet />
            </div>

            {getToken() &&
                <div className="layout-menu">
                    <Menu />
                </div>}
        </div>
    )
}