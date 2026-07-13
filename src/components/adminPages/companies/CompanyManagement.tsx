import { useEffect, useState } from "react"
import { companyApi } from "../../../services/api/companyApi"
import { useAuth } from "../../../contexts/AuthContext"
import { CompanyWithEmployees } from "../../../types/company/Company"
import toast, { Toaster } from "react-hot-toast"
import { NoResults } from "../../ui/noResultComponent/NoResult"
import { Plus } from "lucide-react"
import { CompanyCard } from "./CompanyCard"
import { CompanyDialog } from "./CompanyDialog"
import { EmployeeDialog } from "./EmployeeDialog"

export const CompanyManagement = () => {
    const { getToken } = useAuth()
    const [companies, setCompanies] = useState<CompanyWithEmployees[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showCompanyForm, setShowCompanyForm] = useState(false)
    const [showEmployeeForm, setShowEmployeeForm] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState<CompanyWithEmployees | null>(null)

    const loadCompanies = async () => {
        try {
            setIsLoading(true)
            const data = await companyApi.getCompaniesWithEmployees(getToken())
            setCompanies(data)
        } catch (error) {
            console.error("Failed to load companies:", error)
            toast.error("Ошибка при загрузке компаний")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadCompanies()
    }, [])

    const handleCompanyCreated = () => {
        setShowCompanyForm(false)
        loadCompanies()
        toast.success("Компания успешно создана!")
    }

    const handleEmployeeCreated = () => {
        setShowEmployeeForm(false)
        setSelectedCompany(null)
        loadCompanies()
        toast.success("Сотрудник успешно добавлен!")
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="admin-list-wrapper center">
                <NoResults variant="loading" />
            </div>
        )
    }

    // Empty state
    if (companies.length === 0) {
        return (
            <div className="admin-list-wrapper" style={{ padding: '20px' }}>
                <div className="list-header">
                    <h2>Управление компаниями</h2>
                    <button className="add-btn" onClick={() => setShowCompanyForm(true)}>
                        <Plus size={20} />
                        Добавить компанию
                    </button>
                </div>
                <NoResults 
                    variant="empty"
                    title="Нет компаний"
                    message="Создайте первую компанию, чтобы начать управление сотрудниками."
                    actionText="Создать компанию"
                    onAction={() => setShowCompanyForm(true)}
                />
                {showCompanyForm && (
                    <CompanyDialog
                        onClose={() => setShowCompanyForm(false)}
                        onSuccess={handleCompanyCreated}
                    />
                )}
                <Toaster />
            </div>
        )
    }

    return (
        <div className="admin-list-wrapper scroll-y" style={{ padding: '20px' }}>
            {/* Header */}
            <div className="list-header">
                <h2>Управление компаниями</h2>
                <button className="add-btn" onClick={() => setShowCompanyForm(true)}>
                    <Plus size={20} />
                    Добавить компанию
                </button>
            </div>

            {/* Companies List */}
            <div className="flex flex-col gap-4">
                {companies.map((company) => (
                    <CompanyCard
                        key={company.id}
                        company={company}
                        onAddEmployee={(c) => {
                            setSelectedCompany(c)
                            setShowEmployeeForm(true)
                        }}
                    />
                ))}
            </div>

            {/* Modals */}
            {showCompanyForm && (
                <CompanyDialog
                    onClose={() => setShowCompanyForm(false)}
                    onSuccess={handleCompanyCreated}
                />
            )}

            {showEmployeeForm && selectedCompany && (
                <EmployeeDialog
                    company={selectedCompany}
                    onClose={() => {
                        setShowEmployeeForm(false)
                        setSelectedCompany(null)
                    }}
                    onSuccess={handleEmployeeCreated}
                />
            )}

            <Toaster />
        </div>
    )
}