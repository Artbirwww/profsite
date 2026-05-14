import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import axios from "axios"
import { getBaseUrl } from "../../../services/api/api"
import { TestFormConfig } from "../generalTemplates/formSelection/TestFormSelection"
import { UseFormSelectionTest } from "../generalTests/UseFormSelectionTest"

const IQ_FORMS: TestFormConfig<Task>[] = [
    { id: "iqTestFormA", label: "Форма A", data: [] },
    { id: "iqTestFormB", label: "Форма B", data: [] },
]

const generateOptions = (count: number) => Array.from({ length: count }, (_, num) => ({
    id: num + 1,
    text: (num + 1).toString(),
    isPicked: false,
}))

export const IqPotentialTest = UseFormSelectionTest<Task>({
    forms: IQ_FORMS,
    Component: SingleOptionsPicker,
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
    stateKeyForm: "iqTestForm",
    description: "Реешай быстро, пропуская сложные задачи и возвращайся к ним позже. Выбери 1 из 6 фигур которая подходит в свободный квадрат.",
    hasTimer: true,
    initialSeconds: 720,
    autoNavigationOnTimeout: true,
    pickerStyle: "squeezed",
    optionStyle: "row",
})

{/* 
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
    componentProps: { pickerStyleType: "squeezed", optionStyleType: "row" },
    initialSeconds: 720,
    autoNavigateOnTimeout: true
})
*/}