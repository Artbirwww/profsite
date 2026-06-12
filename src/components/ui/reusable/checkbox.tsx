import "./css/checkbox.css"

import { FC, InputHTMLAttributes, ReactNode, useId } from "react"

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "label"> {
    label?: ReactNode
    error?: string
}

export const Checkbox: FC<CheckboxProps> = ({ label, error, className = "", disabled, ...props }) => {
    const generateId = useId()
    const finalId = props.id || generateId

    return (
        <div className={`custom-checkbox-wrapper ${disabled ? "checkbox-disabled" : ""} ${className}`}>
            <label htmlFor={finalId} className="custom-checkbox-label">
                <input
                    {...props}
                    id={finalId}
                    type="checkbox"
                    disabled={disabled}
                    className="custom-checkbox-input" />

                <span className="custom-checkbox-box"></span>

                {label && (
                    <span className="custom-checkbox-text">
                        {label}
                    </span>
                )}
            </label>
        </div>
    )
}