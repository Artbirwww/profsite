import "./css/layoutStyle.css"

import { FC } from "react"
import { Outlet } from "react-router-dom"
import { Menu } from "../ui/menu/Menu"
import { useAuth } from "../../contexts/AuthContext"

export const Layout: FC = () => {
    const { getToken } = useAuth()

    return (
        <div className="layout-base-wrapper">

            <div className="layout-background">

                <div className="layout-content-wrapper">

                    <Outlet />

                </div>

            </div>

            {getToken() &&
                <Menu />
            }

        </div>
    )
}