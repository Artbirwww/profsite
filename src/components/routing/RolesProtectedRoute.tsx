import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useEffect, useState } from "react"

interface RolesProps {
    roles : string[]
}

export const RolesProtectedRoute = ({roles}: RolesProps) => {
    const {getToken, logout} = useAuth()
    const [userRoles, setUserRoles] = useState<string[] | undefined>(undefined)

    const navigate = useNavigate()
    useEffect(()=> {
        const getRoles = async (token: string | undefined) => {
            if (!token) {
                logout()
                navigate('/login')
                return
            }
            try {
                //api for get routes by token
                //after get roles map via them for checking matches
            } catch (err) {
                setUserRoles(["PUPIL"]) // by default
            }
        }
        getRoles(getToken())
    }, [])
    if (!userRoles) {
        return <p>Загрузка...</p>
    }
    if (!getToken())
        return <Navigate to={'/login'} />
    
}