import "./sidebar-style.css"

import { FC, ReactNode, useEffect, useState } from "react"
import { Home, FileText, ChartPie, User, Users, FileUp, X, Menu, DoorOpen } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface SidebarProps {
    onClose?: () => void
    user?: {
        email: string
        role: string
    }
    position?: "left" | "right"
    defaultCollapsed?: boolean
    onLogout?: () => void
}

interface MenuItem {
    path: string
    label: string
    icon: ReactNode
    class: string
    adminOnly?: boolean
}

export const Sidebar: FC<SidebarProps> = ({ user, position = "left", defaultCollapsed = false, onLogout }) => {
    const navigate = useNavigate()

    const [isExpanded, setIsExpanded] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const menuItems: MenuItem[] = [
        {
            path: "/dashboard",
            label: "На главную",
            icon: <Home size={24}/>,
            class: "sidebar-nav-home",
        },
        {
            path: "/tests",
            label: "Тестирование",
            icon: <FileText size={24}/>,
            class: "sidebar-nav-tests",
        },
        {
            path: "/my-results",
            label: "Мои результаты",
            icon: <ChartPie size={24}/>,
            class: "sidebar-nav-results",
        },
        {
            path: "/profile",
            label: "Личный кабинет",
            icon: <User size={24}/>,
            class: "sidebar-nav-profile",
        },
    ]
    
    const adminMenuItem: MenuItem[] = [
        {
            path: "/dashboard",
            label: "Список 1",
            icon: <Users size={24}/>,
            class: "sidebar-nav-admin",
            adminOnly: true,
        },
        {
            path: "/dashboard",
            label: "Список 2",
            icon: <FileUp size={24}/>,
            class: "sidebar-nav-admin",
            adminOnly: true,
        },
    ]

    const handleNavigate = (path: string) => {
        navigate(path)
    }

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        
        checkMobile()
        window.addEventListener("resize", checkMobile)
        
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const sidebarClasses = [
        "sidebar-container",
        isExpanded ? "expanded" : "collapsed",
        position,
    ].filter(Boolean).join(" ")

    return (
        <>
            <div 
                className={`sidebar-toggle-button ${position} ${isExpanded ? "hidden" : ""}`} 
                onClick={handleToggleExpand}
                aria-label={isExpanded ? "Свернуть меню" : "Развернуть меню"}
            >
                {isExpanded ? <X size={20}/> : <Menu size={20}/>}
            </div>

            <aside className={sidebarClasses}>
                <div className="sidebar-content">
                    <div className="sidebar-top">
                        {isExpanded && (
                            <div className="sidebar-title">
                                <span>Меню</span>
                            </div>
                        )}
                    </div>

                    <div className="separator"></div>

                    <div className="sidebar-nav">
                        <div className="sidebar-nav-section">
                            {menuItems.map((item, index) => (
                                <div 
                                    key={index}
                                    className={`sidebar-nav-item ${item.class}`}
                                    onClick={() => handleNavigate(item.path)}
                                >
                                    <span className="sidebar-nav-icon">{item.icon}</span>
                                    {isExpanded && (
                                        <span className="sidebar-nav-label">{item.label}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="separator"></div>
                    
                    {user?.role === "admin" && (
                        <>
                            <div className="sidebar-nav">
                                <div className="sidebar-nav-section">
                                    {adminMenuItem.map((item, index) => (
                                        <div 
                                            key={index}
                                            className={`sidebar-nav-item ${item.class}`}
                                            onClick={() => handleNavigate(item.path)}
                                        >
                                            <span className="sidebar-nav-icon">{item.icon}</span>
                                            {isExpanded && (
                                                <span className="sidebar-nav-label">{item.label}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="separator"></div>
                        </>
                    )}

                    <div className="sidebar-bottom">
                        <div 
                            className="sidebar-user-info" 
                            onClick={onLogout}
                            title={isExpanded ? "Выйти" : "Выйти из системы"}
                        >
                            <span className="sidebar-user-icon">
                                <DoorOpen size={24}/>
                            </span>
                            {isExpanded && (
                                <div className="sidebar-user-details">
                                    <span className="sidebar-user-email">{user?.email}</span>
                                    <span className="sidebar-user-role">{user?.role}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}