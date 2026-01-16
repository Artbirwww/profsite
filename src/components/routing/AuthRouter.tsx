import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import React from 'react';
export const AuthRouter: React.FC = () => {
    const {token, getToken, isLoading} = useAuth()
    const navigate = useNavigate()
    if (isLoading) return(
        <>
            <p>Загрузка...</p>
        </>)
    console.log(getToken())
    if (getToken()) {
        return <Navigate to={'/'} />
    }


    return <Outlet />
}