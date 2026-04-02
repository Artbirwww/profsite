import { ArrowRight } from "lucide-react"
import { useRef, MouseEvent } from "react"

export interface TestFormConfig<T> {
    id: string
    label: string
    data: T[]
}

interface Props<T> {
    forms: TestFormConfig<T>[]
    onSelect: (formId: string, data: T[]) => void
}

const FormItem = <T,>({ form, onSelect }: { form: TestFormConfig<T>, onSelect: (id: string, data: T[]) => void }) => {
    const circleHoverRef = useRef<HTMLDivElement>(null)

    const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
        if (!circleHoverRef.current)
            return

        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        circleHoverRef.current.style.left = `${x}px`
        circleHoverRef.current.style.top = `${y}px`
    }

    return (
        <div className="test-form-selection-grid-item" onClick={() => onSelect(form.id, form.data)} onMouseEnter={handleMouseEnter}>
            <div className="test-form-selection-name">
                <h4>{form.label}</h4>
            </div>

            <div className="test-form-selection-option">
                <div className="test-form-selection-icon">
                    <ArrowRight size={20} />
                </div>
            </div>

            <div className="hover-circle" ref={circleHoverRef} />

        </div>
    )
}

export const TestFormSelection = <T,>({ forms, onSelect }: Props<T>) => {
    return (
        <div className="test-form-selection-grid">
            {forms.map((form) => (
                <FormItem key={form.id} form={form} onSelect={onSelect} />
            ))}
        </div>
    )
}