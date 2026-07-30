import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { companyApi } from "../../services/api/companyApi"
import { useAuth } from "../../contexts/AuthContext"
import { Employee } from "../../types/company/Employees"
import { NoResults } from "../ui/noResultComponent/NoResult"
import { EmployeeCard } from "./EmployeeCard"
import { Plus } from "lucide-react"
import "../adminPages/css/card.css"
import "../adminPages/css/modal.css"
import { CreateEmployeeForm } from "./CreateEmployeeForm"

export const CompanyEmployees = () => {
    const { getToken } = useAuth()
    const [employees, setEmployees] = useState<Employee[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [companyName, setCompanyName] = useState<string>("")

    const loadEmployees = async () => {
        try {
            setIsLoading(true)
            const [company, employeesData] = await Promise.all([
                companyApi.getCompanyBySpecialist(getToken()),
                companyApi.getEmployeesByCompany(getToken())
            ])
            setCompanyName(company.name)
            setEmployees(employeesData)
        } catch (err) {
            console.error(err)
            toast.error("Возникла ошибка при загрузке сотрудников")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadEmployees()
    }, [])

    const handleEmployeeCreated = (newEmployee: Employee) => {
        setEmployees(prev => [newEmployee, ...prev])
        toast.success(`Сотрудник ${newEmployee.fullName} добавлен!`)
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
            <div style={{ width: "100%", height: "100%" }}>
                <div className="list-header">
                    <div>
                        <h2>Сотрудники компании</h2>
                        {companyName && (
                            <p className="company-subtitle" style={{ color: 'var(--text-secondary-color)', marginTop: '4px' }}>
                                {companyName}
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

                {employees.length === 0 ? (
                    <div className="center" style={{ height: '300px' }}>
                        <NoResults message="В вашей компании пока нет сотрудников" variant="empty" />
                    </div>
                ) : (
                    <div className="cards-container">
                        {employees.map((employee) => (
                            <EmployeeCard 
                                key={employee.id} 
                                employee={employee} 
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal Form */}
            {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Добавление сотрудника</h3>
                            <button 
                                className="modal-close"
                                onClick={() => setShowForm(false)}
                            >
                                ✕
                            </button>
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