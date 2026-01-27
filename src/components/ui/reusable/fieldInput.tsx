import "./css/field-input-style.css"

import { ChangeEvent, FC, KeyboardEvent, ReactNode, useState } from "react"
import { Eye, EyeClosed } from "lucide-react"

// Интерфейс для пропсов input
interface FieldInputProps {
    inputLabel?: string                                       // Текст input
    inputIcon?: ReactNode                                     // Иконка input
    inputPlaceholder?: string                                 // Плейсхолдер input
    inputType?: string                                        // Тип input
    inputValue?: string                                       // Значение input
    inputOnChange?: (value: string) => void                   // Изменение состояния input
    isPassword?: boolean                                      // Иконка input
    isRequired?: boolean                                      // Это пароль?
    isImportant?: boolean                                     // Поле важно для заполнения?
    onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void // Нажатие кнопки на клавиатуре вызывает ивент??
    name?: string                                             // Имя input
}

export const FieldInput: FC<FieldInputProps> = ({ inputLabel, inputIcon, inputPlaceholder, inputType = "text", inputValue, inputOnChange, isPassword, isRequired = true, isImportant, onKeyPress, name = "custom-input" }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isDirty, setIsDirty] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        inputOnChange?.(e.target.value)
    }

    const handleBlur = () => {
        setIsDirty(true)
    }

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    const hasDirty = isImportant && isDirty && inputValue?.trim() === ""
    const finalType = isPassword ? (isVisible ? "text" : "password") : inputType

    return (
        <div className="custom-input-wrapper">
            {inputLabel && (<label className={hasDirty ? "custom-input-label-dirty" : ""}>{inputLabel} {`${isImportant ? "*" : ""}`}</label>)}

            <div className={`custom-input-container field-input ${hasDirty ? "custom-input-dirty" : ""}`}>
                <input id={name}
                       type={finalType}
                       placeholder={inputPlaceholder}
                       value={inputValue}
                       required={isRequired}
                       onBlur={handleBlur}
                       onChange={handleChange}
                       onKeyDown={onKeyPress}
                       style={{paddingLeft: `${inputIcon ? "45px" : "20px"}`, paddingRight: `${isPassword ? "45px" : "20px"}`}}/>

                {inputIcon && (<div className="custom-input-icon">{inputIcon}</div>)}

                {isPassword && (<div className="custom-input-password-visibility" onClick={toggleVisibility}>{isVisible ? <EyeClosed size={20}/> : <Eye size={20}/>}</div>)}
            </div>
        </div>
    )
}