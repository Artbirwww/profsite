import "./css/progress-bar-style.css"

import { FC } from "react"

// Интерфейс для пропсов progress bar
interface ProgressBarProps {
    value?: number // Текущее значение
    max?: number   // Максимальное значение
}

export const ProgressBar: FC<ProgressBarProps> = ({ value = 0, max = 0 }) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
        <div className="custom-progress-bar-container">
            <div className="custom-progress-bar-fill" style={{ width: `${percentage}%` }}/>
        </div>
    )
}
