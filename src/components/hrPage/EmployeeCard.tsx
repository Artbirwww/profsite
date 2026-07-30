import { getPrimaryRole, getRoleDisplayName } from "../../types/account/role";
import { Employee } from "../../types/company/Employees";

interface EmployeeCardProps {
    employee: Employee
}

export const EmployeeCard = ({employee}: EmployeeCardProps) => {
    const roles = employee.roles
    const primaryRole = getPrimaryRole(roles)
    const roleDisplay = getRoleDisplayName(primaryRole)

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
        <div className="base-card">
            <div className="card-title">
                {employee.fullName}
            </div>

            <div className="info-row">
                <span className="info-label">Email:</span>
                <span>{employee.email}</span>
            </div>

            <div className="info-row">
                <span className="info-label">Роль:</span>
                <span 
                    style={{
                        padding: '2px 12px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        ...getRoleBadgeStyle(primaryRole)
                    }}
                >
                    {roleDisplay}
                </span>
            </div>

            {employee.profession && (
                <div className="info-row">
                    <span className="info-label">Профессия:</span>
                    <span>{employee.profession}</span>
                </div>
            )}

            {employee.experience && (
                <div className="info-row">
                    <span className="info-label">Опыт:</span>
                    <span>{employee.experience}</span>
                </div>
            )}

            {employee.contactPhone && (
                <div className="info-row">
                    <span className="info-label">Телефон:</span>
                    <span>{employee.contactPhone}</span>
                </div>
            )}

            {employee.contactEmail && (
                <div className="info-row">
                    <span className="info-label">Конт. email:</span>
                    <span>{employee.contactEmail}</span>
                </div>
            )}
        </div>
    )

}