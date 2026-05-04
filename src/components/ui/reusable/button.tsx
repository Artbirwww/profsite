import { ButtonHTMLAttributes, FC, ReactNode } from "react"
import "./css/buttonStyles.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string
    icon?: ReactNode
    variant?: "primary" | "secondary" | "tertiary" | "ghost" | "icon-only"
    width?: number
    isLoading?: boolean
}

export const Button: FC<ButtonProps> = ({ label, icon, variant = "primary", width, isLoading = false, className = "", children, ...props }) => {
    const classes = [
        "custom-button",
        variant,
        isLoading ? "loading" : "",
        className,
    ].join(" ").trim()

    return (
        <button className={classes} style={{ width: `${width}px` }} disabled={isLoading || props.disabled} {...props}>
            {variant !== "icon-only" &&
                <div className="button-label">
                    {label || children}
                </div>
            }

            {icon && <div className="button-icon"><span>{icon}</span></div>}
        </button>
    )
}