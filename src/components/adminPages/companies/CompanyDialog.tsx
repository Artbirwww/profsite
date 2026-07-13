import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import toast from "react-hot-toast";
import { companyApi } from "../../../services/api/companyApi";
import { Company } from "../../../types/company/Company";

export const CompanyDialog = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
    const { getToken } = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<Company>({
        name: '',
        inn: '',
        ogrn: '',
        address: '',
        phone: '',
        email: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const validateForm = (): boolean => {
        if (!formData.name.trim()) {
            toast.error('Название компании обязательно')
            return false
        }
        if (!formData.inn.trim()) {
            toast.error('ИНН обязателен')
            return false
        }
        if (!formData.ogrn.trim()) {
            toast.error('ОГРН обязателен')
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        try {
            setIsSubmitting(true)
            await companyApi.createCompany(getToken(), formData)
            onSuccess()
        } catch (error: any) {
            const message = error.response?.data || 'Ошибка при создании компании'
            toast.error(message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Создание компании</h3>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Название компании *</label>
                            <input name="name" value={formData.name} onChange={handleChange} placeholder="ООО Горная Компания" required />
                        </div>
                        <div className="form-group">
                            <label>ИНН *</label>
                            <input name="inn" value={formData.inn} onChange={handleChange} placeholder="1234567890" required />
                        </div>
                        <div className="form-group">
                            <label>ОГРН *</label>
                            <input name="ogrn" value={formData.ogrn} onChange={handleChange} placeholder="1123456789012" required />
                        </div>
                        <div className="form-group">
                            <label>Адрес</label>
                            <input name="address" value={formData.address} onChange={handleChange} placeholder="г. Москва, ул. Горная, д. 1" />
                        </div>
                        <div className="form-group">
                            <label>Телефон</label>
                            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+74991234567" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" value={formData.email} onChange={handleChange} placeholder="info@company.com" type="email" />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={onClose} disabled={isSubmitting}>Отмена</button>
                        <button type="submit" className="btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Создание...' : 'Создать компанию'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}