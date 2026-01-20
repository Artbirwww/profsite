import "./css/dropdown-style.css"

import { FC, ReactNode, useEffect, useRef, useState, FocusEvent } from "react"
import { ChevronDown } from "lucide-react"

// Иконки предоставлены библиотекой "lucide-react"

// Интерфейс для элемента dropdown
export interface DropdownOption {
    value: string | number
    label: string
}

// Интерфейс для пропсов dropdown
interface DropdownProps {
    dropdownLabel?: string                           // Текст dropdown
    dropdownIcon?: ReactNode                         // Иконка dropdown
    dropdownOptions: DropdownOption[]                // Опции dropdown
    dropdownSelected?: string | number               // Выбранный элемент dropdown
    optionOnSelect: (option: DropdownOption) => void // Функиця при выборе опции
    dropdownPlaceholder?: string                     // Placeholder dropdown
    isDisabled?: boolean                             // Доступность
    isImportant?: boolean                            // Поле важно?
    name?: string                                    // Имя dropdown
}

export const Dropdown: FC<DropdownProps> = ({ dropdownLabel, dropdownIcon, dropdownOptions, dropdownSelected, optionOnSelect, dropdownPlaceholder = "Выберите...", isDisabled = false, isImportant, name = "custom-dropdown" }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isDirty, setIsDirty] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const selectedOption = dropdownOptions.find(opt => opt.value === dropdownSelected)

    const hasValue = dropdownSelected !== undefined && dropdownSelected !== ""

    useEffect(() => {
        const handleClickOutside = (e: Event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
                setIsOpen(false)
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("touchstart", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("touchstart", handleClickOutside)
        }
    }, [])

    const toggleDropdown = () => {
        if (!isDisabled)
            setIsOpen(!isOpen)
    }

    const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget as Node)) {
            setIsDirty(true)
        }
    }

    const handleOptionClick = (option: DropdownOption) => {
        optionOnSelect(option)
        setIsOpen(false)
    }

    const hasDirty = isImportant && isDirty && !hasValue
    
    return (
        <div className={`custom-dropdown-wrapper ${isDisabled ? "dropdown-disabled" : ""}`} ref={dropdownRef}>
            {dropdownLabel && <label className={`custom-dropdown-label ${hasDirty ? "custom-dropdown-label-dirty" : ""}`}>{dropdownLabel} {`${isImportant ? "*" : ""}`}</label>}

            <div className="custom-dropdown-container">
                <div id={name}
                     onClick={toggleDropdown}
                     className={`custom-dropdown-header ${isOpen ? "dropdown-active" : ""} ${hasValue ? "dropdown-has-value" : ""}`}
                     onBlur={handleBlur}
                     tabIndex={isDisabled ? -1 : 0}
                     style={{paddingLeft: `${dropdownIcon ? "45px" : "20px"}`}}>

                    <div className="custom-dropdown-selected-content">
                        <span className="custom-dropdown-text">
                            {selectedOption ? selectedOption.label : dropdownPlaceholder}
                        </span>
                    </div>

                    {dropdownIcon && <div className="custom-dropdown-icon">{dropdownIcon}</div>}

                    <div className={`custom-dropdown-chevron ${isOpen ? "chevron-rotated" : ""}`}>{<ChevronDown size={20}/>}</div>
                </div>
            </div>

            {isOpen && (
                <ul className="custom-dropdown-list">
                    <li onClick={() => handleOptionClick({ value: "", label: dropdownPlaceholder })}
                        className={`custom-dropdown-item ${!dropdownSelected ? "item-selected" : ""}`}>

                         <span>{dropdownPlaceholder}</span>   
                    </li>

                    {dropdownOptions.map((option) => (
                        <li key={option.value}
                            onClick={() => handleOptionClick(option)}
                            className={`custom-dropdown-item ${option.value === dropdownSelected ? "item-selected" : ""}`}>
                            
                            <span>{option.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}