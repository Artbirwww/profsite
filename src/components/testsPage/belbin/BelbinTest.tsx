import { Dispatch, SetStateAction, useEffect, useReducer, useRef, useState } from "react"
import { BelbinQuestion, groupQuestions } from "./belbinData"
import { ConstantSumSlider, SliderData } from "../generalTemplates/constantSumSlider/ConstantSumSlider"
import { useNavigate } from "react-router-dom"

export const BelbinTest = () => {
    const [currentGroupNumber, setCurrentGroupNumber] = useState<number>(0)
    const groupQuestionsResult = useRef<BelbinQuestion[][]>([...groupQuestions])
    const [currentQuestions, setCurrentQuestions] = useState<BelbinQuestion[]>(groupQuestionsResult.current[currentGroupNumber])
    const maxValue: number = 10

    const navigate = useNavigate()
    //waterfall changes, next page -> save array of cerrent qs -> next group of qs
    //При изменении номера вопроса ставим соответствующую группу 
    useEffect(()=> {
        console.log(groupQuestionsResult.current)
        if (groupQuestionsResult.current && groupQuestionsResult.current[currentGroupNumber])
            setCurrentQuestions(groupQuestionsResult.current[currentGroupNumber])
    }, [currentGroupNumber])
    
    const nextQuestionsGroup = (step: number) => {
        if (currentGroupNumber === 0 && step < 0) return //Ниже нуля не даем опуститься 
        groupQuestionsResult.current[currentGroupNumber] = [...currentQuestions]
        // (Позволяет не закончить тест если юзер нажал кнопку назад на последнем вопросе)
        if (currentGroupNumber === groupQuestionsResult.current.length-1 && step < 0) {
            setCurrentGroupNumber(prev => prev + step)
            return
        }
        if (currentGroupNumber === groupQuestionsResult.current.length-1) {
            navigate("/tests/group-roles-results", {
                state: {
                    groupQuestionsResult: groupQuestionsResult.current
                }
            })
            return
        }
        setCurrentGroupNumber(prev => prev + step)
    }
    if (!currentQuestions) return <>
        <p>Загрузка теста...</p>
    </>
    return (<>
        <h4>Вопрос номер {currentGroupNumber + 1}</h4>
        <ConstantSumSlider sliders={currentQuestions} setSliders={setCurrentQuestions as Dispatch<SetStateAction<SliderData[]>>} nextPage={nextQuestionsGroup} maxValue={maxValue} />
    </>)
}