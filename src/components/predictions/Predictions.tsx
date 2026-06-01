import { useEffect, useState } from "react"
import { Prediction } from "../../types/prediction/prediction"
import api from "../../services/api/api"

export const Predictions = () => {
    const [predictions, setPredictions] = useState<Prediction[]>()
    useEffect(() => {
        const getPredictions = async () => {
            try {
                //predictions = api.post
            } catch(err) {

            }
        }
    }, [])
    return (<>
        <p>Мои результаты</p>
    </>)
}