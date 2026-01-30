import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react"
import { Grade, PupilGrade, PupilSubject, Subject } from "../../types/pupil/pupilSubject"
import { PupilSubjects } from "./PupilSubjects"
import style from "./subject-panel.module.css"
import { Button } from "../ui/reusable/button"
import { CheckCheck } from "lucide-react"
import { pupilSubjectsApi } from "../../services/api/pupilSubjectsApi"
import { useAuth } from "../../contexts/AuthContext"
import toast, { Toaster } from "react-hot-toast"
/**
 * TODO если пользователь не заполнил данные аккаунта, попросить его это сделать
 * перед внесеинем оценок, поскольку его профиль еще не создан
 */
interface SubjectProps {
    pupilSubjects: PupilSubject []
    setPupilSubjects: Dispatch<SetStateAction<PupilSubject[]>>
}
const options: Grade[] = ["", "н/а", 3, 4, 5]
export const SubjectsPanel : FC<SubjectProps> = ({pupilSubjects, setPupilSubjects }) => {
    const changedPupilSubjectsRef = useRef<PupilSubject[]>([])
    const {getToken} = useAuth()
    useEffect(() => {
        console.log(pupilSubjects)
    }, [pupilSubjects])
    const updateGradeForSubject = (updatedPupilGrade: PupilGrade, subject: Subject) => {
        const update = (updatedPupilGrade: PupilGrade, subject: Subject, list: PupilSubject[]) => {
            return list.map((pupilSubject: PupilSubject) => {
                if (pupilSubject.name === subject) 
                    return {...pupilSubject, 
                            grades: pupilSubject.grades.map((pupilGrade: PupilGrade) => {
                                if (pupilGrade.classNumber === updatedPupilGrade.classNumber)
                                    return {...pupilGrade, grade: updatedPupilGrade.grade}
                                return pupilGrade
                            })}
                return pupilSubject
            })
        }
        const updatedPupilSubjects = update(updatedPupilGrade, subject, pupilSubjects);
        setPupilSubjects(updatedPupilSubjects)
        /* TODO подумать как можно отслеживать только измененные оценки что бы не отправлять все каждый раз
        //Если добавляется вообще первая оценка для этого предмета (subject) тупо добавляем ее
        if (!changedPupilSubjectsRef.current.some(pS => pS.name === subject)) {
            changedPupilSubjectsRef.current = [... changedPupilSubjectsRef.current, {name: subject, grades: [updatedPupilGrade]}]
            return
        }
        //Если такой предмет уже есть, пытаемся выяснить мы добавляем новую оценку или меняем старую (смотрим по классу)
        //Если добавляем новую то просто берем найденный предмет и в его массив пихаем grade
        const pupilSubjectTemp = changedPupilSubjectsRef.current.find(pS => {pS.name === subject})
        if (!pupilSubjectTemp?.grades.find(g => g.classNumber === updatedPupilGrade.classNumber)){
            pupilSubjectTemp?.grades = [...pupilSubjectTemp?.grades, updatedPupilGrade]
            return
        }
        //Если оказалось так, что мы меняем старую тупо обновляем ее и сохраняем
        changedPupilSubjectsRef.current = update(updatedPupilGrade, subject, changedPupilSubjectsRef.current)
        */
        
    }
    const addGradesToPupil = async () => {
        const data = pupilSubjects
            .map(subject => {
                const filteredGrades = subject.grades.filter(grade => 
                    grade.grade !== '' && grade.grade !== undefined)
                
                return {... subject, 
                    grades: filteredGrades
            }}).filter(subject => subject.grades.length > 0)
        console.log(data)
        try {
            const token = getToken()
            if (!token)
                throw new Error("empty token")
            const response = await pupilSubjectsApi.addGradesToPupil(data, token)
            toast.success("Оценки успешно добавлены")
        } catch(err) {
            console.error(err)
            toast.error("Не удалось сохранить оценки")
        }

    }
    return (
        <div className={style["subject-content"]}>
        <div className={style["subjects-panel"]}>
            <table>
                <thead>
                    <tr>
                        <th>Предмет</th>
                        {Array.from({length: 11}, (_, classNumber) => (
                            <th key={classNumber}>{classNumber + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    
                    {pupilSubjects.map((pupilSubject) => (
                        <tr key={pupilSubject.name}>
                            <td><strong>{pupilSubject.name}</strong></td>
                            {pupilSubject.grades.map((pupilGrade, index) => (
                                <td key={index}>
                                    <select value={pupilGrade.grade} className={style["select-option"]} onChange={e => {updateGradeForSubject({...pupilGrade, grade: e.target.value as Grade}, pupilSubject.name)}}>
                                        {options.map((op, index) => (
                                            <option key={index} value={op}>
                                                {op}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            ))}
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            <Button buttonLabel="Сохранить" buttonIcon = {<CheckCheck size={20} />} 
                    buttonFunction={addGradesToPupil}/>
        </div>
        <Toaster/>
        </div>
    )
}