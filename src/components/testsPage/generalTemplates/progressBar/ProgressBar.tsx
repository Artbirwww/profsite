import { useEffect, useState } from "react"
import './progress-bar.css'
interface ProgressBarProps {
    currentTaskNumber: number
    total: number, 
}
//TODO only progress in props
export const ProgressBar = ({currentTaskNumber, total} : ProgressBarProps) => {
    const progress = Math.round((currentTaskNumber / total) * 100)
    const progressColor = (progress: number) => {
        if (progress >= 0 && progress < 30) return 'red'
        if (progress >= 30 && progress < 70) return 'orange'
        if (progress >= 70 && progress < 85) return 'yellowgreen'
        if (progress >= 85) return 'green'
    }
    return (
    <div className="progress-bar-wrapper">
        <div className="progress-bar" 
            style={{width: `${progress}%`, 
                    backgroundColor: progressColor(progress)}}>

        </div>
    </div>)
}