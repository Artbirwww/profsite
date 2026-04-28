import { ArrowRight } from "lucide-react"

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
    return (
        <div className="test-form-selection-item" onClick={() => onSelect(form.id, form.data)}>
            <div className="test-form-selection-name">
                <h4>{form.label}</h4>
            </div>

            <div className="test-form-selection-icon">
                <ArrowRight size={20} />
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