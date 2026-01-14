import "./layout-style.css"

import { FC, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Sidebar } from "../ui/side-menu/sidebar"

export const Layout: FC = () => {
    const navigate = useNavigate()

    const { user, logout } = useAuth()

    const [sidebarPosition, setSidebarPosition] = useState<"left" | "right">("left")
    const [sidebarCollpased, setSidebarCollapsed] = useState(false)

    const testUser = {
        email: "timofeyershovv@gmail.com",
        role: "admin",
    }

    return (
        <div className="layout-base min-h-screen">
            <div className="layout-sidebar">
                <Sidebar user={testUser} position={sidebarPosition} defaultCollapsed={sidebarCollpased} onLogout={()=>logout()}/>
            </div>

            <div className="layout-content">
                <Outlet/>
            </div>
        </div>
    )
}