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
        <div className="subjects-panel">
            {/* Cards Container */}
            <div className="subjects-cards">
                {pupilSubjects.map((subject, subjectIndex) => (
                    <div key={subject.name} className="subject-card">
                        {/* Card Header */}
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
                                            onChange={(e) => updateGradeForSubject(
                                                { ...grade, grade: e.target.value as Grade },
                                                subject.name
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

                        {/* Profile Section */}
                        <div className="card-section">
                            <div className="card-section-title">Профиль предмета</div>
                            <div className="profile-grid">
                                {/* Probability */}
                                <div className="profile-item">
                                    <span className="profile-label">{PUPIL_SUBJECT_PROFILE_TOPICS[0]}</span>
                                    <select
                                        value={subject.pupilSubjectProfileDTO.selectionProbabilityLevel}
                                        className="select-option"
                                        onChange={(e) => updateProfileForSubject(
                                            subjectIndex,
                                            "selectionProbabilityLevel",
                                            e.target.value as ProbabilityLevelType
                                        )}
                                    >
                                        {ALL_PROBABILITY_LEVELS.map((level, idx) => (
                                            <option key={idx} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Contest Participation */}
                                <div className="profile-item">
                                    <span className="profile-label">{PUPIL_SUBJECT_PROFILE_TOPICS[1]}</span>
                                    <select
                                        value={subject.pupilSubjectProfileDTO.contestParticipationLevel}
                                        className="select-option"
                                        onChange={(e) => updateProfileForSubject(
                                            subjectIndex,
                                            "contestParticipationLevel",
                                            e.target.value as ParticipationLevelType
                                        )}
                                    >
                                        {ALL_PARTICIPATION_LEVELS.map((level, idx) => (
                                            <option key={idx} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Project Participation */}
                                <div className="profile-item">
                                    <span className="profile-label">{PUPIL_SUBJECT_PROFILE_TOPICS[2]}</span>
                                    <select
                                        value={subject.pupilSubjectProfileDTO.projectParticipationLevel}
                                        className="select-option"
                                        onChange={(e) => updateProfileForSubject(
                                            subjectIndex,
                                            "projectParticipationLevel",
                                            e.target.value as ParticipationLevelType
                                        )}
                                    >
                                        {ALL_PARTICIPATION_LEVELS.map((level, idx) => (
                                            <option key={idx} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Interest Level */}
                                <div className="profile-item">
                                    <span className="profile-label">{PUPIL_SUBJECT_PROFILE_TOPICS[3]}</span>
                                    <select
                                        value={subject.pupilSubjectProfileDTO.interestLevel}
                                        className="select-option"
                                        onChange={(e) => updateProfileForSubject(
                                            subjectIndex,
                                            "interestLevel",
                                            e.target.value as InterestLevelType
                                        )}
                                    >
                                        {ALL_INTEREST_LEVELS.map((level, idx) => (
                                            <option key={idx} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Save Button */}
            <div className="study-options">
                <button className="save-button" onClick={addGradesToPupil}>
                    Сохранить оценки
                </button>
            </div>
            <Toaster/>
        </div>
    )
}