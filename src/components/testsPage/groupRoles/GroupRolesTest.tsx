import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { GroupRolesQuestion, groupQuestions } from "./groupRolesData"
import { ConstantSumSlider, SliderData } from "../generalTemplates/constantSumSlider/ConstantSumSlider"
import { useNavigate } from "react-router-dom"
import { useTimer } from "../hooks/useTimer"
import { formatTime } from "../utils/formatTime"

export const GroupRolesTest = () => {
    const navigate = useNavigate()
    const { start, minutes, remaningSeconds, seconds } = useTimer(0, false)

    const [currentGroupNumber, setCurrentGroupNumber] = useState<number>(0)
    const groupQuestionsResult = useRef<GroupRolesQuestion[][]>([...groupQuestions])
    const [currentQuestions, setCurrentQuestions] = useState<GroupRolesQuestion[]>(groupQuestionsResult.current[currentGroupNumber])
    const maxValue: number = 10

    useEffect(() => {
        start()
    }, [])

    //waterfall changes, next page -> save array of cerrent qs -> next group of qs
    //При изменении номера вопроса ставим соответствующую группу 
    useEffect(() => {
        if (groupQuestionsResult.current && groupQuestionsResult.current[currentGroupNumber]) {
            setCurrentQuestions(groupQuestionsResult.current[currentGroupNumber])
        }

    }, [currentGroupNumber])

    const nextQuestionsGroup = (step: number) => {
        if (currentGroupNumber === 0 && step < 0)
            return //Ниже нуля не даем опуститься 

        groupQuestionsResult.current[currentGroupNumber] = [...currentQuestions]

        // (Позволяет не закончить тест если юзер нажал кнопку назад на последнем вопросе)
        if (currentGroupNumber === groupQuestionsResult.current.length - 1 && step < 0) {
            setCurrentGroupNumber(prev => prev + step)
            return
        }

        if (currentGroupNumber === groupQuestionsResult.current.length - 1) {
            navigate("/tests/group-roles-results", {
                state: {
                    groupQuestionsResult: groupQuestionsResult.current,
                    completionTimeSeconds: seconds
                }
            })

            return
        }

        setCurrentGroupNumber(prev => prev + step)
    }

    if (!currentQuestions)
        return (<p>загрузка...</p>)

    return (<>
        <div className="float-timer">
            {formatTime(minutes)} : {formatTime(remaningSeconds)}
        </div>

        <ConstantSumSlider
            sliders={currentQuestions}
            setSliders={setCurrentQuestions as Dispatch<SetStateAction<SliderData[]>>}
            currentGroupNumber={currentGroupNumber}
            nextPage={nextQuestionsGroup}
            maxValue={maxValue} />
    </>)
}