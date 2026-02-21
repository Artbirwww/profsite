import "./css/menuStyle.css"

import { FC, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { logoutButton, menuButtons, MenuItemProps } from "./menuData";
import { MenuItem } from "./MenuItem";
import { MenuItemDropdown } from "./MenuItemDropdown";
import { DisplacementFilter } from "../../../DisplacementFilter";

export const Menu: FC<{ position?: "top" | "bottom" }> = ({ position = "bottom" }) => {
    const { pathname } = useLocation()
    const { logout, checkRole } = useAuth()
    const navigate = useNavigate()

    const isActive = useCallback((path: string) =>
        pathname === path || pathname.startsWith(`${path}/`), [pathname])

    const handleAction = useCallback((item: MenuItemProps) => {
        if (item.isExit) logout?.()
        navigate(item.path)
    }, [logout, navigate])

    const { commonButtons, roleGroups } = useMemo(() => {
        const common: MenuItemProps[] = []
        const groups: Record<string, MenuItemProps[]> = {}

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

            <nav className="menu-nav liquid-glass-component">

                <DisplacementFilter />

                {commonButtons.map(item => (
                    <MenuItem
                        key={item.id}
                        item={item}
                        isActive={isActive(item.path)}
                        onClick={handleAction} />
                ))}

                <MenuItem
                    item={logoutButton}
                    isActive={false}
                    onClick={handleAction} />
            </nav>

            {Object.entries(roleGroups).map(([role, items]) => (
                <nav className="menu-nav liquid-glass-component">
                    
                    <DisplacementFilter/>

                    <MenuItemDropdown
                        key={role}
                        roleKey={role}
                        isGroupActive={items.some(item => isActive(item.path))}>

                        {items.map(item => (
                            <MenuItem
                                key={item.id}
                                item={item}
                                isActive={isActive(item.path)}
                                onClick={handleAction} />
                        ))}

                    </MenuItemDropdown>
                </nav>
            ))}
        </div>
    )
}