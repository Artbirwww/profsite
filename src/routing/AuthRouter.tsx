import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import React from 'react';
export const AuthRouter: React.FC = () => {
    const {token, getToken, isLoading, isTokenExpired} = useAuth()
    const navigate = useNavigate()
    
    if (isLoading) return(
        <>
            <p>Загрузка...</p>
        </>)
    if (getToken() && !isTokenExpired()) {
        return <Navigate to={'/'} />
    }

    return <Outlet />
}