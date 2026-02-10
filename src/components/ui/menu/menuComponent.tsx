import { FC } from "react";
import { MenuItem } from "./menuData";

interface MenuItemProps {
    item: MenuItem
    isActive: boolean
    onClick: (item: MenuItem) => void
}

export const MenuComponent: FC<MenuItemProps> = ({ item, isActive, onClick }) => {
    const Icon = item.icon
    const label = item.label

    return (
        <div className={`menu-item-container ${isActive ? "menu-item-active" : ""}`}
            onClick={() => onClick(item)}>

            <div className="menu-item-icon">
                <Icon size={20} />
            </div>

            <div className="menu-item-label">
                {label}
            </div>
        </div>
    )
}