import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { companyApi } from "../../services/api/companyApi"
import { toast } from "react-hot-toast"
import "../adminPages/css/form.css"

interface CreateEmployeeFormProps {
    onSuccess: (employee: any) => void
    onCancel: () => void
    defaultCompanyName?: string
}

const AVAILABLE_ROLES = [
    { value: 'SPECIALIST', label: 'Специалист' },
    { value: 'APPLICANT', label: 'Соискатель' },
]

const FORM_FIELDS = [
    { name: 'surname', label: 'Фамилия *', type: 'text', placeholder: 'Иванов', required: true },
    { name: 'name', label: 'Имя *', type: 'text', placeholder: 'Иван', required: true },
    { name: 'patronymic', label: 'Отчество', type: 'text', placeholder: 'Иванович' },
    { name: 'email', label: 'Email *', type: 'email', placeholder: 'employee@company.com', required: true },
    { name: 'password', label: 'Пароль *', type: 'password', placeholder: 'Минимум 6 символов', required: true, minLength: 6 },
    { name: 'repeatPassword', label: 'Повторите пароль *', type: 'password', placeholder: 'Минимум 6 символов', required: true, minLength: 6 },
]

export const CreateEmployeeForm = ({ 
    onSuccess, 
    onCancel, 
    defaultCompanyName 
}: CreateEmployeeFormProps) => {
    const { getToken } = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        name: '',
        surname: '',
        patronymic: '',
        companyName: defaultCompanyName || '',
        role: 'SPECIALIST'
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const validateForm = (): boolean => {
        const required = ['surname', 'name', 'email', 'password', 'repeatPassword']
        for (const field of required) {
            if (!formData[field as keyof typeof formData]?.trim()) {
                toast.error(`Поле "${field}" обязательно для заполнения`)
                return false
            }
        }

        if (!formData.email.includes('@')) {
            toast.error('Введите корректный email')
            return false
        }

        if (formData.password.length < 6) {
            toast.error('Пароль должен быть минимум 6 символов')
            return false
        }

        if (formData.password !== formData.repeatPassword) {
            toast.error('Пароли не совпадают')
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        try {
            setIsSubmitting(true)
            const payload = {
                email: formData.email,
                password: formData.password,
                name: formData.name,
                surname: formData.surname,
                patronymic: formData.patronymic,
                companyName: formData.companyName,
                roles: [formData.role]
            }
            const newEmployee = await companyApi.createEmployeeByHR(getToken(), payload)
            onSuccess(newEmployee)
            onCancel()
            toast.success(`Сотрудник ${newEmployee.fullName} создан!`)
        } catch (error: any) {
            const message = error.response?.data || 'Ошибка при создании сотрудника'
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

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Роль</label>
                    <select 
                        name="role" 
                        value={formData.role} 
                        onChange={handleChange}
                        className="form-select"
                    >
                        {AVAILABLE_ROLES.map(role => (
                            <option key={role.value} value={role.value}>
                                {role.label}
                            </option>
                        ))}
                    </select>
                </div>

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