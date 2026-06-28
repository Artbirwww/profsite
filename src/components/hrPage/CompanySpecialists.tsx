import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { companyApi } from "../../services/api/companyApi"
import { useAuth } from "../../contexts/AuthContext"
import { Specialist } from "../../types/specialist/specialist"
import { NoResults } from "../ui/noResultComponent/NoResult"
import { SpecialistCard } from "../adminPages/specialists/SpecialistCard"
import { Plus } from "lucide-react"
import "../adminPages/css/card.css"
import "../adminPages/css/modal.css"
import { CreateSpecialistForm } from "./CreateSpecialistForm"

export const CompanySpecialists = () => {
    const { getToken } = useAuth()
    const [specialists, setSpecialists] = useState<Specialist[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [companyName, setCompanyName] = useState<string>("")

    const loadSpecialists = async () => {
        try {
            setIsLoading(true)
            // Load company info and specialists in parallel
            const [company, specialistsData] = await Promise.all([
                companyApi.getCompanyBySpecialist(getToken()),
                companyApi.getSpecialistsByCompany(getToken())
            ])
            setCompanyName(company.name)
            setSpecialists(specialistsData)
        } catch (err) {
            console.error(err)
            toast.error("Возникла ошибка при загрузке работников")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadSpecialists()
    }, [])

    const handleSpecialistCreated = (newSpecialist: Specialist) => {
        setSpecialists(prev => [newSpecialist, ...prev])
        toast.success(`Сотрудник ${newSpecialist.name || newSpecialist.email} добавлен!`)
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
            <div style={{width: "100%", height: "100%"}}>
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

                {specialists.length === 0 ? (
                    <div className="center" style={{ height: '300px' }}>
                        <NoResults message="В вашей компании пока нет сотрудников" variant="empty" />
                    </div>
                ) : (
                    <div className="cards-container">
                        {specialists.map((specialist) => (
                            <SpecialistCard 
                                key={specialist.id} 
                                specialist={specialist} 
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
                        <CreateSpecialistForm 
                            onSuccess={handleSpecialistCreated}
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