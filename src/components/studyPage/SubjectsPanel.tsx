import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react"
import { Grade, PupilGrade, PupilSubject, Subject } from "../../types/pupil/pupilSubject"
import "./css/subjectsPanelStyle.css"
import { Button } from "../ui/reusable/button"
import { CheckCheck } from "lucide-react"
import { pupilSubjectsApi } from "../../services/api/pupilSubjectsApi"
import { useAuth } from "../../contexts/AuthContext"
import toast, { Toaster } from "react-hot-toast"
import { InterestLevelType, ParticipationLevelType, ProbabilityLevelType, PupilSubjectProfile } from "../../types/pupil/pupilSubjectProfile"
import { pupilApi } from "../../services/api/pupilApi"
/**
 * TODO если пользователь не заполнил данные аккаунта, попросить его это сделать
 * перед внесеинем оценок, поскольку его профиль еще не создан
 */
const ALL_INTEREST_LEVELS: InterestLevelType[] = [
    "Не занимаюсь дополнительно",
    "Занимаюсь редко",
    "Занимаюсь регулярно, но немного",
    "Занимаюсь регулярно",
    "Занимаюсь очень активно",
    "-"
];

const ALL_PARTICIPATION_LEVELS: ParticipationLevelType[] = [
    "Не участвовал",
    "Школьный",
    "Муниципальный",
    "Региональный",
    "Федеральный",
    "-"
];

const ALL_PROBABILITY_LEVELS: ProbabilityLevelType[] = [
    "Точно нет",
    "Мало вероятно",
    "Возможно",
    "Скорее да",
    "Однозначно да",
    "-"
];
const PUPIL_SUBJECT_PROFILE_TOPICS: string[] = [
    "Вероятность выбора экзамена по предмету",
    "Опыт участия в олимпиадах по предмету",
    "Участие в проектах/конкурсах/конференциях по предмету",
    "Интенсивность доп. занятий по предмету"
]
interface SubjectProps {
    pupilSubjects: PupilSubject[]
    setPupilSubjects: Dispatch<SetStateAction<PupilSubject[]>>
}
const options: Grade[] = ["", "н/а", 3, 4, 5]
export const SubjectsPanel: FC<SubjectProps> = ({ pupilSubjects, setPupilSubjects }) => {
    const changedPupilSubjectsRef = useRef<PupilSubject[]>([])
    const { getToken } = useAuth()
    useEffect(() => {
        console.log(pupilSubjects)
    }, [pupilSubjects])
    const updateGradeForSubject = (updatedPupilGrade: PupilGrade, subject: Subject) => {
        const update = (updatedPupilGrade: PupilGrade, subject: Subject, list: PupilSubject[]) => {
            return list.map((pupilSubject: PupilSubject) => {
                if (pupilSubject.name === subject)
                    return {
                        ...pupilSubject,
                        grades: pupilSubject.grades.map((pupilGrade: PupilGrade) => {
                            if (pupilGrade.classNumber === updatedPupilGrade.classNumber)
                                return { ...pupilGrade, grade: updatedPupilGrade.grade }
                            return pupilGrade
                        })
                    }
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
    const updateProfileForSubject = (subjectIndex: number, field: keyof PupilSubjectProfile, value: InterestLevelType | ParticipationLevelType | ProbabilityLevelType) => {
        setPupilSubjects(prev => {
            const updated = [...prev]
            updated[subjectIndex] = {
                ...updated[subjectIndex],
                pupilSubjectProfileDTO: {
                    ...updated[subjectIndex].pupilSubjectProfileDTO,
                    [field]: value
                }
            }
            return updated
        })
    }
    const addGradesToPupil = async () => {
        const data = pupilSubjects
            .map(subject => {
                const filteredGrades = subject.grades.filter(grade =>
                    grade.grade !== '' && grade.grade !== undefined)

                return {
                    ...subject,
                    grades: filteredGrades
                }
            })//.filter(subject => subject.grades.length > 0)
        console.log(data)
        try {
            const token = getToken()
            if (!token)
                throw new Error("empty token")
            if (!await isProfileDataValid()) {
                toast.error("Перед выставлением оценок заполните профиль")
                return
            }
            const response = await pupilSubjectsApi.addGradesToPupil(data, token)
            toast.success("Оценки успешно добавлены")
        } catch (err) {
            console.error(err)
            toast.error("Не удалось сохранить оценки")
        }

    }
    const isProfileDataValid = async () => {
        const token = getToken()
        if (!token) return false
        const pupilData = await pupilApi.getPupilData(token)
        return pupilData.pupilDTO.id !== null
    }
    return (
        <div className="subject-content">
            <div className="subjects-panel">
                <table>
                    <thead>
                        <tr>
                            <th>Предмет</th>
                            {Array.from({ length: 6 }, (_, classNumber) => (
                                <th key={classNumber}>{classNumber + 5}</th>
                            ))}
                            {PUPIL_SUBJECT_PROFILE_TOPICS.map(topic => (
                                <th>{topic}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>

                        {pupilSubjects.map((pupilSubject, subjectIndex) => (
                            <tr key={pupilSubject.name}>
                                <td><strong>{pupilSubject.name}</strong></td>
                                {pupilSubject.grades.map((pupilGrade, index) => (
                                    <td key={index}>
                                        <select value={pupilGrade.grade} className="select-option" onChange={e => { updateGradeForSubject({ ...pupilGrade, grade: e.target.value as Grade }, pupilSubject.name) }}>
                                            {options.map((op, index) => (
                                                <option key={index} value={op}>
                                                    {op}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                ))}
                                <td>
                                    <select value={pupilSubject.pupilSubjectProfileDTO.selectionProbabilityLevel} className="select-option" onChange={e => updateProfileForSubject(subjectIndex, "selectionProbabilityLevel", e.target.value as ProbabilityLevelType)}>
                                        {ALL_PROBABILITY_LEVELS.map((level, index) => (
                                            <option key={index} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select value={pupilSubject.pupilSubjectProfileDTO.contestParticipationLevel} className="select-option" onChange={e => updateProfileForSubject(subjectIndex, "contestParticipationLevel", e.target.value as ParticipationLevelType)}>
                                        {ALL_PARTICIPATION_LEVELS.map((level, index) => (
                                            <option key={index} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select value={pupilSubject.pupilSubjectProfileDTO.projectParticipationLevel} className="select-option" onChange={e => updateProfileForSubject(subjectIndex, "projectParticipationLevel", e.target.value as ParticipationLevelType)}>
                                        {ALL_PARTICIPATION_LEVELS.map((level, index) => (
                                            <option key={index} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select value={pupilSubject.pupilSubjectProfileDTO.interestLevel} className="select-option" onChange={e => updateProfileForSubject(subjectIndex, "interestLevel", e.target.value as InterestLevelType)}>
                                        {ALL_INTEREST_LEVELS.map((level, index) => (
                                            <option key={index} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <Button buttonLabel="Сохранить" buttonIcon={<CheckCheck size={20} />}
                    buttonFunction={addGradesToPupil} />
            </div>
            <Toaster />
        </div>
    )
}