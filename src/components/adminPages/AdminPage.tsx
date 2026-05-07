import { Outlet } from "react-router-dom"
import { AdminSidebar } from "./AdminSidebar"
import "./css/admin-sidebar.css"
export const AdminPage = () => {

    return (<>
        <AdminSidebar />
        <div className="content">
            <Outlet />
        </div>

    </>)
}