import "./css/auth-style.css"

import { GraduationCap, MailOpen, KeyRound, Repeat, MoveLeft } from "lucide-react"
import { FC, FormEvent, useCallback, useState } from "react"
import { FieldInput } from "../ui/reusable/fieldInput"
import { Button } from "../ui/reusable/button"
import { useNavigate } from "react-router-dom"

type UserType = "Школьник" | "Студент" | "Специалист"

const USER_TYPE = [
    {
        id: "Школьник" as UserType,
        title: "Школьник",
        description: "Я учусь в школе",
    },
    {
        id: "Студент" as UserType,
        title: "Студент",
        description: "Я учусь в университете",
    },
    {
        id: "Специалист" as UserType,
        title: "Специалист",
        description: "Я работаю по профессии",
    },
]

export const Registration: FC = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState<1 | 2>(1)
    const [userType, setUserType] = useState<UserType | null>(null)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        repeatPassword: "",
    })

    const handleSelectType = (type: UserType) => {
        setUserType(type)
        setStep(2)
    }

    const updateField = useCallback((field: keyof typeof formData) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    const handleBack = () => {
        setStep(1)
    }

    const handleBackToLogin = () => {
        navigate("/login")
    }

    return (
        <div className="auth-container">
            {step === 1 &&
                <div className="registration-container">
                    <div className="registration-header">
                        <div className="registration-icon"><GraduationCap size={34}/></div>
                        <h2>Добро пожаловать!</h2>
                        <span>Выберите, кем вы являетесь</span>
                    </div>
                    
                    <div className="registration-type-options">
                        {USER_TYPE.map(({ id, title, description }) => (
                            <div className="type-item" key={id} onClick={() => handleSelectType(id)}>
                                <p>{title}</p>
                                <span>{description}</span>
                            </div>     
                        ))}
                    </div>
                </div>
            }

            {step === 2 && 
                <div className="registration-container">
                    <div className="registration-header">
                        <div className="registration-icon"><GraduationCap size={34}/></div>
                        <h2>Регистрация - {`${userType}`}</h2>
                        <span>Заполните электронную почту и пароль</span>
                    </div>

                    <div className="registrarion-form-cols">
                        <div className="registration-form-row">
                            <FieldInput inputLabel={"Электронная почта"}
                                        inputIcon={<MailOpen size={20}/>}
                                        inputPlaceholder={"example@gmail.com"}
                                        isImportant={true}
                                        inputValue={formData.email}
                                        inputOnChange={updateField("email")}/>
                        </div>

                        <div className="registration-form-row">
                            <FieldInput inputLabel={"Пароль"}
                                        inputIcon={<KeyRound size={20}/>}
                                        inputType={"password"}
                                        isImportant={true}
                                        isPassword={true}
                                        inputValue={formData.password}
                                        inputOnChange={updateField("password")}/>

                            <FieldInput inputLabel={"Подтвердите пароль"}
                                        inputIcon={<Repeat size={20}/>}
                                        inputType={"password"}
                                        isImportant={true}
                                        isPassword={true}
                                        inputValue={formData.repeatPassword}
                                        inputOnChange={updateField("repeatPassword")}/>
                        </div>

                        <div className="registration-form-row">
                            <div className="registration-form-tip">
                                <p>После регистрации вы сможете заполнить профиль (ФИО, школа, класс и т. д.) в личном кабинете</p>
                            </div>   
                        </div>

                        <div className="registration-form-row">
                            <Button buttonLabel={"Зарегистрироваться"}/>
                        </div>

                        <div className="registration-form-row">
                            <Button buttonLabel={"Назад"}
                                    buttonIcon={<MoveLeft size={20}/>}
                                    iconPosition={"left"}
                                    buttonType={"link"}
                                    buttonFunction={handleBack}/>
                        </div>
                    </div>
                </div>
            }

            <Button buttonLabel={"У меня уже есть аккаунт"}
                    buttonType={"link"}
                    buttonFunction={handleBackToLogin}/>
        </div>
    )
}