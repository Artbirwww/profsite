import "./css/layoutStyle.css"

import { FC } from "react"
import { Outlet } from "react-router-dom"
import { Menu } from "../components/ui/menu/Menu"
import { useAuth } from "../contexts/AuthContext"

export const Layout: FC = () => {
    const { getToken } = useAuth()

    return (
        <div className="layout-base">
            <div className="layout-content">
                <p style={{ textTransform: "uppercase", background: "lightBlue", position: "absolute", zIndex: "1000" }}>*** Интерфейс все еще в разработке, это не финальная версия (stay calm)</p>
                <Outlet />
            </div>

            {getToken() &&
                <div className="layout-menu">
                    <Menu />
                </div>}
        </div>
    )
}