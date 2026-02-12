import { FC } from "react";
import { MenuItemProps } from "./menuData";

interface ItemProps {
    item: MenuItemProps
    isActive: boolean
    onClick: (item: MenuItemProps) => void
}

export const MenuItem: FC<ItemProps> = ({ item, isActive, onClick }) => {
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