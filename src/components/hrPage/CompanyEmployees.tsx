import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { companyApi } from "../../services/api/companyApi"
import { useAuth } from "../../contexts/AuthContext"
import { Employee } from "../../types/company/Employees"
import { PaginatedResponse } from "../../types/common"
import { NoResults } from "../ui/noResultComponent/NoResult"
import { EmployeeCard } from "./EmployeeCard"
import { Plus, Filter } from "lucide-react"
import "../adminPages/css/card.css"
import "../adminPages/css/modal.css"
import "../ui/reusable/css/filter.css"
import "./CompanyEmployees.css"
import { CreateEmployeeForm } from "./CreateEmployeeForm"
import { Pagination } from "../ui/reusable/Pagination"

const ROLES = [
    { value: 'ALL', label: 'Все' },
    { value: 'SPECIALIST', label: 'Специалист' },
    { value: 'APPLICANT', label: 'Соискатель' },
    { value: 'HR', label: 'HR-менеджер' },
]

export const CompanyEmployees = () => {
    const { getToken } = useAuth()
    const [employees, setEmployees] = useState<Employee[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [companyName, setCompanyName] = useState<string>("")
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [totalElements, setTotalElements] = useState(0)
    
    // Filter state
    const [selectedRole, setSelectedRole] = useState<string>("ALL")

    const loadEmployees = async () => {
        try {
            setIsLoading(true)
            
            // Load company info and employees with pagination
            const [company, employeesData] = await Promise.all([
                companyApi.getCompanyBySpecialist(getToken()),
                companyApi.getEmployeesByCompany(
                    getToken(),
                    currentPage,
                    pageSize,
                    selectedRole !== 'ALL' ? selectedRole : undefined
                )
            ])
            
            setCompanyName(company.name)
            setEmployees(employeesData.content || [])
            setTotalPages(employeesData.totalPages || 0)
            setTotalElements(employeesData.totalElements || 0)
        } catch (err) {
            console.error(err)
            toast.error("Возникла ошибка при загрузке сотрудников")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadEmployees()
    }, [currentPage, selectedRole])

    const handleEmployeeCreated = (newEmployee: Employee) => {
        // Refetch first page to show new employee
        setCurrentPage(0)
        loadEmployees()
        toast.success(`Сотрудник ${newEmployee.fullName} добавлен!`)
    }

    // Handle role filter change
    const handleRoleFilter = (role: string) => {
        setSelectedRole(role)
        setCurrentPage(0) // Reset to first page
    }

    if (isLoading) {
        return (
            <div className="admin-list-wrapper center">
                <NoResults variant="loading" />
            </div>
        )
    }

    return (
        <>
            {/* Clean, flex-based structural container */}
            <div className="component-layout-wrapper">
                
                {/* Header */}
                <div className="list-header">
                    <div>
                        {companyName && (
                            <p className="company-subtitle" style={{ color: 'var(--text-secondary-color)', marginTop: '4px' }}>
                                {companyName} · {totalElements} сотрудников
                            </p>
                        )}
                    </div>
                    <button 
                        className="add-btn"
                        onClick={() => setShowForm(true)}
                    >
                        <Plus size={20} />
                        Добавить сотрудника
                    </button>
                </div>

                {/* Filter Section */}
                <div className="filter-section">
                    <div className="filter-group">
                        <Filter size={18} />
                        <span>Роль:</span>
                        <select 
                            value={selectedRole} 
                            onChange={(e) => handleRoleFilter(e.target.value)}
                            className="filter-select"
                        >
                            {ROLES.map(role => (
                                <option key={role.value} value={role.value}>
                                    {role.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Main Content Area */}
                {employees.length === 0 ? (
                    <div className="center-empty-state">
                        <NoResults message="Сотрудники не найдены" variant="empty" />
                    </div>
                ) : (
                    <>
                        {/* Dynamic scrolling content area (Cleaned up: NO inline heights) */}
                        <div className="cards-container">
                            {employees.map((employee) => (
                                <EmployeeCard 
                                    key={employee.id} 
                                    employee={employee} 
                                />
                            ))}
                        </div>

                        {/* Pagination area is now safely part of the flex tree */}
                        <div className="pagination-wrapper">
                            <Pagination 
                                total={totalPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </>
                )}
            </div>

            {/* Modal Form */}
            {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Добавление сотрудника</h3>
                            <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
                        </div>
                        <CreateEmployeeForm 
                            onSuccess={handleEmployeeCreated}
                            onCancel={() => setShowForm(false)}
                            defaultCompanyName={companyName}
                        />
                    </div>
                </div>
            )}

            <Toaster />
        </>
    )

}