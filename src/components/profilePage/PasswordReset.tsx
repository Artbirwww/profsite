import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { FieldInput } from "../ui/reusable/fieldInput"
import toast from "react-hot-toast"
import { Button } from "../ui/reusable/button"
import { authApi } from "../../services/api/authApi"

export const PasswordReset = () => {
    const {getToken} = useAuth()
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault() // Prevent page reload
        
        // Validation
        if (!password || !repeatPassword) {
            toast.error("Введите пароль и повторите его")
            return
        }
        if (password.length < 6) {
            toast.error("Длина пароля должна быть не менее 6 символов")
            return
        }
        if (password !== repeatPassword) {
            toast.error("Пароли не совпадают")
            return
        }
        
        try {
            await authApi.updatePassword(getToken(), password)
            console.log("Password reset successful")
            toast.success("Пароль успешно изменен")
        } catch(err) {
            toast.error("Возникла ошибка при смене пароля")
        }

    }
    
    return (
        <div className="profile-card">
            <h4>Смена пароля</h4>
            <form onSubmit={handleSubmit}>
                <div className="password-fields">
                    <FieldInput
                        name="password"
                        inputPlaceholder="Пароль"
                        inputValue={password}
                        inputType="password"
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <FieldInput
                        name="repeatPassword"
                        inputPlaceholder="Повторите пароль"
                        inputValue={repeatPassword}
                        inputType="password"
                        onChange={(e) => setRepeatPassword(e.target.value)} 
                    />
                </div>
                <Button label="Изменить пароль" type="submit" />
            </form>
        </div>
    )
}