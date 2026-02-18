import { useLocation } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { BelbinQuestion } from "./belbinData"

export const BelbinResults = () => {
    const location = useLocation()
    const {getToken} = useAuth()
    const groupQuestionsResult:BelbinQuestion[][] = location.state?.groupQuestionsResult
    const [balbinResults, setBalbinResults] = useState(null)
    useEffect(() => {
        if (groupQuestionsResult.length > 0) {
            console.log(groupQuestionsResult)
            //Calculate results show them and send to the server
        }
    }, [])
    if (!groupQuestionsResult) return <p>Загрузка...</p>
    return(<>
        <p>Belbin Results</p>
    </>)
}