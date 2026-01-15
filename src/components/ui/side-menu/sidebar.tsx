import { FC, ReactNode, use, useState } from "react"
import "./sidebar-style.css"

import { Home, FileText, BarChart, User, Users, Upload, Apple, X, Menu, DoorOpen } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"

interface SidebarItem {
    id: string
    label: string
    icon: ReactNode
    path: string
    adminOnly?: boolean
}

interface SidebarProps {
    collapsed?: boolean
    onToggle?: () => void
    user?: {
        name: string
        email: string
        role: "admin" | "pupil" | "specialist" | "dev"
    }
}

export const Sidebar: FC<SidebarProps> = ({ collapsed = false, onToggle, user }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const [isCollapsed, setIsCollapsed] = useState(collapsed)
    const [expandedItems, setExpandedItems] = useState<string[]>([])

    const currentUser = user || {
        name: "Timofey",
        email: "timofeyershovv@gmail.com",
        role: "dev" as const,
    }

    const isAdmin = currentUser.role === "dev"

    const mainItems: SidebarItem[] = [
        {
            id: "dashboard",
            label: "Домой",
            icon: <Home size={20}/>,
            path: "/dashboard",
        },
        {
            id: "testing",
            label: "Тестирование",
            icon: <FileText size={20}/>,
            path: "/testing",
        },
        {
            id: "results",
            label: "Мои результаты",
            icon: <BarChart size={20}/>,
            path: "/results",
        },
        {
            id: "profile",
            label: "Личный кабинет",
            icon: <User size={20}/>,
            path: "/profile",
        },
    ]

    const adminItems: SidebarItem[] = isAdmin ? [
        {
            id: "admin-list",
            label: "Список",
            icon: <Users size={20}/>,
            path: "/admin-list",
            adminOnly: true,
        },
        {
            id: "admin-upload",
            label: "Загрузить",
            icon: <Upload size={20}/>,
            path: "/admin-upload",
            adminOnly: true,
        },
        {
            id: "admin-aboba",
            label: "Тест",
            icon: <Apple size={20}/>,
            path: "/admin-aboba",
            adminOnly: true,
        },
    ] : []

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
        onToggle?.()
    }

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`)
    }

    const renderSidebarItem = (item: SidebarItem, depth = 0) => {
        const isItemActive = isActive(item.path)
        const isAdminItem = item.adminOnly

        return (
            <div key={item.id} className={`sidebar-item-container ${isItemActive ? "sidebar-item-active" : ""} ${isAdminItem ? "sidebar-item-admin" : ""}`}>
                <div className="sidebar-item-content">
                    <div className="sidebar-item-icon">{item.icon}</div>

                    { !isCollapsed && ( <span className="sidebar-label">{item.label}</span> ) }
                </div>
            </div>
        )
    }

    return (
        <aside className={`sidebar-container ${isCollapsed ? "sidebar-collapsed" : ""}`}>
            {/* Лого */}
            <div className="sidebar-header">
                {!isCollapsed ? (
                    <div className="sidebar-logo">
                        <span className="sidebar-title">Меню</span>

                        <div className="sidebar-control" onClick={toggleSidebar}>
                            <X size={20}/>
                        </div>
                    </div>    
                ) : (
                    <div className="sidebar-control" onClick={toggleSidebar}>
                        <Menu size={20}/>
                    </div>
                )}
            </div>

            <div className="sidebar-separator"></div>

            {/* Главная навигация */}
            <nav className="sidebar-nav">
                <div className="sidebar-nav-setion">
                    <div className="sidebar-nav-items">
                        {mainItems.map(item => renderSidebarItem(item))}
                    </div>
                </div>
            </nav>

            <div className="sidebar-separator"></div>

            {/* Админская навигация */}
            {isAdmin && adminItems.length > 0 && (
                <nav className="sidebar-nav">
                    <div className="sidebar-nav-section">
                        <div className="sidebar-nav-items">
                            {adminItems.map(item => renderSidebarItem(item))}
                        </div>
                    </div>
                </nav>
            )}

            <div className="sidebar-separator"></div>

            {/* Днище */}
            <div className="sidebar-footer">
                {!isCollapsed ? (
                    <div className="sidebar-bottom">    
                        <span className="sidebar-title">{user?.role}</span>

                        <div className="sidebar-control">
                            <DoorOpen size={20}/>
                        </div>
                    </div>
                ) : (
                    <div className="sidebar-control">
                        <DoorOpen size={20}/>
                    </div>
                )}
            </div>
        </aside>
    )
}