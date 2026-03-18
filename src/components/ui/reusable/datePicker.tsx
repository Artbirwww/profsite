import "./css/datePickerStyles.css"
import "@js-temporal/polyfill"
import { Temporal } from "@js-temporal/polyfill"
import { ChevronLeft, ChevronRight, CalendarRange } from "lucide-react"
import { FC, useRef, useState, MouseEvent, ReactNode, ChangeEvent, useEffect, useId } from "react"

interface DatePickerProps {
    datePickerLabel?: string
    datePickerIcon?: ReactNode
    datePickerSelected?: Temporal.PlainDate
    onDateSelect: (date: Temporal.PlainDate) => void
    datePickerPlaceholder?: string
    isDisabled?: boolean
    dropdownDirection?: "up" | "down"
    name?: string
}

export const DatePicker: FC<DatePickerProps> = ({ datePickerLabel, datePickerIcon = <CalendarRange size={20} />, datePickerSelected, onDateSelect, datePickerPlaceholder = "Выберите дату...", isDisabled = false, dropdownDirection = "down", name }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [viewDate, setViewDate] = useState<Temporal.PlainDate>((datePickerSelected || Temporal.Now.plainDateISO()) as Temporal.PlainDate)

    const generatedId = useId()
    const finalId = name || generatedId
    const containerRef = useRef<HTMLDivElement>(null)
    const hasValue = !!datePickerSelected

    const currentYear = Temporal.Now.plainDateISO().year
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

    useEffect(() => {
        const handleClickOutside = (e: Event) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node))
                setIsOpen(false)
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("touchstart", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("touchstart", handleClickOutside)
        }

    }, [])

    const toggleDatePicker = () => {
        if (!isDisabled) setIsOpen(!isOpen)
    }

    const handleDateClick = (day: number) => {
        const currentDate = viewDate.with({ day }) as Temporal.PlainDate
        onDateSelect(currentDate)
        setIsOpen(false)
    }

    const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(e.target.value)
        setViewDate(viewDate.with({ year: newYear }) as Temporal.PlainDate)
    }

    const handlePrevMonth = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setViewDate(viewDate.subtract({ months: 1 }) as Temporal.PlainDate)
    }

    const handleNextMonth = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setViewDate(viewDate.add({ months: 1 }) as Temporal.PlainDate)
    }

    const renderDays = () => {
        const days = []
        const firstDayOfMonth = viewDate.with({ day: 1 })
        const startOffset = (firstDayOfMonth.dayOfWeek - 1)
        const daysInMonth = viewDate.daysInMonth

        for (let i = 0; i < startOffset; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const currentDate = viewDate.with({ day: d })
            const isSelected = datePickerSelected && Temporal.PlainDate.compare(currentDate, datePickerSelected) === 0

            days.push(
                <div key={d} onClick={() => handleDateClick(d)} className={`calendar-day ${isSelected ? "calendar-day-selected" : ""}`}>

                    {d}

                </div>
            )
        }

        return days
    }

    return (
        <div className={`custom-date-picker-wrapper ${isDisabled ? "date-picker-disabled" : ""}`} ref={containerRef}>

            {datePickerLabel && (

                <label htmlFor={finalId} className="custom-date-picker-label">

                    {datePickerLabel}

                </label>

            )}

            <div className="custom-date-picker-container">

                <div
                    id={finalId}
                    onClick={toggleDatePicker}
                    className={`custom-date-picker-header ${isOpen ? "date-picker-active" : ""} ${hasValue ? "date-picker-has-value" : ""}`}
                    tabIndex={isDisabled ? -1 : 0}
                    style={{ paddingLeft: datePickerIcon ? "45px" : "20px" }}>

                    <span className="custom-date-picker-text">

                        {datePickerSelected
                            ? datePickerSelected.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" })
                            : datePickerPlaceholder}

                    </span>

                    {datePickerIcon &&

                        <div className="custom-date-picker-icon">

                            {datePickerIcon}

                        </div>

                    }

                </div>

            </div>

            {isOpen && (

                <div className={`calendar-dropdown dropdown-${dropdownDirection}`}>

                    <div className="calendar-header">

                        <button type="button" onClick={handlePrevMonth}>

                            <div className="calendar-button-icon">

                                {"<"}

                            </div>

                        </button>

                        <div className="calendar-title-group">

                            <span className="month-label">

                                {viewDate.toLocaleString("ru-RU", { month: "long" })}

                            </span>

                            <select className="calendar-year-select" value={viewDate.year} onChange={handleYearChange}>

                                {years.map(y => <option key={y} value={y}>{y}</option>)}

                            </select>

                        </div>

                        <button type="button" onClick={handleNextMonth}>

                            {">"}

                        </button>

                    </div>

                    <div className="calendar-grid-header">

                        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map(d => <div key={d}>{d}</div>)}

                    </div>

                    <div className="calendar-grid">

                        {renderDays()}

                    </div>

                </div>

            )}

        </div>
    )
}
