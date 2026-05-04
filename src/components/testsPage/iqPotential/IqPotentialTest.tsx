import { useEffect, useState } from "react"
import { Option, SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { ArrowRight } from "lucide-react"
import axios from "axios"
import { getBaseUrl } from "../../../services/api/api"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useTimer } from "../hooks/useTimer"
import { formatTime } from "../utils/formatTime"
import { TestFormConfig, TestFormSelection } from "../generalTemplates/formSelection/TestFormSelection"
import { createFormSelectionTest } from "../generalTests/FormSelection"

const IQ_FORMS: TestFormConfig<Task>[] = [
    { id: "iqTestFormA", label: "Форма A", data: [] },
    { id: "iqTestFormB", label: "Форма B", data: [] },
]

const generateOptions = (count: number) => Array.from({ length: count }, (_, num) => ({
    id: num + 1, text: (num + 1).toString(), isPicked: false
}))
export const IqPotentialTest = createFormSelectionTest({
    forms: IQ_FORMS,
    fetchFormData: async (formId) => {
        const response = await axios.get(`${getBaseUrl()}/public/iq_potential/data/${formId}.json`)
        console.log(response.data)
        return response.data[formId].questions.map((task: Task) => ({
            ...task,
            options: generateOptions(6)
        }))
    },
    resultPath: "/tests/iq-potential-results",
    stateKey: "tasks",
    Component: SingleOptionsPicker,
    componentProps: {pickerStyleType: "squeezed", optionStyleType: "row"},
    initialSeconds: 720,
    autoNavigateOnTimeout: true
})
