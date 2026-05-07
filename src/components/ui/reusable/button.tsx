import { ButtonHTMLAttributes, FC, ReactNode, useEffect, useState } from "react"
import "./css/buttonStyles.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string
    icon?: ReactNode
    variant?: "primary" | "secondary" | "tertiary" | "ghost" | "icon-only" | "timer" | "done"
    width?: number
    height?: number
    isLoading?: boolean
    timerSeconds?: number
}

export const Button: FC<ButtonProps> = ({ label, icon, variant = "primary", width, height, isLoading = false, timerSeconds = 0, className = "", children, ...props }) => {
    const [secondsLeft, setSecodnsLeft] = useState(timerSeconds)

    useEffect(() => {
        if (variant === "timer" && secondsLeft > 0) {
            const timer = setInterval(() => {
                setSecodnsLeft((prev) => prev - 1)
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [variant, secondsLeft])

    useEffect(() => {
        setSecodnsLeft(timerSeconds)
    }, [timerSeconds])

    const isTimerActive = variant === "timer" && secondsLeft > 0

    const classes = [
        "custom-button",
        variant,
        isLoading ? "loading" : "",
        className,
    ].join(" ").trim()



    return (
        <button className={classes} style={{ width: `${width}px`, height: `${height}px` }} disabled={isLoading || isTimerActive || props.disabled} {...props}>
            {variant !== "icon-only" &&
                <div className="button-label">
                    {label || children}
                </div>
            }

            {(icon || isTimerActive) &&
                <div className="button-icon">
                    <span>{isTimerActive ? secondsLeft : icon}</span>
                </div>
            }
        </button>
    )
}