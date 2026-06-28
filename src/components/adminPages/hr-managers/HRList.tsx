import { useEffect, useState } from "react"
import { companyApi } from "../../../services/api/companyApi"
import { useAuth } from "../../../contexts/AuthContext"
import { HRManager } from "../../../types/company/HRManager"
import { NoResults } from "../../ui/noResultComponent/NoResult"
import { HRCard } from "./HRCard"
import "../css/card.css"
import "../css/modal.css"
import toast, { Toaster } from "react-hot-toast"
import { Plus } from "lucide-react"
import { HRForm } from "./HRForm"
export const HRList = () => {
    const {getToken} = useAuth()
    const [managers, setManagers] = useState<HRManager[]>([])

    const [isLoading, setIsLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)

    const loadHRs = async () => {
        try {
            setIsLoading(true)
            const managersTemp = await companyApi.getHRs(getToken())
            setManagers(managersTemp)
        } catch (error) {
            console.error("Failed to load HRs:", error)
            toast.error("Ошибка при загрузке HR-менеджеров")
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        loadHRs()
    }, [])
    const handleHRCreated = (hr: HRManager) => {
        setManagers(prev => [...prev, hr])
        toast.success(`HR-менеджер ${hr.fullName} успешно создан!`)
    }
    if (!managers || isLoading) return (<>
        <div className="admin-list-wrapper center">
                <NoResults variant="loading"/>
        </div>
    </>)
    return (<>
        <div className="admin-list-wrapper">
            <div className="list-header">
                <h2>HR-менеджеры</h2>
                <button className="add-btn"
                    onClick={() => setShowForm(true)}>
                    <Plus size={20} />
                    Добавить HR
                </button>
            </div>
            <div className="cards-container">
                {managers.map((manager, index) => (
                    <HRCard manager={manager} key={index} />
                ))}
            </div>
            {/*Modal form*/}
            {showForm && (
                <div className="modal-overlay"
                    onClick={() => setShowForm(false)}>
                    <div className="modal-content"
                        onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Создание HR-менеджера</h3>
                                <button className="modal-close"
                                    onClick={() => setShowForm(false)}>
                                        ✕
                                </button>
                            </div>
                            <HRForm 
                                onSuccess = {handleHRCreated}
                                onCancel={() => setShowForm(false)}
                            />
                    </div>
                </div>
            )}
            <Toaster/>
        </div>
    </>)
}