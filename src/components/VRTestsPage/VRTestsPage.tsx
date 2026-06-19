import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { specialistsAPI } from "../../services/api/specialistApi"
import { profession } from "../../types/specialist/specialist"
import "./css/vr-tests-page.css"
import { VRTestCard } from "./VRTestCard"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"

export type Status = "not started" | "first stage" | "second stage"

export const VRTestsPage = () => {
    const [professions, setProfessions] = useState<profession[]>()
    const [professionsOriginal, setProfessionsOriginal] = useState<profession[]>()
    const [search, setSearch] = useState<string>()

    useEffect(() => {
        const loadProfessions = async () => {
            try {
                const professionsTemp = await specialistsAPI.getProfessions()
                setProfessionsOriginal(professionsTemp)
                setProfessions(professionsTemp)
            } catch(err) {
                toast.error("Ошибка при загрузке профессий")
                console.log(err)
            }
        }
        loadProfessions()
    }, [])
    useEffect(() => {
        if (!professionsOriginal) return
        if (!search) {
            setProfessions(professionsOriginal)
            return
        }
        setProfessions(professionsOriginal?.filter(prof => prof.name.toLocaleLowerCase().includes(search?.toLocaleLowerCase())))
    }, [search, professionsOriginal])

    if (!professions) return (<>
        <p>Загрузка тестов</p>
    </>)
    return (
        <div className="vr-page">
            <div className="search-container">
                <Search size={25} />
                <input type="text" onChange={e => setSearch(e.target.value)} value={search} />
            </div>
            <div className="tests-wrapper">
                {professions.map(prof => (
                    <VRTestCard item={prof} status={"not started"}/>
                ))}
            </div>
        </div>)
}