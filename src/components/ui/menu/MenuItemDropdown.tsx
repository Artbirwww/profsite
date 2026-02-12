import { Briefcase, ChevronDown, GraduationCap, LucideIcon, ShieldCheck, User, UserCog } from "lucide-react"
import { FC, ReactNode, useEffect, useRef, useState } from "react"
import { ROLES } from "../../../types/account/role"

interface DropdownItemProps {
    roleKey: string
    children: ReactNode
    isGroupActive: boolean
}

const ROLE_CONFIG: Record<string, { label: string, icon: LucideIcon }> = {
    [ROLES.ADMIN]: { label: "Админ", icon: ShieldCheck },
    [ROLES.DIRECTOR]: { label: "Директор", icon: UserCog },
    [ROLES.TEACHER]: { label: "Учитель", icon: GraduationCap },
    [ROLES.SPECIALIST]: { label: "Специалист", icon: Briefcase },
}

export const MenuItemDropdown: FC<DropdownItemProps> = ({ roleKey, children, isGroupActive }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const { label, icon: Icon } = ROLE_CONFIG[roleKey] || { label: roleKey, icon: User }

    useEffect(() => {
        const handler = (e: MouseEvent | TouchEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    return (
        <div className={`menu-dropdown-container`} ref={dropdownRef}>

            <div className={`menu-item-container ${isOpen ? "menu-item-open" : ""} ${isGroupActive ? "menu-item-group-active" : ""}`}
                onClick={() => setIsOpen(!isOpen)}>

                <div className="menu-item-icon">
                    <Icon size={20} />
                </div>

                <div className="menu-item-label">
                    {label}

                    <div className={`menu-item-arrow ${isOpen ? "menu-item-arrow-rotated" : ""}`}>
                        <ChevronDown size={18} />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="menu-item-content">

                    {children}
                </div>
            )}
        </div>
    )
}