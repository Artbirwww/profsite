import "./css/authStyle.css"

import { GraduationCap, MailOpen, KeyRound, Repeat, MoveLeft } from "lucide-react"
import { FC, FormEvent, useCallback, useState } from "react"
import { FieldInput } from "../ui/reusable/fieldInput";
import { Button } from "../../components/ui/reusable/button"
import { useNavigate } from "react-router-dom"
import { authApi } from "../../services/api/authApi"
import toast, { Toaster } from "react-hot-toast"
import { User } from "../../types/User";

type UserType = "Школьник" | "Специалист" | "Эксперт" 

const USER_TYPE = [
    {
        id: "Школьник" as UserType,
        title: "Школьник",
        description: "Я учусь в школе",
    },
    {
        id: "Специалист" as UserType,
        title: "Специалист",
        description: "Я работаю по профессии",
    },
    {
        id: "Эксперт" as UserType,
        title: "Эксперт",
        description: "Я эксперт",
        disabled: true,
    },
]
const registrationRoutes: Record<UserType, string> = {"Школьник": "/register/pupil", "Специалист": "/register/specialist", "Эксперт": "/login"}
export const RegistrationTypePicker = () => {
    const navigate = useNavigate()
    const [userType, setUserType] = useState<UserType>()
    const handleSelectType = (type: UserType) => {
            const selected = USER_TYPE.find(item => item.id === type)
            if (selected?.disabled) return
    
            navigate(registrationRoutes[type])
        }
    
    return (<>
        <div className="auth-container">
            <div className="registration-container">
                <div className="registration-header">
                    <div className="registration-icon"><GraduationCap size={34} /></div>
                    <h2>Добро пожаловать!</h2>
                    <span>Выберите, кем вы являетесь</span>
                </div>

                <div className="registration-type-options">
                    {USER_TYPE.map(({ id, title, description, disabled }) => (
                        <div className="type-item" key={id} onClick={() => handleSelectType(id)} style={{ opacity: disabled ? .5 : 1, cursor: disabled ? "not-allowed" : "pointer" }}>
                            <p>{title}</p>
                            <span>{description}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <Button buttonLabel={"У меня уже есть аккаунт"}
                    buttonType={"link"}
                    buttonFunction={() => navigate("/login")} />
        </div>
        <Toaster />
    </>)
}