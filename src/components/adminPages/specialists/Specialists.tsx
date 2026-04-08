import { useCallback, useEffect, useState } from "react"
import { SpecialistsFilter, SpecialistsPage } from "../../../types/specialist/specialist"
import { specialistsAPI } from "../../../services/api/specialistApi"
import { useAuth } from "../../../contexts/AuthContext"
import toast from "react-hot-toast"

export const Specialists = () => {
    const {getToken} = useAuth()
    const [specialists, setSpecialists] = useState<SpecialistsPage>()
    const [specialistsFilter, setSpecialistFilter] = useState<SpecialistsFilter>({
        page: 0,
        size: 10
    })
    const loadSpecialist = useCallback(async (signal: AbortSignal) => {
            try {
                const specialistsTemp = await specialistsAPI.getSpecialistsPage(specialistsFilter, getToken(), signal)
                console.log(specialists)
                setSpecialists(specialistsTemp)
            } catch(err) {
                console.log(err)
                toast.error("Не удалось загрузить специалистов, проверьте статус F12")
            }
            
            
        }, [specialistsFilter])
    useEffect(() => {
        if (!specialistsFilter) return
        const controller = new AbortController()
        loadSpecialist(controller.signal)
        return () => {
            controller.abort()
        }
    }, [specialistsFilter])
    return (<>
        <p>Специсты</p>
    </>)
}