import axios from "axios"
import api from "./api"

export const predictionAPI = {
    getPredictionJson : async (filePath: string) => {
        const response = await api.get(filePath)
        return response.data
    }
}