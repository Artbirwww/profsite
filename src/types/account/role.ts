export interface Role {
    name: string
}
export const ROLES = {
    PUPIL: "PUPIL",
    DIRECTOR: "DIRECTOR",
    TEACHER: "TEACHER",
    ADMIN: "ADMIN",
    SPECIALIST: "SPECIALIST",
    HR: "HR",
    APPLICANT: "APPLICANT"
}
export const getRoleDisplayName = (role: string): string => {
    const map: Record<string, string> = {
        'HR': 'HR-менеджер',
        'SPECIALIST': 'Специалист',
        'APPLICANT': 'Соискатель'
    }
    return map[role] || role
}
export const getPrimaryRole = (roles: string[]): string => {
    if (!roles || roles.length === 0) return 'SPECIALIST'
    if (roles.includes('HR')) return 'HR'
    if (roles.includes('APPLICANT')) return 'APPLICANT'
    return 'SPECIALIST'
}