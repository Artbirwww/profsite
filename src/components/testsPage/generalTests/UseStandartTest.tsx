import { useNavigate } from "react-router-dom"
import { BaseTestComponentProps } from "./BaseTest"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTimer } from "../hooks/useTimer"
import { formatTime } from "../utils/formatTime"

interface StandartTestConfig<T> {
    fetchData: () => Promise<T[]>
    resultPath: string
    stateKey: string
    Component: React.ComponentType<BaseTestComponentProps<T>>
    description?: string
    hasTimer?: boolean
    initialSeconds?: number
    autoStartTimer?: boolean
    autoNavigationOnTimeout?: boolean
    pickerStyle?: "squeezed" | "extended"
    optionStyle?: "column" | "row"
}

export const UseStandartTest = <T,>(config: StandartTestConfig<T>) => {
    return () => {
        const navigate = useNavigate()
        const [tasks, setTasks] = useState<T[]>()
        const isCountdown = Boolean(config.initialSeconds)
        const timer = useTimer(config.initialSeconds || 0, isCountdown)
        const isTimerStarted = useRef(false)

        const handleComplete = useCallback(() => {
            const complitionTime = config.initialSeconds
                ? config.initialSeconds - timer.seconds
                : timer.seconds

            navigate(config.resultPath, {
                state: {
                    [config.stateKey]: tasks,
                    complitionTimeSeconds: complitionTime,
                }
            })
        }, [navigate, tasks, timer.seconds, config.initialSeconds, config.stateKey, config.resultPath])

        useEffect(() => {
            let isMounted = true
            config.fetchData().then((data) => {
                if (isMounted) setTasks(data)
            })

            return () => { isMounted = false }
        }, [])

        useEffect(() => {
            if (tasks && config.autoStartTimer !== false && !isTimerStarted.current) {
                timer.start()
                isTimerStarted.current = true
            }
        }, [tasks])

        useEffect(() => {
            if (config.autoNavigationOnTimeout && timer.seconds === 0 && tasks && isTimerStarted && isCountdown)
                handleComplete()
        }, [timer.seconds, tasks, handleComplete, config.autoNavigationOnTimeout, isCountdown])

        if (!tasks) return <p>Загрузка...</p>

        return (
            <div className="actual-test-wrapper">
                {config.hasTimer !== false && (
                    <div className="float-timer">
                        {formatTime(timer.minutes)} : {formatTime(timer.remaningSeconds)}
                    </div>
                )}

                <config.Component
                    tasks={tasks}
                    setTasks={setTasks}
                    navigateToResults={handleComplete}
                    description={config.description}
                    pickerStyleType={config.pickerStyle}
                    optionStyleType={config.optionStyle} />
            </div>
        )
    }
}