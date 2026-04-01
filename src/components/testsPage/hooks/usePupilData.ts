import { useCallback, useEffect, useState } from "react"
import { PupilResponse } from "../../../types/pupil/pupil"
import { pupilApi } from "../../../services/api/pupilApi"
import { useAuth } from "../../../contexts/AuthContext"

export const usePupilData = () => {
    const [pupilData, setPupilData] = useState<PupilResponse>()
    const [isLoading, setIsLoading] = useState(false)
    const { getToken } = useAuth()
    useEffect(() => {
        loadPupilData()
    }, [])
    const getBirthdayDate = (pupilData: PupilResponse) => {
        if (!pupilData) return undefined
        return new Date(pupilData.pupilDTO.birthday)
    }
    const loadPupilData = async () => {
        try {
            setIsLoading(true)
            const token = getToken()
            const pupilDataTemp = await pupilApi.getPupilData(token)
            setPupilData(pupilDataTemp)

        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }

    }
    return { pupilData, isLoading, getBirthdayDate }
}