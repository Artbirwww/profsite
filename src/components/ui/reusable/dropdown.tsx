import "./css/dropdownStyles.css"

import { FC, ReactNode, useEffect, useRef, useState, useId } from "react"
import { ChevronDown } from "lucide-react"

export interface DropdownOption {
    value: string | number
    label: string
}

interface DropdownProps {
    dropdownLabel?: string
    dropdownIcon?: ReactNode
    dropdownOptions: DropdownOption[]
    dropdownSelected?: string | number
    optionOnSelect: (option: DropdownOption) => void
    dropdownPlaceholder?: string
    isDisabled?: boolean
    dropdownDirection?: "up" | "down"
    name?: string
}

export const Dropdown: FC<DropdownProps> = ({ dropdownLabel, dropdownIcon, dropdownOptions, dropdownSelected, optionOnSelect, dropdownPlaceholder = "Выберите...", isDisabled = false, dropdownDirection = "down", name }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const generatedId = useId()

    const finalId = name || generatedId
    const selectedOption = dropdownOptions.find(opt => opt.value === dropdownSelected)
    const hasValue = dropdownSelected !== undefined && dropdownSelected !== ""

    useEffect(() => {
        const handleClickOutside = (e: Event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("touchstart", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("touchstart", handleClickOutside)
        }
    }, [])

    const toggleDropdown = () => {
        if (!isDisabled) {
            setIsOpen(!isOpen)
        }
    }

    const handleOptionClick = (option: DropdownOption) => {
        optionOnSelect(option)
        setIsOpen(false)
    }

    return (
        <div className={`custom-dropdown-wrapper ${isDisabled ? "dropdown-disabled" : ""}`} ref={dropdownRef}>

            {dropdownLabel && (

                <label htmlFor={finalId} className="custom-dropdown-label">

                    {dropdownLabel}

                </label>

            )}

            <div className="custom-dropdown-container">

                <div
                    id={finalId}
                    onClick={toggleDropdown}
                    className={`custom-dropdown-header ${isOpen ? "dropdown-active" : ""} ${hasValue ? "dropdown-has-value" : ""}`}
                    tabIndex={isDisabled ? -1 : 0}
                    style={{ paddingLeft: dropdownIcon ? "45px" : "20px" }}>

                    <div className="custom-dropdown-selected-content">

                        <span className="custom-dropdown-text">

                            {selectedOption ? selectedOption.label : dropdownPlaceholder}

                        </span>

                    </div>

                    {dropdownIcon && (

                        <div className="custom-dropdown-icon">

                            {dropdownIcon}

                        </div>

                    )}

                    <div className={`custom-dropdown-chevron ${isOpen ? "chevron-rotated" : ""}`}>

                        <ChevronDown size={20} />

                    </div>

                </div>

                {isOpen && (

                    <ul className={`custom-dropdown-list dropdown-${dropdownDirection}`}>

                        <li onClick={() => handleOptionClick({ value: "", label: dropdownPlaceholder })} className={`custom-dropdown-item ${!hasValue ? "item-selected" : ""}`}>

                            <span>{dropdownPlaceholder}</span>

                        </li>

                        {dropdownOptions.map((option) => (

                            <li key={option.value} onClick={() => handleOptionClick(option)} className={`custom-dropdown-item ${option.value === dropdownSelected ? "item-selected" : ""}`}>

                                <span>{option.label}</span>

                            </li>

                        ))}

                    </ul>

                )}

            </div>

        </div>
    )
}
