import { useEffect, useState } from "react"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import toast, { Toaster } from "react-hot-toast"
import api, { getBaseUrl } from "../../../services/api/api"
import { useNavigate } from "react-router-dom"
import { useTimer } from "../hooks/useTimer"
import { formatTime } from "../utils/formatTime"
import { HollandProfession } from "./hollandTypes"
import { createStandartTest } from "../generalTests/StandartTest"

export const HollandTest = createStandartTest({
    fetchData: async() => {
        const response = await api.get(`${getBaseUrl()}/public/prof_holland/data/profHollandFormA.json`)
        return response.data.data as Task[]
    },
    resultPath: "/tests/prof-holland-results",
    stateKey: "hollandTasks",
    autoStartTimer: true
})
