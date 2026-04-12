import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import React from 'react';
export const AuthRouter: React.FC = () => {
    const {token, getToken, isLoading} = useAuth()
    const navigate = useNavigate()
    const checkForToken = () => {
        //even if error occured go to top page (getToken use in many scenarious)
        try {
            if (getToken()) return true
        } catch(err) {
            return true
        }
    }
    if (isLoading) return(
        <>
            <p>Загрузка...</p>
        </>)
    if (checkForToken()) {
        return <Navigate to={'/'} />
    }

    return <Outlet />
}