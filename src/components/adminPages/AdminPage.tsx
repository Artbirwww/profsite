import "./css/adminPageStyles.css"

import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { adminButtons, AdminMenuItemProps } from "./adminData"
import { FC, useCallback, useMemo } from "react"

interface ItemProps {
    item: AdminMenuItemProps
    isActive: boolean
    onClick: (item: AdminMenuItemProps) => void
}

const AdminMenuItem: FC<ItemProps> = ({ item, isActive, onClick }) => {
    const Icon = item.icon
    return (
        <div className={`admin-menu-item-container ${isActive ? "active" : ""}`} onClick={() => onClick(item)}>
            <div className="admin-menu-item-icon"><Icon /></div>
            <div className="admin-menu-item-label">{item.label}</div>
        </div>
    )
}

export const AdminPage = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const isActive = useCallback((path: string) =>
        pathname === path || (path !== "/admin" && pathname.startsWith(`${path}/`)),
        [pathname])

    const handleAction = useCallback((item: AdminMenuItemProps) => {
        navigate(item.path)
    }, [navigate])

    const groups = useMemo(() => {
        return Array.from(new Set(adminButtons.map(item => item.group)))
    }, [])

    return (
        <div className="admin-wrapper">
            <div className="admin-outlet">
                <Outlet />
            </div>

            <div className="admin-menu">
                {groups.map(groupName => (
                    <div key={groupName} className="admin-menu-group-section">
                        <div className="admin-menu-group-title">{groupName}</div>

                        <div className="admin-menu-group-items">
                            {adminButtons
                                .filter(item => item.group === groupName)
                                .map(item => (
                                    <AdminMenuItem
                                        key={item.id}
                                        item={item}
                                        isActive={isActive(item.path)}
                                        onClick={handleAction} />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}