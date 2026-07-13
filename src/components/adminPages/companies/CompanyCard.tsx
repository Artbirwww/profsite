import { UserPlus, Users } from "lucide-react"
import { CompanyWithEmployees } from "../../../types/company/Company"

export const CompanyCard = ({ 
    company, 
    onAddEmployee 
}: { 
    company: CompanyWithEmployees, 
    onAddEmployee: (company: CompanyWithEmployees) => void 
}) => {
    return (
        <div className="base-card" style={{ marginBottom: '16px' }}>
            <div className="flex justify-between items-start flex-wrap gap-2" style={{ marginBottom: '16px' }}>
                <div>
                    <div className="card-title" style={{ margin: 0, borderBottom: 'none', paddingBottom: 0 }}>
                        {company.name}
                    </div>
                    <div className="flex gap-4 text-sm" style={{ color: 'var(--text-secondary-color)', marginTop: '4px' }}>
                        <span>ИНН: {company.inn || '—'}</span>
                        <span>ОГРН: {company.ogrn || '—'}</span>
                        <span style={{ color: 'var(--accent-color-600)', fontWeight: 500 }}>
                            {company.employeesCount || 0} сотрудников
                        </span>
                    </div>
                </div>
                <button 
                    className="add-btn" 
                    style={{ padding: '6px 16px', fontSize: '0.8rem' }}
                    onClick={() => onAddEmployee(company)}
                >
                    <UserPlus size={16} />
                    Добавить
                </button>
            </div>

            <div style={{ marginTop: '12px' }}>
                {company.employees && company.employees.length > 0 ? (
                    <div className="flex flex-col gap-1">
                        {company.employees.map((employee) => (
                            <div 
                                key={employee.id} 
                                className="flex justify-between items-center"
                                style={{
                                    padding: '10px 14px',
                                    background: 'white',
                                    borderRadius: '10px',
                                    border: '1px solid var(--grey-color-200)'
                                }}
                            >
                                <div className="flex flex-col">
                                    <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>
                                        {employee.fullName}
                                    </span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-placeholder-color)' }}>
                                        {employee.email}
                                    </span>
                                </div>
                                <span 
                                    className={`text-xs font-medium`}
                                    style={{
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        background: employee.role === 'HR' 
                                            ? 'var(--accent-color-100)' 
                                            : 'var(--grey-color-200)',
                                        color: employee.role === 'HR' 
                                            ? 'var(--accent-color-700)' 
                                            : 'var(--text-secondary-color)'
                                    }}
                                >
                                    {employee.role === 'HR' ? 'HR' : 'Специалист'}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center gap-2" style={{ color: 'var(--text-placeholder-color)', padding: '16px 0' }}>
                        <Users size={18} />
                        <span>Нет сотрудников</span>
                    </div>
                )}
            </div>
        </div>
    )
}