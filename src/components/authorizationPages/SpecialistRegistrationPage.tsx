import { useState } from "react"
import { AccountForm } from "../../types/account/account"
import toast from "react-hot-toast"
import { specialistsAPI } from "../../services/api/specialistApi"
import { Specialist } from "../../types/specialist/specialist"
import { RegistrationForm } from "./forms/RegistrationForm"
import { useNavigate } from "react-router-dom"
import { Gender } from "../../types/pupil/gender"

export const SpecialistRegistrationPage = () => {
    const navigate = useNavigate()
    const [accountData, setAccountData] = useState<AccountForm>({email : "", password : "", repeatPassword : ""})
    const [specialistData, setSpecialistData] = useState<Specialist>({email: "", contactEmail: "", name: "", surname: "", patronymic: "", 
        contactPhone: "", experience: "", jobSatisfaction: "", profession: "", gender: Gender.MALE})
    const registration = async () => {
        try {
            await specialistsAPI.specialistRegister({
                account: {email: accountData.email, password: accountData.password}, 
                specialist: specialistData})
            toast.success("Вы успешно зарегистрировались")
            navigate("/login")
        } catch(err) {
            console.error(err)
            toast.error("Возникла ошибка при регистрации")
        }
    }

    return (<>
        <RegistrationForm account={accountData} setAccount={setAccountData} 
        handleBack={() => navigate(-1)} userType={"Специалист"} handleRegistration={registration}/>
    </>)
}