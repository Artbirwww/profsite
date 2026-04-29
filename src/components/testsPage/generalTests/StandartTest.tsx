import { useNavigate } from "react-router-dom"
import { SingleOptionsPicker, Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { useEffect, useState } from "react"
import { useTimer } from "../hooks/useTimer"
import { formatTime } from "../utils/formatTime"
/**
 * 
 * params 
 * fetchData: асинхронная функция для загрузки задач
 * resultPath: путь до результатов теста
 * stateKey: уникальное наименование передаваемого state для результатов (легаси)
 * hasTimer: использует ли тест таймер
 * initialSeconds: начальное значение таймера
 * autoStartTimer: нужно ли начать отчет сразу же
 * autoNavigateOnTimeout: нужно ли закончить тест по истечению времени
 * pickerStyle: ?
 * optionStyle: как отобразить опции столбцом или строкой
 */
interface StandartTestConfig {
    fetchData: () => Promise<Task[]>
    resultPath: string
    stateKey: string
    hasTimer?: boolean
    initialSeconds?: number //Если это значение есть, значит таймер идет назад
    autoStartTimer?: boolean
    autoNavigateOnTimeout?: boolean
    pickerStyle?: 'squeezed' | 'extended'
    optionStyle?: 'column' | 'row'
}

export const createStandartTest = (config: StandartTestConfig) => {
    return () => {
        const navigate = useNavigate()
        const [tasks, setTasks] = useState<Task[]>()
        const timer = useTimer(config.initialSeconds || 0, config.initialSeconds ? true : false)

        useEffect(() => {
            config.fetchData().then(setTasks)
        }, [])

        useEffect(() => {
            if (tasks && config.autoStartTimer !== false)
                timer.start()
        }, [tasks])

        useEffect(() => {
            if (config.autoNavigateOnTimeout && timer.seconds === 0 && tasks) 
                handleComplete()
        }, [timer.seconds])
        const handleComplete = () => {
            const completionTime = config.initialSeconds ?
                                    config.initialSeconds - timer.seconds :
                                    timer.seconds
            navigate(config.resultPath, {
                state: {
                    [config.stateKey]: tasks,
                    completionTimeSeconds: completionTime
                }
            }) 
        }
        if (!tasks) return <p>загрузка ...</p>

        return (<>
        <div className="actual-test-wrapper">
            {config.hasTimer !== false && (
                <div className="float-timer">
                    {formatTime(timer.minutes)}:{formatTime(timer.remaningSeconds)}
                </div>
            )}
            <SingleOptionsPicker 
                tasks={tasks}
                setTasks={setTasks}
                navigateToResults={handleComplete}
                pickerStyleType={config.pickerStyle || 'squeezed'}
                optionStyleType={config.optionStyle || 'column'}
            />
        </div>
        </>)
    }
}