import { PupilSubject } from "../../types/pupil/pupilSubject";
import api from "./api";

export const pupilSubjectsApi = {
    addGradesToPupil: async (data: PupilSubject[], token: string): Promise<any> => {
        try {
            const response = await api.post("/api/pupil-subjects/add-subjects-info", data, {
                headers: {Authorization: token}
            })
            return response.data
        } catch(err) {
            console.error('Error while adding grades to pupil', err)
            throw err
        }
    },
    getPupilSubjects: async (token: string): Promise<PupilSubject[]> => {
        try {
            const response = await api.get("/api/pupil-subjects", {
                headers: {Authorization: token}
            })
            return response.data
        } catch(err) {
            console.error(err)
            throw err
        }
    }
}