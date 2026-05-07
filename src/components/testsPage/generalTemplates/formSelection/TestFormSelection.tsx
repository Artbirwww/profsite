import { ArrowRight } from "lucide-react"
import { Button } from "../../../ui/reusable/button"
import { useEffect, useRef, MouseEvent } from "react"

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
    const cardRef = useRef<HTMLDivElement>(null)
    const targetPos = useRef({ x: 0, y: 0 })
    const currentPos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        let frameId: number

        const animate = () => {
            // Коэффициент инерции (0.1 — плавно, 0.2 — быстрее)
            const lerpFactor = 0.1

            // Вычисляем разницу и прибавляем часть к текущей позиции
            currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor
            currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor

            if (cardRef.current) {
                cardRef.current.style.setProperty("--mouse-x", `${currentPos.current.x}px`)
                cardRef.current.style.setProperty("--mouse-y", `${currentPos.current.y}px`)
            }

            frameId = requestAnimationFrame(animate)
        }

        frameId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(frameId)
    }, [])

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()

        // Обновляем только целевую позицию
        targetPos.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        }
    }

    return (
        <div ref={cardRef} className="test-form-selection-item" onMouseMove={handleMouseMove} onClick={() => onSelect(form.id, form.data)}>
            <div className="hover-circle" />

            <div className="test-form-selection-name">
                <h4>{form.label}</h4>
            </div>

            <div className="test-form-selection-decal">
                <ArrowRight />
            </div>
        </div>
    )
}

export const TestFormSelection = <T,>({ forms, onSelect }: Props<T>) => {
    return (
        <div className="test-form-selection">
            {forms.map((form) => (
                <FormItem key={form.id} form={form} onSelect={onSelect} />
            ))}
        </div>
    )
}