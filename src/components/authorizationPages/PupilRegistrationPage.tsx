import { useState } from "react"
import { AccountForm } from "../../types/account/account"
import toast from "react-hot-toast"
import { specialistsAPI } from "../../services/api/specialistApi"
import { Specialist } from "../../types/specialist/specialist"
import { RegistrationForm } from "./forms/RegistrationForm"
import { useNavigate } from "react-router-dom"
import { authApi } from "../../services/api/authApi"
export const PupilRegistrationPage = () => {
    const navigate = useNavigate()
    const [accountData, setAccountData] = useState<AccountForm>({email : "", password : "", repeatPassword : ""})
    const registration = async () => {
        try {
            authApi.register(accountData.email, accountData.password)
            toast.success("Вы успешно зарегистрировались")
            navigate("/login")
        } catch(err) {
            console.error(err)
            toast.error("Возникла ошибка при регистрации")
        }
    }

    return (<>
        <RegistrationForm account={accountData} setAccount={setAccountData} 
        handleBack={() => navigate(-1)} userType={"Школьник"} handleRegistration={registration}/>
    </>)
}