import "./css/radioStyles.css"

import { ChangeEvent, createContext, FC, ReactNode, useContext, useId } from "react";

interface RadioGroupContextProps {
    name: string
    value?: string
    onChange: (value: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextProps | null>(null)

interface RadioGroupProps {
    children: ReactNode
    name: string
    value?: string
    onChange: (value: string) => void
    direction?: "row" | "column"
    className?: string
}

export const RadioGroup: FC<RadioGroupProps> = ({ children, name, value, onChange, direction = "row", className = "custom-radio-group" }) => {
    return (
        <RadioGroupContext.Provider value={{ name, value, onChange }}>

            <div role="radiogroup" className={`radio-group-${direction} ${className}`} style={{ display: "flex", flexDirection: direction, gap: "10px" }}>

                {children}

            </div>

        </RadioGroupContext.Provider>
    )
}

interface RadioProps {
    radioLabel?: string
    radioValue: string
    radioGroup?: string
    radioOnChange?: (e: ChangeEvent<HTMLInputElement>) => void
    radioChecked?: boolean
    isDisabled?: boolean
    name?: string
}

export const Radio: FC<RadioProps> = ({ radioLabel, radioGroup, radioValue, radioOnChange, radioChecked, isDisabled, name }) => {
    const context = useContext(RadioGroupContext)
    const generatedId = useId()

    const finalName = context?.name || radioGroup || name || "radio-group"
    const isChecked = context ? context.value === radioValue : radioChecked

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (context) {
            context.onChange(radioValue)
        }
        radioOnChange?.(e)
    }

    const uniqueId = `${finalName}-${radioValue}-${generatedId}`

    return (
        <div className={`custom-radio-wrapper ${isDisabled ? "radio-disabled" : ""}`}>

            <input
                id={uniqueId}
                type="radio"
                name={finalName}
                value={radioValue}
                checked={isChecked}
                onChange={handleChange}
                disabled={isDisabled}
                className="custom-radio-input" />

            <label htmlFor={uniqueId} className="custom-radio-label">

                <div className="custom-radio-visual-box" />

                {radioLabel && (

                    <span className="custom-radio-text">

                        {radioLabel}

                    </span>

                )}

            </label>

        </div>
    )
}
