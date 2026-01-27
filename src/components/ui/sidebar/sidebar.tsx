import "./css/sidebar-style.css"
import "./css/sidebar-media-style.css"

import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { X, Menu, DoorOpen } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { ROLES } from "../../../types/account/role"
import { SidebarItem, sidebarButtons } from "./sidebarData"

// Интерфейс для пропсов сайдбара
interface SidebarProps {
    collapsed?: boolean         // Свернутость сайдбара
    position?: "left" | "right" // Позиция сайдбара (Слева / Справа)
    onToggle?: () => void       // Колбэк при переключении состояния
}

// Словарь имен с переводом ролей на русский
const ROLE_NAMES: Record<string, string> = {
    [ROLES.ADMIN]: "Администратор",
    [ROLES.DIRECTOR]: "Директор",
    [ROLES.TEACHER]: "Учитель",
    [ROLES.SPECIALIST]: "Специалист",
    [ROLES.PUPIL]: "Ученик",
}

// Компонент для отдельного элемента сайдбара (Кнопки)
const SidebarItemComponent: FC<{ item: SidebarItem, isActive: boolean, isCollapsed: boolean, onClick: (path: string) => void }> = ({ item, isActive, isCollapsed, onClick }) => {

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        onClick(item.path)
    }, [item.path, onClick])
    
    return (
        <div key={item.id} className={`sidebar-item-container ${isActive ? "sidebar-item-active" : ""}`} data-item={item.dataItem} onClick={handleClick}>
            <div className="sidebar-item-icon">{item.icon}</div>
            {!isCollapsed && (<div className="sidebar-item-label">{item.label}</div>)}
        </div>
    )
}

// Основной компонент - Сайдбар
export const Sidebar: FC<SidebarProps> = ({ collapsed = false, position = "left", onToggle }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { logout, getRoles } = useAuth()

    // Получаем массив ролей пользователя
    const userRoles = useMemo(() => getRoles() || [], [getRoles])

    // Локальное состояние для управления свернутостью (Инициализируем состояние с учетом ширины экрана)
    const [isCollapsed, setIsCollapsed] = useState(() => {
        if (typeof window !== "undefined") {
            return window.innerWidth <= 768 ? true : collapsed
        }

        return collapsed
    })

    // Функция для выбора отображаемой роли
    const getDisplayName = (roles: { name: string }[]) => {
        if (roles.length === 0) return "Гость"
        const nonPupilRole = roles.find(r => r.name !== ROLES.PUPIL)
        const roleToDisplay = nonPupilRole ? nonPupilRole.name : ROLES.PUPIL

        return ROLE_NAMES[roleToDisplay] || roleToDisplay
    }

    // Фильтруем кнопки на основе ролей
    const filteredButtons = useMemo(() => {
        const userRoles = getRoles() || []
        const userRoleNames = userRoles.map(r => r.name)

        return sidebarButtons.filter(item => {
            if (!item.allowedRoles || item.allowedRoles.length === 0) return true

            return item.allowedRoles.some(allowedRole => userRoleNames.includes(allowedRole))
        })
    }, [getRoles])

    // Слушатель изменения размера экрана (чтобы сайдбар схлопывался при ресайзе)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768)
                setIsCollapsed(true)
        }
        handleResize()
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Переключение состояния сайдбара (свернут / развернут)
    const toggleSidebar = useCallback(() => {
        setIsCollapsed(prev => {
            const newState = !prev
            onToggle?.()

            return newState
        })
    }, [onToggle])

    // Проверка на то какой сейчас активный path, и в зависимости от этого будет активна кнопка в сайдбаре
    const isActive = useCallback((path: string) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`)
    }, [location.pathname])

    // Обработчик клика по элементу навигации (по кнопке)
    const handleItemClick = useCallback((path: string) => {
        navigate(path)
    }, [navigate])

    // Обработчик выхода из системы
    const handleLogout = useCallback(() => {
        logout?.()
        navigate("/login")
    }, [logout])

    return (
        <aside className={`sidebar-container ${isCollapsed ? "sidebar-collapsed" : ""} ${position}`}>
            {/* Лого */}
            <div className="sidebar-header">
                {!isCollapsed && (<div className="sidebar-header-title">LOGO</div>)}
                {!isCollapsed && (<div className="sidebar-header-control--close" onClick={toggleSidebar} data-item="sidebar-menu">
                    <div className="sidebar-header-control-icon--close"><X size={18}/></div> 
                </div>)}
                {isCollapsed && (<div className="sidebar-header-control--open" onClick={toggleSidebar} data-item="sidebar-menu">
                    <div className="sidebar-header-control-icon--open"><Menu size={18}/></div>
                </div>)}
            </div>

            <div className="sidebar-separator"></div>

            {/* Главная навигация */}
            <nav className="sidebar-nav">
                <div className="sidebar-nav-section">
                    {filteredButtons.map((item) => (
                        <SidebarItemComponent key={item.id} item={item} isActive={isActive(item.path)} isCollapsed={isCollapsed} onClick={handleItemClick}/>
                    ))}
                </div>
            </nav>

            <div className="sidebar-separator"></div>

            {/* Днище */}
            <div className="sidebar-footer">
                {!isCollapsed && (<div className="sidebar-footer-info">{getDisplayName(userRoles)}</div>)}
                {!isCollapsed && (<div className="sidebar-footer-control--logout" data-item="sidebar-logout" onClick={handleLogout}>
                    <div className="sidebar-footer-control-icon--logout"><DoorOpen size={18}/></div>
                </div>)}
                {isCollapsed && (<div className="sidebar-footer-control--logout" data-item="sidebar-logout" onClick={handleLogout}>
                    <div className="sidebar-footer-control-icon--logout"><DoorOpen size={18}/></div>
                </div>)}
            </div>
        </aside>
    )
}