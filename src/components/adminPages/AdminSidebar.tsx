import { useState } from "react"
import { NavLink } from "react-router-dom"
const navItems = [
    { id:1, path: "/admin/pupils-upload", text: "Загрузка учеников" },
    { id:2, path: "/admin/pupils", text: "Список учеников" },
    { id:3, path: "/admin/specialists-upload", text: "Загрузка специалистов" },
    { id:4, path: "/admin/specialists", text: "Список специалистов" },
    { id:5, path: "/admin/simulations", text: "Симуляции" }
];
export const AdminSidebar = () => {
    const [activeItemId, setActiveItemId] = useState()
    return (<>
        <div className="sidebar">
            <h3>Admin Panel</h3>
            <nav className="items">
                {navItems.map(item => (
                    <NavLink 
                        className={`item ${activeItemId === item.id ? 'active' : ''}`}
                        to={item.path} 
                        onClick={() => setActiveItem(item.id)}>
                            
                        {item.text}
                    </NavLink>
                ))}
            </nav>
        </div>
    </>)
}