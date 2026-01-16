import "./sidebar-style.css"
import "./sidebar-media-style.css"

import { FC, ReactNode, useCallback, useMemo, useState } from "react"
import { Home, FileCheck, PieChart, User, Users, ArrowUpToLine, Apple, X, Menu, DoorOpen } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"

// Иконки предоставлены библиотекой "lucide-react"

// Интерфейс для элемента сайдбара (кнопки)
interface SidebarItem {
    id: string               // Id
    label: string            // Текст кнопки
    icon: ReactNode          // Иконка кнопки
    path: string             // Путь куда отправит кнопка
    dataItem?: string        // Для тестирования / селекторов
    adminOnly?: boolean      // Доступ только админам
    teacherOnly?: boolean    // Доступ только учителям
    specialistOnly?: boolean // Доступ только спициалистов
}

// Интерфейс для данных пользователя
interface UserData {
    role?: "admin" | "student" | "specialist" | "teacher" // Тип / Роль
}

// Интерфейс для пропсов сайдбара
interface SidebarProps {
    collapsed?: boolean         // Свернутость сайдбара
    position?: "left" | "right" // Позиция сайдбара (Слева / Справа)
    onToggle?: () => void       // Колбэк при переключении состояния
    userData?: UserData | null  // Данные пользователя
}

// Компонент для отдельного элемента сайдбара (Кнопки)
const SidebarItemComponent: FC<{ item: SidebarItem, isActive: boolean, isCollapsed: boolean, onClick: (path: string) => void }> = ({ item, isActive, isCollapsed, onClick }) => {

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        onClick(item.path)
    }, [item.path, onClick])
    
    return (
        <div key={item.id} className={`sidebar-item-container ${isActive ? "sidebar-item-active" : ""} ${item.adminOnly ? "sidebar-item-admin" : ""}`} data-item={item.dataItem} onClick={handleClick}>
            <div className="sidebar-item-icon">{item.icon}</div>
            {!isCollapsed && (<div className="sidebar-item-label">{item.label}</div>)}
        </div>
    )
}

