import "./css/sidebar.css"

import { FC, useCallback, useMemo } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import { useLocation, useNavigate } from "react-router-dom"
import { logoutButton, menuButtons, MenuItemProps } from "./optionsData"
import { DoorOpen, X } from "lucide-react"

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

interface ItemProps {
    item: MenuItemProps
    isActive: boolean
    onClick: (item: MenuItemProps) => void
}

const SidebarItem: FC<ItemProps> = ({ item, isActive, onClick }) => {
    const Icon = item.icon
    return (
        <div className={`sidebar-nav-item-container ${item.className || ""} ${isActive ? "active" : ""}`} onClick={() => onClick(item)}>
            <div className="sidebar-nav-item-label">{item.label}</div>
            <div className="sidebar-nav-item-icon"><Icon /></div>
        </div>
    )
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { logout, checkRole } = useAuth()

    const isActive = useCallback((path: string) =>
        pathname === path || (path !== "/" && pathname.startsWith(`${path}/`)),
        [pathname])

    const handleAction = useCallback((item: MenuItemProps) => {
        onClose()
        if (item.isLogout) {
            logout?.()
        }
        navigate(item.path)
    }, [logout, navigate, onClose])

    const sidebarItems = useMemo(() => {
        return [...menuButtons]
            .filter(btn => !btn.allowedRoles?.length || btn.allowedRoles.some(r => checkRole({ name: r })))
            .sort((a, b) => (a.order || 0) - (b.order || 0))
    }, [checkRole])

    return (
        <aside className={`sidebar-aside ${isOpen ? "open" : ""}`}>
            <div className="sidebar-header">
                <p>EVCG</p>
                <div className="sidebar-close" onClick={onClose}><X /></div>
            </div>

            <div className="sidebar-links">
                {sidebarItems.map(item => (
                    <SidebarItem
                        key={item.id}
                        item={item}
                        isActive={isActive(item.path)}
                        onClick={handleAction} />
                ))}
            </div>


            <div className="sidebar-footer">
                <div className={`sidebar-nav-item-container sidebar-logout ${logoutButton.className || ""}`} onClick={() => handleAction(logoutButton)}>
                    <div className="sidebar-nav-item-label">{logoutButton.label}</div>
                    <div className="sidebar-nav-item-icon"><DoorOpen /></div>
                </div>
            </div>
        </aside>
    )
}