import { useAuth } from "../../contexts/AuthContext"
import { ROLES } from "../../types/account/role"
import { ProfilePage } from "./ProfilePage"
import { SpecialistProfilePage } from "./SpecialistProfilePage"

export const ProfileCommonPage = () => {

    const {getRoles} = useAuth()

    if (getRoles()?.find(role => role.name === ROLES.PUPIL))
        return (<>
            <ProfilePage />
        </>)
    if (getRoles()?.find(role => role.name === ROLES.SPECIALIST))
        return (<>
            <SpecialistProfilePage />
        </>)
}