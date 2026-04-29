import { useEffect, useState } from "react"
import { tasks as tasksData } from "./tasks.json"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { useNavigate } from "react-router-dom"
import { useTimer } from "../hooks/useTimer"
import { formatTime } from "../utils/formatTime"
import { createStandartTest } from "../generalTests/StandartTest"
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
