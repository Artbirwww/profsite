import "./css/menu-style.css"

import { FC, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { logoutButton, menuButtons, MenuItem } from "./menuData";
import { MenuComponent } from "./menuComponent";
import { MenuComponentDropdown } from "./menuComponentDropdown";

export const Menu: FC<{ position?: "top" | "bottom" }> = ({ position = "bottom" }) => {
    const { pathname } = useLocation()
    const { logout, checkRole } = useAuth()
    const navigate = useNavigate()

    const isActive = useCallback((path: string) =>
        pathname === path || pathname.startsWith(`${path}/`), [pathname])

    const handleAction = useCallback((item: MenuItem) => {
        if (item.isExit) logout?.()
        navigate(item.path)
    }, [logout, navigate])

    const { commonButtons, roleGroups } = useMemo(() => {
        const common: MenuItem[] = []
        const groups: Record<string, MenuItem[]> = {}

        menuButtons.forEach(btn => {
            const role = btn.allowedRoles?.find(r => checkRole({ name: r }))
            if (role) {
                if (!groups[role]) groups[role] = []
                groups[role].push(btn)
            } else if (!btn.allowedRoles?.length) [
                common.push(btn)
            ]
        })

        return { commonButtons: common, roleGroups: groups }
    }, [checkRole])

    return (
        <div className={`menu-container ${position}`}>

            <nav className="menu-nav">
                {commonButtons.map(item => (
                    <MenuComponent
                        key={item.id}
                        item={item}
                        isActive={isActive(item.path)}
                        onClick={handleAction} />
                ))}

                <MenuComponent
                    item={logoutButton}
                    isActive={false}
                    onClick={handleAction} />
            </nav>

            <nav className="menu-nav">
                {Object.entries(roleGroups).map(([role, items]) => (
                    <MenuComponentDropdown
                        key={role}
                        roleKey={role}
                        isGroupActive={items.some(item => isActive(item.path))}>

                        {items.map(item => (
                            <MenuComponent
                                key={item.id}
                                item={item}
                                isActive={isActive(item.path)}
                                onClick={handleAction} />
                        ))}

                    </MenuComponentDropdown>
                ))}
            </nav>
        </div>
    )
}