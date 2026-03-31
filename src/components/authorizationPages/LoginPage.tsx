import "./css/authStyle.css"

import { FC, FormEvent, useCallback, useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, KeyRound, MailOpen } from "lucide-react";

import { Button } from "../../components/ui/reusable/button";
import { authApi } from "../../services/api/authApi";
import { useAuth } from "../../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { FieldInput } from "../ui/reusable/fieldInput";

export const LoginPage: FC = () => {
    const navigate = useNavigate()
    const { login, setRoles } = useAuth()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const updateField = useCallback((field: keyof typeof formData) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        
        try {
            const token = await authApi.login(formData.email, formData.password)
            const roles = await authApi.getRoles(token)

            login(token)
            setRoles(roles)

            navigate("/")

        } catch (error) {
            console.error("Login failed:", error)
            toast.error("Возникла ошибка при входе")
        }
    }

    const handleBackToRegistration = () => {
        navigate("/register")
    }

    return (
        <div className="auth-container">
            <div className="login-container">
                <div className="login-header">
                    <div className="login-icon"><GraduationCap size={34} /></div>
                    <h2>Вход в систему</h2>
                    <span>Система профориентации для школьников, студентов и специалистов</span>
                </div>

                <form className="login-form-cols" onSubmit={handleSubmit}>
                    <div className="login-form-row">
                        <FieldInput inputLabel={"Электронная почта"}
                            inputIcon={<MailOpen size={20} />}
                            inputPlaceholder={"example@gmail.com"}
                            inputValue={formData.email}
                            inputOnChange={updateField("email")} />
                    </div>

                    <div className="login-form-row">
                        <FieldInput inputLabel={"Пароль"}
                            inputIcon={<KeyRound size={20} />}
                            inputType={"password"}
                            isPassword={true}
                            inputValue={formData.password}
                            inputOnChange={updateField("password")} 
                            onKeyDown={(e) => {if (e.key === "Enter") handleSubmit(e)}}/>
                    </div>

                    <div className="login-form-row">
                        <button type="submit" >Войти</button>
                    </div>
                </form>
            </div>

            <Button buttonLabel={"У меня нет аккаунта"}
                buttonType={"link"}
                buttonFunction={handleBackToRegistration} />
            <Toaster />
        </div>
    )
}