import { useCallback, useEffect, useState } from "react"
import { Specialist, SpecialistsFilter, SpecialistsPage } from "../../../types/specialist/specialist"
import { specialistsAPI } from "../../../services/api/specialistApi"
import { useAuth } from "../../../contexts/AuthContext"
import toast from "react-hot-toast"
import "./css/specialists.css"
import "../css/admin-pages.css"
import "../css/card.css"
import { SpecialistCard } from "./SpecialistCard"
import { Pagination } from "../../ui/reusable/Pagination"
export const Specialists = () => {
    const {getToken} = useAuth()
    const [specialists, setSpecialists] = useState<Specialist[]>()
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [size, setSize] = useState<number>(5)
    const [totalPages, setTotalPages] = useState<number>(0)

    const loadSpecialist = useCallback(async (signal: AbortSignal) => {
            try {
                const specialistsPageTemp = await specialistsAPI.getSpecialistsPage(currentPage, size, getToken(), signal)
                setSpecialists(specialistsPageTemp.content)
                setTotalPages(specialistsPageTemp.totalPages)
                setSize(specialistsPageTemp.size)
            } catch(err) {
                console.log(err)
                toast.error("Не удалось загрузить специалистов, проверьте статус F12")
            }
            
            
        }, [currentPage, size])
    useEffect(() => {
        //if (!currentPage || !totalPages) return
        const controller = new AbortController()
        loadSpecialist(controller.signal)
        return () => {
            controller.abort()
        }
    }, [currentPage, size])
    const changePage = (page: number) => {
        if (page === currentPage) return
        setCurrentPage(page)
        //setSpecialistFilter(prev => ({...prev, page: page}))
    }
    if (!specialists) {
        return <p>Загрузка специалистов...</p>
    }
    return (<>
    <div className="content-wrapper">
        <h3>Специалисты</h3>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total={totalPages} />
        <div className="cards-container">
            {specialists.map(specialist => (
                <SpecialistCard specialist={specialist} />
            ))}
        </div>
    </div>
        
    </>)
}