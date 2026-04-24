import { useAuth } from "../../contexts/AuthContext"
import { ROLES } from "../../types/account/role"
import { PupilProfilePage } from "./PupilProfilePage"
import { SpecialistProfilePage } from "./SpecialistProfilePage"

export const ProfileCommonPage = () => {

    const { getRoles } = useAuth()

    if (getRoles()?.find(role => role.name === ROLES.PUPIL))
        return (<>
            <PupilProfilePage />
        </>)

    if (getRoles()?.find(role => role.name === ROLES.SPECIALIST))
        return (<>
            <SpecialistProfilePage />
        </>)
}