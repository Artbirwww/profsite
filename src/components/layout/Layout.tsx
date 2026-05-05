import "./css/layoutStyle.css"

import { FC } from "react"
import { Outlet } from "react-router-dom"
import { Menu } from "../ui/menu/Menu"
import { useAuth } from "../../contexts/AuthContext"

export const Layout: FC = () => {
    const { getToken } = useAuth()

    return (
        <div className="layout-wrapper">
            <div className="background">

                <div className="header">
                    <h1>Хедер</h1>
                </div>

                <div className="content">
                    <Outlet />
                </div>

                <div className="menu">
                    {getToken() && <Menu />}
                </div>
                
            </div>
        </div>
    )
}