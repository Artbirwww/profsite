import "./css/button-style.css"

import { FC, ReactNode, MouseEvent } from "react";

// Интерфейс для пропсов button
interface ButtonProps {
    buttonLabel?: string                                        // Текст button
    buttonIcon?: ReactNode                                      // Иконка button
    iconPosition?: "left" | "right" | "center"                  // Расположение иконки
    buttonType?: "default" | "link"                             // Тип button
    buttonFunction?: (e: MouseEvent<HTMLButtonElement>) => void // Функция для выполнения
    isDisabled?: boolean                                        // Заблокирована ли?
    name?: string                                               // Имя button
}

export const Button: FC<ButtonProps> = ({ buttonLabel, buttonIcon, iconPosition = "left", buttonType = "default", buttonFunction, isDisabled = false, name = "custom-button" }) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (!isDisabled && buttonFunction)
            buttonFunction(e)
    }

    return (
        <div className="custom-button-wrapper">
            <button id={name}
                    disabled={isDisabled}
                    onClick={handleClick}
                    className={`custom-button ${buttonType} ${isDisabled ? "disabled" : ""} ${iconPosition}`}>
                    
                {buttonIcon && (iconPosition === "left" || iconPosition === "center") && (<div className="custom-button-icon">{buttonIcon}</div>)}

                {buttonLabel && iconPosition !== "center" && (<span className="custom-button-text">{buttonLabel}</span>)}
                
                {buttonIcon && iconPosition === "right" && (<div className="custom-button-icon">{buttonIcon}</div>)}
            </button>
        </div>
    )
}