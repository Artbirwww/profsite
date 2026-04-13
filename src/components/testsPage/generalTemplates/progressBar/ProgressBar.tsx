import "../../css/generalTemplatesStyles.css"

interface ProgressBarProps {
    currentTaskNumber: number
    total: number
}

export const ProgressBar = ({ currentTaskNumber, total }: ProgressBarProps) => {
    const progress = Math.round((currentTaskNumber / (total - 1)) * 100)

    return (
        <div className="test-progress-bar" style={{ width: `${progress}%` }}/>
    )
}