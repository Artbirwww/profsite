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
import classNames from "classnames"
/**
 * TODO если пользователь не заполнил данные аккаунта, попросить его это сделать
 * перед внесеинем оценок, поскольку его профиль еще не создан
 */
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

// Profile config to map fields to their data
const PROFILE_FIELDS = [
    { key: "selectionProbabilityLevel", label: "Вероятность выбора экзамена по предмету", options: ALL_PROBABILITY_LEVELS },
    { key: "contestParticipationLevel", label: "Опыт участия в олимпиадах по предмету", options: ALL_PARTICIPATION_LEVELS },
    { key: "projectParticipationLevel", label: "Участие в проектах/конкурсах/конференциях по предмету", options: ALL_PARTICIPATION_LEVELS },
    { key: "interestLevel", label: "Интенсивность доп. занятий по предмету", options: ALL_INTEREST_LEVELS }
] as const;

interface SubjectProps {
    pupilSubjects: PupilSubject[]
    setPupilSubjects: Dispatch<SetStateAction<PupilSubject[]>>
}

const options: Grade[] = ["", "н/а", 3, 4, 5]

export const SubjectsPanel: FC<SubjectProps> = ({ pupilSubjects, setPupilSubjects }) => {
    const { getToken } = useAuth()

    // Simplified grade update
    const updateGrade = (subjectName: string, classNumber: number, grade: Grade) => {
        setPupilSubjects(prev => prev.map(subject => 
            subject.name === subjectName ? {
                ...subject,
                grades: subject.grades.map(g => 
                    g.classNumber === classNumber ? { ...g, grade } : g
                )
            } : subject
        ))
    }

    // Simplified profile update
    const updateProfile = (subjectName: string, field: string, value: string) => {
        setPupilSubjects(prev => prev.map(subject =>
            subject.name === subjectName ? {
                ...subject,
                pupilSubjectProfileDTO: {
                    ...subject.pupilSubjectProfileDTO,
                    [field]: value
                }
            } : subject
        ))
    }

    // Save data
    const saveData = async () => {
        const data = pupilSubjects.map(subject => ({
            ...subject,
            grades: subject.grades.filter(g => g.grade !== '' && g.grade !== undefined)
        }))

        try {
            const token = getToken()
            if (!token) throw new Error("empty token")
            
            const pupilData = await pupilApi.getPupilData(token)
            if (!pupilData.pupilDTO.id) {
                toast.error("Перед выставлением оценок заполните профиль")
                return
            }
            
            await pupilSubjectsApi.addGradesToPupil(data, token)
            toast.success("Оценки успешно добавлены")
        } catch (err) {
            console.error(err)
            toast.error("Не удалось сохранить оценки")
        }
    }
     return (
        <div className="subjects-panel">

            <div className="subjects-table-container">
                <div className="subjects-table">
                    <thead>
                        <tr>
                            <th>Предмет</th>
                            <th colSpan={6}>Оценки по классам</th>
                            {PROFILE_FIELDS.map(field => (
                                <th key={field.key}>{field.label}</th>
                            ))}
                        </tr>
                        <tr>
                            <th></th>
                            {[5,6,7,8,9,10].map(classNum => (
                                <th key={classNum}>{classNum} кл</th>
                            ))}
                            {PROFILE_FIELDS.map(field => (
                                <th key={field.key}>

                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {pupilSubjects.map(subject => (
                            <tr key={subject.name}>
                                <td className="subject-cell">{subject.name}</td>
                                {subject.grades.map(grade => (
                                    <td key={grade.classNumber}>
                                        <select 
                                            value={grade.grade}
                                            className="select-option"
                                            onChange={e => updateGrade(
                                                subject.name,
                                                grade.classNumber,
                                                e.target.value as Grade
                                            )}>
                                                {options.map((opt, idx) => (
                                                    <option
                                                        key={idx} 
                                                        value={opt}>{opt === "" ? "-" : opt}
                                                    </option>
                                                ))}
                                            </select>
                                    </td>
                                ))}
                                {PROFILE_FIELDS.map(field => (
                                    <td key={field.key}>
                                        <select
                                            value={subject.pupilSubjectProfileDTO[field.key]}
                                            className="select-option"
                                            onChange={(e) => updateProfile(subject.name, field.key, e.target.value)}>
                                                {field.options.map((opt, idx) => (
                                                    <option key={idx} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </div>
            </div>

            <div className="subjects-cards">
                {pupilSubjects.map(subject => (
                    <div key={subject.name} className="subject-card">
                        <div className="card-header">
                            <h3>{subject.name}</h3>
                        </div>

                        {/* Grades Section */}
                        <div className="card-section">
                            <div className="card-section-title">Оценки по классам</div>
                            <div className="grades-grid">
                                {subject.grades.map((grade) => (
                                    <div key={grade.classNumber} className="grade-item">
                                        <span className="grade-label">{grade.classNumber} класс</span>
                                        <select
                                            value={grade.grade}
                                            className="select-option"
                                            onChange={(e) => updateGrade(
                                                subject.name,
                                                grade.classNumber,
                                                e.target.value as Grade
                                            )}
                                        >
                                            {options.map((opt, idx) => (
                                                <option key={idx} value={opt}>
                                                    {opt === "" ? "—" : opt}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Profile Section - Mapped */}
                        <div className="card-section">
                            <div className="card-section-title">Профиль предмета</div>
                            <div className="profile-grid">
                                {PROFILE_FIELDS.map((field) => (
                                    <div key={field.key} className="profile-item">
                                        <span className="profile-label">{field.label}</span>
                                        <select
                                            value={subject.pupilSubjectProfileDTO[field.key] as string}
                                            className="select-option"
                                            onChange={(e) => updateProfile(subject.name, field.key, e.target.value)}
                                        >
                                            {field.options.map((opt, idx) => (
                                                <option key={idx} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="study-options">
                <button className="save-button" onClick={saveData}>
                    Сохранить оценки
                </button>
            </div>
            <Toaster />
        </div>
    )
}