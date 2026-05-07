import "./css/layoutStyle.css"

import { FC } from "react"
import { Outlet } from "react-router-dom"
import { Menu } from "../ui/menu/Menu"
import { useAuth } from "../../contexts/AuthContext"

export const Layout: FC = () => {
    const { getToken } = useAuth()

    return (
        <div className="layout-wrapper">
            <div className="background" />

            <div className="header">
                page name
            </div>

            <div className="outlet">
                <Outlet />
            </div>

            {getToken() && <Menu />}
        </div>
    )
}