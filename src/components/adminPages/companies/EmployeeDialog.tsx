import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import toast from "react-hot-toast";
import { companyApi } from "../../../services/api/companyApi";
import { CompanyWithEmployees } from "../../../types/company/Company";
import { getRoleDisplayName } from "../../../types/account/role";

// Available roles for selection (single choice)
const AVAILABLE_ROLES = [
    { value: 'SPECIALIST', label: 'Специалист' },
    { value: 'HR', label: 'HR-менеджер' },
    { value: 'APPLICANT', label: 'Соискатель' }
]

export const EmployeeDialog = ({ company, onClose, onSuccess }: { 
    company: CompanyWithEmployees; 
    onClose: () => void; 
    onSuccess: () => void 
}) => {
    const { getToken } = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        name: '',
        surname: '',
        patronymic: '',
        role: 'SPECIALIST'  // Single role
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const validateForm = (): boolean => {
        if (!formData.surname.trim()) {
            toast.error('Фамилия обязательна')
            return false
        }
        if (!formData.name.trim()) {
            toast.error('Имя обязательно')
            return false
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
            toast.error("Пароли не совпадают!")
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        const payload = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            surname: formData.surname,
            patronymic: formData.patronymic,
            companyName: company.name,
            roles: [formData.role]
        }

        try {
            setIsSubmitting(true)
            await companyApi.createEmployeeByHR(getToken(), payload)
            onSuccess()
        } catch (error: any) {
            const message = error.response?.data || 'Ошибка при создании сотрудника'
            toast.error(message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Добавление сотрудника в {company.name}</h3>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Фамилия *</label>
                            <input name="surname" value={formData.surname} onChange={handleChange} placeholder="Иванов" required />
                        </div>
                        <div className="form-group">
                            <label>Имя *</label>
                            <input name="name" value={formData.name} onChange={handleChange} placeholder="Иван" required />
                        </div>
                        <div className="form-group">
                            <label>Отчество</label>
                            <input name="patronymic" value={formData.patronymic} onChange={handleChange} placeholder="Иванович" />
                        </div>
                        <div className="form-group">
                            <label>Email *</label>
                            <input name="email" value={formData.email} onChange={handleChange} placeholder="employee@company.com" type="email" required />
                        </div>
                        <div className="form-group">
                            <label>Пароль *</label>
                            <input name="password" value={formData.password} onChange={handleChange} placeholder="Минимум 6 символов" type="password" required minLength={6} />
                        </div>
                        <div className="form-group">
                            <label>Повторите пароль *</label>
                            <input name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} placeholder="Минимум 6 символов" type="password" required minLength={6} />
                        </div>
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
                            <small style={{ color: 'var(--text-placeholder-color)', marginTop: '4px', display: 'block' }}>
                                * Выбранная роль будет определять доступ сотрудника
                            </small>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={onClose} disabled={isSubmitting}>Отмена</button>
                        <button type="submit" className="btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Создание...' : 'Добавить сотрудника'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}