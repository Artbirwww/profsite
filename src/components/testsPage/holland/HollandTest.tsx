import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import api, { getBaseUrl } from "../../../services/api/api"
import { StandartTest } from "../generalTests/StandartTest"

export const HollandTest = StandartTest<Task>({
    Component: SingleOptionsPicker,
    fetchData: async () => {
        const response = await api.get(`${getBaseUrl()}/public/prof_holland/data/profHollandFormA.json`)
        return response.data.data as Task[]
    },
    resultPath: "/tests/prof-holland-results",
    stateKey: "hollandTasks",
    description: "Выбирай занятия, которые приносят тебе удовольствие, и будь предельно искренним.",
    autoStartTimer: true,
    pickerStyle: "squeezed",
    optionStyle: "column",
})

{/* 
export const HollandTest = createStandartTest({
    fetchData: async () => {
        const response = await api.get(`${getBaseUrl()}/public/prof_holland/data/profHollandFormA.json`)
        return response.data.data as Task[]
    },
    resultPath: "/tests/prof-holland-results",
    stateKey: "hollandTasks",
    autoStartTimer: true
})
*/}
