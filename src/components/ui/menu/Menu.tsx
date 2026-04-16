import "./css/menuStyles.css"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { logoutButton, menuButtons, MenuItemProps } from "./menuData"

interface ItemProps {
    item: MenuItemProps
    isActive: boolean
    onClick: (item: MenuItemProps) => void
}

const MenuItem: FC<ItemProps> = ({ item, isActive, onClick }) => {
    const Icon = item.icon
    return (
        <div className={`menu-nav-item-container ${isActive ? "active" : ""}`} onClick={() => onClick(item)}>
            <div className="menu-nav-item-icon"><Icon size={20} /></div>
            <div className="menu-nav-item-label">{item.label}</div>
        </div>
    )
}

export const Menu = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { logout, checkRole } = useAuth()

    const isActive = useCallback((path: string) =>
        pathname === path || (path !== "/" && pathname.startsWith(`${path}/`)),
        [pathname])

    const handleAction = useCallback((item: MenuItemProps) => {
        if (item.isLogout) {
            logout?.()
        }
        navigate(item.path)
    }, [logout, navigate])

    const { internalItems, externalItems } = useMemo(() => {

        const filtered = [...menuButtons, logoutButton]
            .filter(btn => !btn.allowedRoles?.length || btn.allowedRoles.some(r => checkRole({ name: r })))
            .sort((a, b) => (a.order || 0) - (b.order || 0))

        return {
            internalItems: filtered.filter(i => (i.position ?? 1) === 1),
            externalItems: filtered.filter(i => i.position === 0)
        }
    }, [checkRole])

    return (
        <div className="menu-wrapper">
            <nav className="menu-nav">
                {internalItems.map(item => (
                    <MenuItem
                        key={item.id}
                        item={item}
                        isActive={isActive(item.path)}
                        onClick={handleAction} />
                ))}
            </nav>

            {externalItems.length > 0 && (
                <nav className="menu-nav-external">
                    {externalItems.map(item => (
                        <MenuItem
                            key={item.id}
                            item={item}
                            isActive={isActive(item.path)}
                            onClick={handleAction}
                        />
                    ))}
                </nav>
            )}
        </div>
    )
}

/* OLD
import "./css/menuStyle.css"

import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { logoutButton, menuButtons, MenuItemProps } from "./menuData";
import { MenuItem } from "./MenuItem";
import { MenuItemDropdown } from "./MenuItemDropdown";

export const Menu = () => {
    const navigate = useNavigate()

    const { pathname } = useLocation()
    const { logout, checkRole } = useAuth()

    const isActive = useCallback((path: string) =>
        pathname === path || pathname.startsWith(`${path}/`), [pathname])

    const handleAction = useCallback((item: MenuItemProps) => {
        if (item.isLogout) logout?.()
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
        <div className="menu-container">

            <nav className="menu-nav">

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

                <nav className="menu-nav">

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
*/