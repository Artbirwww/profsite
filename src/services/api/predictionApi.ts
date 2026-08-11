import axios from "axios"
import api from "./api"

export const predictionAPI = {
    getLatestPrediction: async (token: string) => {
        const response = await api.get("/api/predictions/latest", {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },
    predict: async (token: string) => {
        const response = await api.post("/api/predictions/predict", null, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data
    }

}