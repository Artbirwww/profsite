import { tasks as tasksData } from "./tasks.json"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { UseStandartTest } from "../generalTests/UseStandartTest"

export const EngineeringThinkingTest = UseStandartTest<Task>({
    Component: SingleOptionsPicker,
    fetchData: async () => tasksData as Task[],
    resultPath: "/tests/engineering-thinking-results",
    stateKey: "tasks",
    description: "Представляй механизмы в движении и опирайся на законы физики. Выбери 1 из 3 вариантов который кажется тебе верным.",
    initialSeconds: 1500,
    autoStartTimer: true,
    autoNavigationOnTimeout: true,
    pickerStyle: "extended",
    optionStyle: "column",
})

{/* 
export const EngineeringThinkingTest = createStandartTest({
    fetchData: async () => tasksData as Task[],
    resultPath: "/tests/engineering-thinking-results",
    stateKey: "tasks",
    initialSeconds: 1500,
    autoStartTimer: true,
    autoNavigateOnTimeout: true,
    pickerStyle: "extended",
    optionStyle: "column"
})
*/}