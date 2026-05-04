import { GraduationCap, MailOpen, KeyRound, Repeat, MoveLeft, CheckCheck, ArrowLeft } from "lucide-react"
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useCallback, useState } from "react"
import { FieldInput } from "../../ui/reusable/fieldInput";
import { Button } from "../../ui/reusable/button"
import { useNavigate } from "react-router-dom"
import { authApi } from "../../../services/api/authApi"
import toast, { Toaster } from "react-hot-toast"
import { AccountForm } from "../../../types/account/account";
type UserType = "Школьник" | "Специалист" | "Эксперт"
interface RegistrationFormProps {
    userType: UserType
    account: AccountForm
    setAccount: Dispatch<SetStateAction<AccountForm>>
    handleRegistration: () => void
    handleBack: () => void
}
export const RegistrationForm = ({ userType, account, setAccount, handleRegistration, handleBack }: RegistrationFormProps) => {
    const updateField = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setAccount(prev => ({ ...prev, [name]: value }))
    }
    const startRegistration = () => {
        if (account.email === "" || account.password === "" || account.repeatPassword == "") {
            toast.error("Заполните все поля")
            return
        }
        if (account.password !== account.repeatPassword) {
            toast.error("Пароли не совпадают")
            return
        }
        handleRegistration()
    }
    return (<>
        <div className="auth-container">
            <div className="registration-container">
                <div className="registration-header">
                    <div className="registration-icon"><GraduationCap size={34} /></div>
                    <h2>Регистрация</h2>
                    <span>Заполните электронную почту и пароль</span>
                </div>

                <div className="registrarion-form-cols">
                    <div className="registration-form-row">
                        <FieldInput inputLabel={"Электронная почта"}
                            inputIcon={<MailOpen size={20} />}
                            inputPlaceholder={"example@gmail.com"}
                            inputValue={account.email}
                            name="email"
                            onChange={(e) => updateField(e)} />
                    </div>

                    <div className="registration-form-row">
                        <FieldInput inputLabel={"Пароль"}
                            inputIcon={<KeyRound size={20} />}
                            inputType={"password"}
                            isPassword={true}
                            inputValue={account.password}
                            name="password"
                            onChange={(e) => updateField(e)} />

                        <FieldInput inputLabel={"Повторите пароль"}
                            inputIcon={<Repeat size={20} />}
                            inputType={"password"}
                            isPassword={true}
                            inputValue={account.repeatPassword}
                            name="repeatPassword"
                            onChange={(e) => updateField(e)}
                            onKeyDown={(e) => { if (e.key === "Enter") handleRegistration() }} />
                    </div>

                    <div className="registration-form-row">
                        <Button label="Зарегистрироваться" onClick={startRegistration} icon={<CheckCheck />} />
                        <Button label="Назад" variant="tertiary" onClick={handleBack} icon={<ArrowLeft />} />
                    </div>
                </div>
            </div>
        </div>
        <Toaster />
    </>)
}