// Основной компонент - Сайдбар
export const Sidebar: FC<SidebarProps> = ({ collapsed = false, position = "left", onToggle, userData }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { logout } = useAuth()

    // Локальное состояние для управления свернутостью
    const [isCollapsed, setIsCollapsed] = useState(collapsed)

    // Мемоизация данных текущего пользователя
    // Подгружается дефолтный пользователь (но можно и взять отсюда { user } = useAuth())
    // TODO: Сделать подгрузку из текущей сессии !!!
    const currentUser = useMemo(() => {
        if (userData) {
            return {
                role: userData.role,
            }
        }
        
        // Значения по умолчанию
        return {
            role: "admin",
        }
    }, [userData])

    // Проверка является ли пользователь админом
    // TODO: Сейчас это просто для теста, но надо будет сделать нормально !!!
    const isAdmin = useMemo(() => 
        currentUser.role === "admin",
        [currentUser.role]
    )

    // Проверка является ли пользователь учителем
    // TODO: Сейчас это просто для теста, но надо будет сделать нормально !!!
    const isTeacher = useMemo(() =>
        currentUser.role === "teacher",
        [currentUser.role]
    )

    // Проверка является ли пользователь специалистом
    // TODO: Сейчас это просто для теста, но надо будет сделать нормально !!!
    const isSpecialist = useMemo(() =>
        currentUser.role === "specialist",
        [currentUser.role]
    )

    //Основные элементы навигации (Доступные всем)
    const mainItems = useMemo<SidebarItem[]>(() => [
        {
            id: "home",
            label: "Домой",
            icon: <Home size={20}/>,
            path: "/",
            dataItem: "home",
        },
        {
            id: "testing",
            label: "Тестирование",
            icon: <FileCheck size={20}/>,
            path: "/dashboard",
            dataItem: "testing",
        },
        {
            id: "results",
            label: "Мои результаты",
            icon: <PieChart size={20}/>,
            path: "/my-results",
            dataItem: "results",
        },
        {
            id: "profile",
            label: "Личный кабинет",
            icon: <User size={20}/>,
            path: "/profile",
            dataItem: "profile",
        },
    ], [])

    // Элементы навигации (Доступные Админам)
    const adminItems = useMemo<SidebarItem[]>(() => isAdmin ? [
        {
            id: "admin-list",
            label: "Список",
            icon: <Users size={20}/>,
            path: "/admin/pupil-list",
            adminOnly: true,
            dataItem: "role-based-item",
        },
        {
            id: "admin-upload",
            label: "Загрузить",
            icon: <ArrowUpToLine size={20}/>,
            path: "/admin/pupil-loading",
            adminOnly: true,
            dataItem: "role-based-item",
        },
    ] : [], [isAdmin])

    // Элементы навигации (Доступные учителям)
    const teacherItems = useMemo<SidebarItem[]>(() => isTeacher ? [
        {
            id: "teacher-1",
            label: "Учитель тест 1",
            icon: <Apple size={20}/>,
            path: "/teacher-test-1",
            teacherOnly: true,
            dataItem: "role-based-item",
        },
        {
            id: "teacher-2",
            label: "Учитель тест 2",
            icon: <Apple size={20}/>,
            path: "/teacher-test-2",
            teacherOnly: true,
            dataItem: "role-based-item",
        },
    ] : [], [isTeacher])

    // Элементы навигации (Доступные специалистам)
    const specialistItems = useMemo<SidebarItem[]>(() => isSpecialist ? [
        {
            id: "specialist-list",
            label: "Специалист тест 1",
            icon: <Apple size={20}/>,
            path: "/speacialist-test-1",
            specialistOnly: true,
            dataItem: "role-based-item",
        },
        {
            id: "specialist-upload",
            label: "Специалист тест 2",
            icon: <Apple size={20}/>,
            path: "/speacialist-test-2",
            specialistOnly: true,
            dataItem: "role-based-item",
        },
    ] : [], [isSpecialist])

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

    // Функция рендеринга отдельного элемента сайдбара (кнопки)
    const renderSidebarItem = useCallback((item: SidebarItem, index: number, depth = 0) => {
        const isItemActive = isActive(item.path)
        return (<SidebarItemComponent item={item} isActive={isItemActive} isCollapsed={isCollapsed} onClick={handleItemClick}/>)
    }, [isCollapsed, isActive, handleItemClick])

    // Функция рендеринга группы элементов (здесь рендерятся все кнопки)
    const renderSidebarItems = useCallback((items: SidebarItem[]) => 
        items.map((item, index) => renderSidebarItem(item, index)),
        [renderSidebarItem]
    )

    // Мемоизированный контент сайдбара (хранение дефолтных, админских, учительских и для специалистов отрендереных кнопок)
    const sidebarContent = useMemo(() => ({
        mainItems: renderSidebarItems(mainItems),
        adminItems: renderSidebarItems(adminItems),
        teacherItems: renderSidebarItems(teacherItems),
        specialistItems: renderSidebarItems(specialistItems),
    }), [mainItems, adminItems, teacherItems, specialistItems, renderSidebarItems])

    return (
        <aside className={`sidebar-container ${isCollapsed ? "sidebar-collapsed" : ""} ${position}`}>
            {/* Лого */}
            <div className="sidebar-header">
                {!isCollapsed && (<div className="sidebar-header-title">LOGO</div>)}
                {!isCollapsed && (<div className="sidebar-header-control--close" onClick={toggleSidebar} data-item="sidebar-menu">
                    <div className="sidebar-header-control-icon--close"><X size={20}/></div> 
                </div>)}
                {isCollapsed && (<div className="sidebar-header-control--open" onClick={toggleSidebar} data-item="sidebar-menu">
                    <div className="sidebar-header-control-icon--open"><Menu size={20}/></div>
                </div>)}
            </div>

            <div className="sidebar-separator"></div>

            {/* Главная навигация */}
            <nav className="sidebar-nav">
                <div className="sidebar-nav-section">
                    {sidebarContent.mainItems}
                </div>
            </nav>

            <div className="sidebar-separator"></div>

            {/* Учительская навигация */}
            {isTeacher && teacherItems.length > 0 && (<>
                <nav className="sidebar-nav">
                    <div className="sidebar-nav-section">
                        {sidebarContent.teacherItems}
                    </div>
                </nav>

                <div className="sidebar-separator"></div>
            </>)}

            {/* Навигация для специалистов */}
            {isSpecialist && specialistItems.length > 0 && (<>
                <nav className="sidebar-nav">
                    <div className="sidebar-nav-section">
                        {sidebarContent.specialistItems}
                    </div>
                </nav>

                <div className="sidebar-separator"></div>
            </>)}

            {/* Админская навигация */}
            {isAdmin && adminItems.length > 0 && (<>
                <nav className="sidebar-nav">
                    <div className="sidebar-nav-section">
                        {sidebarContent.adminItems}
                    </div>
                </nav>

                <div className="sidebar-separator"></div>
            </>)}

            {/* Днище */}
            <div className="sidebar-footer">
                {!isCollapsed && (<div className="sidebar-footer-info">{currentUser.role}</div>)}
                {!isCollapsed && (<div className="sidebar-footer-control--logout" data-item="sidebar-logout" onClick={handleLogout}>
                    <div className="sidebar-footer-control-icon--logout"><DoorOpen size={20}/></div>
                </div>)}
                {isCollapsed && (<div className="sidebar-footer-control--logout" data-item="sidebar-logout" onClick={handleLogout}>
                    <div className="sidebar-footer-control-icon--logout"><DoorOpen size={20}/></div>
                </div>)}
            </div>
        </aside>
    )
}