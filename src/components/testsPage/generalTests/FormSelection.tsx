import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTimer } from "../hooks/useTimer";
import { TestFormSelection } from "../generalTemplates/formSelection/TestFormSelection";
import { formatTime } from "../utils/formatTime";

interface FormSelectionTestConfig<T> {
    forms: Array<{id: string; label: string; data: T[]}>
    fetchFormData?: (formId: string) => Promise<T[]>
    resultPath: string
    stateKey: string
    stateKeyForm?: string
    Component: React.ComponentType<any>
    componentProps?:any
    hasTimer?: boolean
    initialSeconds?:number
    autoNavigateOnTimeout?:boolean
}

export const createFormSelectionTest = <T,>(config: FormSelectionTestConfig<T>) => {
    return () => {
        const navigate = useNavigate()
        const [selectedForm, setSelectedForm] = useState<string | null>(null)
        const [data, setData] = useState<T[]>()
        const timer = useTimer(config.initialSeconds || 0, config.initialSeconds ? true : false)

        const handleSelect = async (formId: string, formData: T[]) => {
            if (config.fetchFormData) {
                const fetchedData = await config.fetchFormData(formId)
                setData(fetchedData)
            } else 
                setData(formData)
            setSelectedForm(formId)
        }
        useEffect(() => {
            if (data && data.length > 0 && config.hasTimer !== false) 
                timer.start()
        }, [data])
        useEffect(() => {
            if (data && config.autoNavigateOnTimeout && timer.seconds === 0) 
                navigateToResults()
            
        }, [timer.seconds])
        const navigateToResults = () => {
            const state: any = {
                [config.stateKey]: data,
                completionTimeSeconds: timer.seconds
            }
            if (config.stateKeyForm && selectedForm)
                state[config.stateKeyForm] = selectedForm
            navigate(config.resultPath, {state})
        }
        if (!selectedForm)
            return <TestFormSelection forms={config.forms} onSelect={handleSelect} />
        if (!data) return <p>загрузка...</p>
        return (<>
        <div className="actual-test-wrapper">

        
            {config.hasTimer !== false && (
                <div className="float-timer">
                    {formatTime(timer.minutes)}:{formatTime(timer.remaningSeconds)}
                </div>
            )}
            <config.Component
                {...config.componentProps}
                tasks={data}
                setTasks={setData as any}
                navigateToResults={navigateToResults} />
        </div>
        </>)
    }
}