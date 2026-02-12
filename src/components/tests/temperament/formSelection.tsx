import { FC } from "react"

interface FormSelectionProps {
    onSelect: (form: "A" | "B") => void
    title: string
}

export const FormSelection: FC<FormSelectionProps> = ({ onSelect, title = "Выберите форму тестирования" }) => {
    return (
        <div className="form-selection">

            <h1>{title}</h1>

            <div className="form-items-container">

                <div className="form-item-component"
                     onClick={() => onSelect("A")}>

                    <div className="form-item-order">

                    </div>

                    <div className="form-item-content">

                        <div className="form-item-label">
                            Форма A
                        </div>
                    </div>

                    <div className="form-item-button">

                    </div>
                </div>

                <div className="form-item-component"
                     onClick={() => onSelect("B")}>

                    <div className="form-item-order">

                    </div>

                    <div className="form-item-content">

                        <div className="form-item-label">
                            Форма B
                        </div>
                    </div>

                    <div className="form-item-button">

                    </div>
                </div>
            </div>
        </div>
    )
}