import toast from "react-hot-toast"
import { companyApi } from "../../../services/api/companyApi"
import { useAuth } from "../../../contexts/AuthContext"
import { useState } from "react"
import { HRManagerRequest } from "../../../types/company/HRManager"
import "../css/form.css"
/*Вынес поля формы как данные, удобно, также есть разбиение на секции данные самого HR и компании*/
interface FormField {
    name: keyof HRManagerRequest
    label: string
    type: string
    placeholder: string
    required?: boolean
    section?: string
    minLength?: number
}
const FORM_FIELDS: FormField[] = [
    // Personal info
    { name: 'surname', label: 'Фамилия *', type: 'text', placeholder: 'Иванов', required: true, section: 'personal' },
    { name: 'name', label: 'Имя *', type: 'text', placeholder: 'Иван', required: true, section: 'personal' },
    { name: 'patronymic', label: 'Отчество', type: 'text', placeholder: 'Иванович', section: 'personal' },
    { name: 'email', label: 'Email *', type: 'email', placeholder: 'hr@company.com', required: true, section: 'personal' },
    { name: 'password', label: 'Пароль *', type: 'password', placeholder: 'Минимум 6 символов', required: true, minLength: 6, section: 'personal' },
    
    // Company info
    { name: 'companyName', label: 'Название компании *', type: 'text', placeholder: 'ООО Горная Компания', required: true, section: 'company' },
    { name: 'companyInn', label: 'ИНН *', type: 'text', placeholder: '1234567890', required: true, section: 'company' },
    { name: 'companyOgrn', label: 'ОГРН *', type: 'text', placeholder: '1123456789012', required: true, section: 'company' },
    { name: 'companyPhone', label: 'Телефон', type: 'text', placeholder: '+74991234567', section: 'company' },
    { name: 'companyEmail', label: 'Email компании', type: 'email', placeholder: 'info@company.com', section: 'company' },
    { name: 'companyAddress', label: 'Адрес', type: 'text', placeholder: 'г. Москва, ул. Горная, д. 1', section: 'company' },
]
interface HRFormProps {
    onSuccess: (hr: any) => void
    onCancel: () => void
}
export const HRForm = ({onSuccess, onCancel}: HRFormProps) => {

    const { getToken } = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<HRManagerRequest>({
        email: '',
        password: '',
        role: 'HR',
        name: '',
        surname: '',
        patronymic: '',
        companyName: '',
        companyInn: '',
        companyOgrn: '',
        companyAddress: '',
        companyPhone: '',
        companyEmail: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const validateForm = (): boolean => {
        const requiredFields = FORM_FIELDS.filter(f => f.required)
        
        for (const field of requiredFields) {
            if (!formData[field.name]?.trim()) {
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
            const newHR = await companyApi.createHR(getToken(), formData)
            onSuccess(newHR)
            onCancel()
            //toast.success(`HR-менеджер ${newHR.fullName} создан!`)
        } catch (error: any) {
            console.error("Failed to create HR:", error)
            const message = error.response?.data || 'Ошибка при создании HR-менеджера'
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
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            required={field.required}
                            minLength={field.minLength}
                        />
                    </div>
                ))}
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
                    {isSubmitting ? 'Создание...' : 'Создать HR'}
                </button>
            </div>
        </form>
    )
}