import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { useEffect } from "react"
import { Task } from "../../testsPage/generalTemplates/singleOptionsPicker/SingleOptionsPicker"

export const VRTestResults = () => {
    const {profession} = useParams<{profession: string}>
    const location = useLocation()
    const navigate = useNavigate()

    const {getToken} = useAuth()

    useEffect(() => {
        if (!location.state)
            return
        const data = location.state
        console.log({...data,
            "results": data.results.map(task => ({"question": task.text, "answer": task.options[task.userAnswer-1].text}))})
        console.log(location.state)
        //TODO send to the server and show it below (only two times available for completion also)
    }, [])

    return (<>
        <p>VR Test Result</p>
    </>)
}