import "./css/radio-style.css"

import { ChangeEvent, FC, useState } from "react";

// Интерфейс для пропсов radio button
interface RadioProps {
    radioLabel?: string                                        // Тескст radio button
    radioGroup?: string                                        // Группа в которой находится radio button
    radioValue?: string                                        // Значение radio button
    radioOnChange?: (e: ChangeEvent<HTMLInputElement>) => void // Функция при нажатии на radio button
    radioChecked?: boolean                                     // Нажат ли radio button
    isDisabled?: boolean                                       // Заблокирован ли?
    isImportant?: boolean                                      // Важно ли?
    name?: string                                              // Имя radio button
}

export const Radio: FC<RadioProps> = ({ radioLabel, radioGroup, radioValue, radioOnChange, radioChecked, isDisabled, isImportant, name }) => {
    const [isDirty, setIsDirty] = useState(false)
    
    const uniqueId = name || `radio-${Math.random().toString(36).substring(2, 9)}`

    const hasDirty = isImportant && isDirty && !radioChecked

    return (
        <div className="custom-radio-wrapper">
            <input id={uniqueId}
                   type="radio"
                   name={radioGroup}
                   value={radioValue}
                   onChange={radioOnChange}
                   checked={radioChecked}
                   disabled={isDisabled}
                   className={`custom-radio`}/>

            <label htmlFor={uniqueId} className={`custom-radio-label`}>
                <div className="custom-radio-visual-box"></div>

                {radioLabel && <span className={`custom-radio-text ${hasDirty ? "custom-radio-label-dirty" : ""}`}>{radioLabel}</span>}
            </label>
        </div>
    )
}