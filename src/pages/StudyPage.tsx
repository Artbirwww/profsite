import { FC, useEffect, useState } from "react"
import { Grade, PupilSubject, Subject } from "../types/pupil/pupilSubject"
import { useAuth } from "../contexts/AuthContext"
import { pupilSubjectsApi } from "../services/api/pupilSubjectsApi"
import { SubjectsPanel } from "../components/studyPageComponents/SubjectsPanel"

export const SUBJECTS: Subject[] = [
    'Математика',
    'Русский язык',
    'Литература',
    'Иностранный язык',
    'Физика',
    'Химия',
    'Биология',
    'История',
    'Обществознание',
    'География',
    'Информатика',
]

export const TEMPLATE_SUBJECTS: PupilSubject[] = SUBJECTS.map(name => ({
    name,
    grades: Array.from({ length: 6 }, (_, i) => ({ grade: '' as Grade, classNumber: i + 5 })),
    pupilSubjectProfileDTO: {
        interestLevel: "-",
        projectParticipationLevel: "-",
        contestParticipationLevel: "-",
        selectionProbabilityLevel: "-",
    },
}))

export const StudyPage: FC = ({ }) => {
    const { getToken } = useAuth()
    const [pupilSubject, setPupilSubject] = useState<PupilSubject[]>(TEMPLATE_SUBJECTS)

    useEffect(() => {
        const loadData = async () => {
            const token = getToken()
            if (!token) return

            try {
                const serverData = await pupilSubjectsApi.getPupilSubjects(token)
                if (serverData?.length) {
                    setPupilSubject(mergeData(serverData, TEMPLATE_SUBJECTS))
                }
            } catch (error) {
                console.error("Error while load grades:", error)
            }
        }
        loadData()
    }, [getToken])

    const mergeData = (serverData: PupilSubject[], template: PupilSubject[]): PupilSubject[] => {
        const serverMap = new Map(serverData.map(s => [s.name, s]))

        return template.map(tItem => {
            const sItem = serverMap.get(tItem.name)
            if (!sItem) return tItem

            return {
                ...tItem,
                grades: tItem.grades.map(tGrade =>
                    sItem.grades?.find(sG => sG.classNumber === tGrade.classNumber) || tGrade),
                pupilSubjectProfileDTO: sItem.pupilSubjectProfileDTO || tItem.pupilSubjectProfileDTO,
            }
        })
    }

    return (
        <div className="study-wrapper">
            <SubjectsPanel pupilSubjects={pupilSubject} setPupilSubjects={setPupilSubject} />
        </div>
    )
}