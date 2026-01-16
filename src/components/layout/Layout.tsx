import "./layout-style.css"

import { createContext, FC, useContext, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Sidebar } from "../ui/side-menu/sidebar"

export const Layout: FC = () => {
    return (
        <div className="layout-base min-h-screen">
            <div className="layout-sidebar">
                <Sidebar/>
            </div>

            <div className="layout-content">
                <Outlet/>
            </div>
        </div>
    )
}