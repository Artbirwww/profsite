import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { Role, ROLES } from "../../types/account/role"
import { authApi } from "../../services/api/authApi"

interface ApprovedRolesProps {
    approvedRoles : string[]
}

export const RolesProtectedRoute: React.FC<ApprovedRolesProps> = ({approvedRoles} : ApprovedRolesProps) => {
    const {getToken, logout} = useAuth()
    const [userRoles, setUserRoles] = useState<Role[] | undefined>(undefined)

    const navigate = useNavigate()
    useEffect(()=> {
        const getRoles = async (token: string | undefined) => {
            if (!token) {
                logout()
                navigate('/login')
                return
            }
            try {
                const rolesData = await authApi.getRoles(token)
                console.log(rolesData)
                setUserRoles(rolesData)
                //api for get routes by token
                //after get roles map via them for checking matches
            } catch (err) {
                setUserRoles([{name: ROLES.PUPIL}]) // by default or logout if need
            }
        }
        getRoles(getToken())
    }, [])
    if (!userRoles) {
        return <p>Загрузка...</p>
    }
    if (!getToken())
        return <Navigate to={'/login'} />
    if (userRoles && userRoles.some(role => approvedRoles.includes(role.name)))
        return <Outlet/>
    else 
        return <Navigate to={'/'} />
    
}