import { data, useNavigate } from "react-router-dom";
import { BaseTestComponentProps } from "./BaseTest";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import { TestFormSelection } from "../generalTemplates/formSelection/TestFormSelection";
import { formatTime } from "../utils/formatTime";

interface FormSelectionTestConfig<T> {
    forms: Array<{ id: string; label: string; data: T[] }>
    fetchFormData?: (formId: string) => Promise<T[]>
    resultPath: string
    stateKey: string
    stateKeyForm: string
    Component: React.ComponentType<BaseTestComponentProps<T>>
    description?: string
    hasTimer?: boolean
    initialSeconds?: number
    autoStartTimer?: boolean
    autoNavigationOnTimeout?: boolean
    pickerStyle?: "squeezed" | "extended"
    optionStyle?: "column" | "row"
}

export const UseFormSelectionTest = <T,>(config: FormSelectionTestConfig<T>) => {
    return () => {
        const navigate = useNavigate()
        const [selectedForm, setSelectedForm] = useState<string | null>(null)
        const [tasks, setTasks] = useState<T[]>()
        const isCountdown = Boolean(config.initialSeconds)
        const timer = useTimer(config.initialSeconds || 0, isCountdown)
        const isTimerStarted = useRef(false)

        const handleComplete = useCallback(() => {
            const complitionTime = config.initialSeconds
                ? config.initialSeconds - timer.seconds
                : timer.seconds

            const state: Record<string, any> = {
                [config.stateKey]: tasks,
                complitionTimeSeconds: complitionTime,
            }

            if (config.stateKeyForm && selectedForm)
                state[config.stateKeyForm] = selectedForm

            navigate(config.resultPath, { state })
        }, [navigate, data, selectedForm, timer.seconds, config.initialSeconds, config.stateKey, config.stateKeyForm, config.resultPath])

        const handleSelect = async (formId: string, formData: T[]) => {
            if (config.fetchFormData) {
                const fetchedData = await config.fetchFormData(formId)
                setTasks(fetchedData)
            } else {
                setTasks(formData)
            }
            setSelectedForm(formId)
        }

        useEffect(() => {
            if (tasks && tasks.length > 0 && config.hasTimer !== false && !isTimerStarted.current) {
                timer.start()
                isTimerStarted.current = true
            }

        }, [tasks, config.hasTimer])

        useEffect(() => {
            if (config.autoNavigationOnTimeout && timer.seconds === 0 && tasks && isTimerStarted.current && isCountdown)
                handleComplete()
        }, [timer.seconds, tasks, handleComplete, config.autoNavigationOnTimeout, isCountdown])

        if (!selectedForm) return <TestFormSelection forms={config.forms} onSelect={handleSelect} />

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