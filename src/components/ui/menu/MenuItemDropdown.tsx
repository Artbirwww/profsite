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
    const dropdownRef = useRef<HTMLDivElement>(null)

    const [isOpen, setIsOpen] = useState(false)

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
        <div className="menu-nav-item-container" ref={dropdownRef}>

            <div className={`menu-nav-item-role-container ${isOpen ? "menu-nav-item-active" : ""} ${isGroupActive ? "menu-nav-item-group-active" : ""}`} onClick={() => setIsOpen(!isOpen)}>

                <div className="menu-nav-item-icon">

                    <Icon size={20} />

                </div>

                <div className="menu-nav-item-label">

                    {label}

                    <div className={`menu-nav-item-arrow ${isOpen ? "menu-nav-item-arrow-rotated" : ""}`}>

                        <ChevronDown size={18} />

                    </div>

                </div>

            </div>

            {isOpen && (

                <div className="menu-nav-item-role-content">

                    {children}

                </div>

            )}

        </div>
    )
}