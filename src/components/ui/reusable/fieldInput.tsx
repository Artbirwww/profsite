import "./css/fieldInputStyles.css"

import { ChangeEvent, FC, KeyboardEvent, ReactNode, useState } from "react"
import { Eye, EyeClosed } from "lucide-react"

interface FieldInputProps {
    inputLabel?: string
    inputIcon?: ReactNode
    inputPlaceholder?: string
    inputType?: string
    inputValue?: string
    inputOnChange?: (value: string) => void
    isPassword?: boolean
    isRequired?: boolean
    isDisabled?: boolean
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
    name?: string
}

export const FieldInput: FC<FieldInputProps> = ({ inputLabel, inputIcon, inputPlaceholder, inputType = "text", inputValue, inputOnChange, isPassword, isRequired = true, isDisabled = false, onKeyDown, name }) => {
    const [isVisible, setIsVisible] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (isDisabled) return
        inputOnChange?.(e.target.value)
    }

    const toggleVisibility = () => {
        if (isDisabled) return
        setIsVisible(!isVisible)
    }

    const finalType = isPassword ? (isVisible ? "text" : "password") : inputType

    return (
        <div className={`custom-input-wrapper ${isDisabled ? "input-disabled" : ""}`}>

            {inputLabel && (

                <label htmlFor={name}>

                    {inputLabel}

                </label>

            )}

            <div className="custom-input-container field-input">

                <input
                    id={name}
                    type={finalType}
                    placeholder={inputPlaceholder}
                    value={inputValue}
                    required={isRequired}
                    disabled={isDisabled}
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                    style={{ paddingLeft: inputIcon ? "45px" : "20px", paddingRight: isPassword ? "45px" : "20px" }} />

                {inputIcon && (

                    <div className="custom-input-icon">

                        {inputIcon}

                    </div>

                )}

                {isPassword && (

                    <div
                        className="custom-input-password-visibility"
                        onClick={toggleVisibility}
                        role="button"
                        aria-label="Toggle password visibility">

                        {isVisible ? <EyeClosed size={20} /> : <Eye size={20} />}

                    </div>

                )}

            </div>

        </div>
    )
}
