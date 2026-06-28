
import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { companyApi } from "../../services/api/companyApi"
import { toast } from "react-hot-toast"
import "../adminPages/css/form.css"

interface CreateSpecialistFormProps {
    onSuccess: (specialist: any) => void
    onCancel: () => void
    defaultCompanyName?: string
}

interface FormField {
    name: string
    label: string
    type: string
    placeholder: string
    required?: boolean
    minLength?: number
}

const FORM_FIELDS: FormField[] = [
    { name: 'email', label: 'Email *', type: 'email', placeholder: 'specialist@company.com', required: true },
    { name: 'password', label: 'Пароль *', type: 'password', placeholder: 'Минимум 6 символов', required: true, minLength: 6 },
    { name: 'surname', label: 'Фамилия *', type: 'text', placeholder: 'Иванов', required: true },
    { name: 'name', label: 'Имя *', type: 'text', placeholder: 'Иван', required: true },
    { name: 'patronymic', label: 'Отчество', type: 'text', placeholder: 'Иванович' },
]

export const CreateSpecialistForm = ({ 
    onSuccess, 
    onCancel, 
    defaultCompanyName 
}: CreateSpecialistFormProps) => {
    const { getToken } = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        surname: '',
        patronymic: '',
        companyName: defaultCompanyName || '',
        role: 'SPECIALIST'
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const validateForm = (): boolean => {
        const requiredFields = FORM_FIELDS.filter(f => f.required)
        
        for (const field of requiredFields) {
            if (!formData[field.name as keyof typeof formData]?.trim()) {
                toast.error(`Поле "${field.label}" обязательно для заполнения`)
                return false
            }
        }

        if (!formData.email.includes('@')) {
            toast.error('Введите корректный email')
            return false
        }

        if (formData.password.length < 6) {
            toast.error('Пароль должен содержать минимум 6 символов')
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        try {
            setIsSubmitting(true)
            const newSpecialist = await companyApi.createSpecialistByHR(getToken(), formData)
            onSuccess(newSpecialist)
            onCancel()
            toast.success(`Специалист ${newSpecialist.fullName || newSpecialist.email} создан!`)
        } catch (error: any) {
            console.error("Failed to create specialist:", error)
            const message = error.response?.data || 'Ошибка при создании специалиста'
            toast.error(message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-grid">
                {FORM_FIELDS.map((field) => (
                    <div className="form-group" key={field.name}>
                        <label>{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name as keyof typeof formData] || ''}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            required={field.required}
                            minLength={field.minLength}
                        />
                    </div>
                ))}
                
                {defaultCompanyName && (
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Компания</label>
                        <input
                            type="text"
                            value={defaultCompanyName}
                            disabled
                            style={{ 
                                background: 'var(--grey-color-200)',
                                cursor: 'not-allowed',
                                opacity: 0.8
                            }}
                        />
                    </div>
                )}
            </div>

            <div className="form-actions">
                <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Отмена
                </button>
                <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Создание...' : 'Добавить сотрудника'}
                </button>
            </div>
        </form>
    )
}