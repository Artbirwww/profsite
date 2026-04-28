import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { tasks as tasksData } from "./tasks.json"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { useTimer } from "../hooks/useTimer"
import { formatTime } from "../utils/formatTime"
import { createStandartTest } from "../generalTests/StandartTest"
export const KlimovTest = createStandartTest({
    fetchData: async () => tasksData as Task[],
    resultPath: "/tests/professional-orientation-klimov-results",
    stateKey: "klimovTasks",
    autoStartTimer: true
})
