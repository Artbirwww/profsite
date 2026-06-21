import { VRTest } from "../../types/vrTests/VRTest"
import api from "./api"

export const vrTestApi = {
    createTest: async (token: string, testData: VRTest) => {
        const response = await api.post(`api/vr-tests`, testData,  {
            headers: {
                Authorization: token
            }
        })
        return response.data
    }, 
    getMyTests: async (token: string) => {
        const response = await api.get(`api/vr-tests/my-tests`, {
            headers: {Authorization: token}
        })
        return response.data
    },
    getMyTestsByProfessionId: async (token: string, professionId: string) => {
        const response = await api.get(`api/vr-tests/my-tests/profession/${professionId}`, {
            headers: {Authorization: token}
        })
        return response.data
    },
    resetTests: async (token: string, professionId: string) => {
        const response = await api.delete(`api/vr-tests/my-tests/profession/${professionId}`, {
            headers: {Authorization: token}
        })
    }
}