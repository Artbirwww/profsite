import { tasks as tasksData } from "./tasks.json"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { UseStandartTest } from "../generalTests/UseStandartTest"

export const KlimovTest = UseStandartTest<Task>({
    Component: SingleOptionsPicker,
    fetchData: async () => tasksData as Task[],
    resultPath: "/tests/professional-orientation-klimov-results",
    stateKey: "klimovTasks",
    description: "Выбери то, что нравится или ближе именно тебе.",
    autoStartTimer: true,
    pickerStyle: "squeezed",
    optionStyle: "column",
})

{/*
export const KlimovTest = createStandartTest({
    fetchData: async () => tasksData as Task[],
    resultPath: "/tests/professional-orientation-klimov-results",
    stateKey: "klimovTasks",
    autoStartTimer: true
})
*/}
