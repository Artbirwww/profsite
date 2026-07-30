import { ChevronDown, ChevronLeft, UserPlus, Users } from "lucide-react"
import { CompanyWithEmployees } from "../../../types/company/Company"
import { getRoleDisplayName } from "../../../types/account/role"
import { useState } from "react"

export const CompanyCard = ({ 
    company, 
    onAddEmployee 
}: { 
    company: CompanyWithEmployees, 
    onAddEmployee: (company: CompanyWithEmployees) => void 
}) => {
    const [hideList, setHideList] = useState<boolean>(true)
    //  Get primary role from roles array
    const getPrimaryRole = (roles: string[]): string => {
        if (!roles || roles.length === 0) return 'SPECIALIST'
        if (roles.includes('HR')) return 'HR'
        if (roles.includes('APPLICANT')) return 'APPLICANT'
        return 'SPECIALIST'
    }

    //  Get color class for role
    const getRoleColorClass = (role: string): string => {
        const map: Record<string, string> = {
            'HR': 'role-hr',
            'SPECIALIST': 'role-specialist',
            'APPLICANT': 'role-applicant'
        }
        return map[role] || 'role-specialist'
    }

    //  Get background color for role badge
    const getRoleBadgeStyle = (primaryRole: string) => {
        if (primaryRole === 'HR') {
            return {
                background: 'var(--accent-color-100)',
                color: 'var(--accent-color-700)'
            }
        }
        if (primaryRole === 'APPLICANT') {
            return {
                background: 'var(--grey-color-200)',
                color: 'var( --scfly-color-500)'
            }
        }
        return {
            background: 'var(--grey-color-200)',
            color: 'var(--text-secondary-color)'
        }
    }

    return (
        <div className="base-card" style={{ marginBottom: '16px' }}>
            {/* Company Header */}
            <div className="flex justify-between items-start flex-wrap gap-2" style={{ marginBottom: '16px' }}>
                <div>
                    <div className="card-title" style={{ margin: 0, borderBottom: 'none', paddingBottom: 0 }}>
                        {company.name}
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex justify-between">
                            <div className="flex gap-4 text-sm" style={{ color: 'var(--text-secondary-color)', marginTop: '4px' }}>
                                <span>ИНН: {company.inn || '—'}</span>
                                <span>ОГРН: {company.ogrn || '—'}</span>
                                <span style={{ color: 'var(--accent-color-600)', fontWeight: 500 }}>
                                    {company.employeesCount || 0} сотрудников
                                </span>
                            </div>
                            
                        </div>
                        {hideList ? 
                            <ChevronLeft size={20} onClick={() => setHideList(false)} /> : 
                            <ChevronDown size={20} onClick={() => setHideList(true)} />}
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

            {/* Employees List */}
            <div style={{ marginTop: '12px' }}>
                {company.employees && company.employees.length > 0 ? (
                    <div className={'flex flex-col gap-1'} style={{display: `${hideList ? 'none' : 'flex'}`}}>
                        {company.employees.map((employee) => {
                            //  Get primary role from employee.roles
                            const primaryRole = getPrimaryRole(employee.roles)
                            const displayName = getRoleDisplayName(primaryRole)
                            const badgeStyle = getRoleBadgeStyle(primaryRole)

                            return (
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
                                        className="text-xs font-medium"
                                        style={{
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            ...badgeStyle
                                        }}
                                    >
                                        {displayName}
                                    </span>
                                </div>
                            )
                        })}
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