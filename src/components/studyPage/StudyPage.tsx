import { FC, useEffect, useState } from "react"
import { Grade, PupilSubject, Subject } from "../../types/pupil/pupilSubject"
import { useAuth } from "../../contexts/AuthContext"
import { pupilSubjectsApi } from "../../services/api/pupilSubjectsApi"
import { SubjectsPanel } from "./SubjectsPanel"

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
                    setPupilSubject(transformServerData(serverData))
                }
            } catch (error) {
                console.error("Error while load grades:", error)
            }
        }
        loadData()
    }, [getToken])

    // Helper function to transform server data into consistent format
    const transformServerData = (serverData: any[]): PupilSubject[] => {
        return serverData.map(subject => ({
            name: subject.name,
            // Create empty grades for classes 5-10 if missing, then merge with server grades
            grades: createCompleteGrades(subject.grades || []),
            pupilSubjectProfileDTO: subject.pupilSubjectProfileDTO || {
                interestLevel: "-",
                projectParticipationLevel: "-",
                contestParticipationLevel: "-",
                selectionProbabilityLevel: "-",
            }
        }))
    }

    // Creates grades array for classes 5-10, filling missing ones with empty strings
    const createCompleteGrades = (serverGrades: any[]): any[] => {
        const requiredClasses = [5, 6, 7, 8, 9, 10]
        
        // Create a map of existing grades from server
        const gradesMap = new Map(
            serverGrades.map(grade => [grade.classNumber, grade.grade])
        )
        
        // Generate complete array with all required classes
        return requiredClasses.map(classNumber => ({
            classNumber,
            grade: gradesMap.get(classNumber) || '' // Empty string for missing grades
        }))
    }

    return (
        <div className="study-wrapper">
            <SubjectsPanel pupilSubjects={pupilSubject} setPupilSubjects={setPupilSubject} />
        </div>
    )
}