import "./layout-style.css"

import { createContext, FC, useContext, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Sidebar } from "../ui/sidebar/sidebar"
import { useAuth } from "../../contexts/AuthContext"

export const Layout: FC = () => {
    const { getToken } = useAuth()

    return (
        <div className="layout-base min-h-screen">
            {getToken() && (
                <div className="layout-sidebar">
                    <Sidebar/>
                </div>
            )}

            <div className="layout-content">
                <Outlet/>
            </div>
        </div>
    )
}