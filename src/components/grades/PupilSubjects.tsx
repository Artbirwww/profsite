import { useEffect, useState } from "react"
import { Dropdown } from "../ui/reusable/dropdown"
import { SubjectsPanel } from "./SubjectsPanel"
import { Grade, PupilSubject, Subject } from "../../types/pupil/pupilSubject"
import toast, { Toaster } from "react-hot-toast"
import { pupilSubjectsApi } from "../../services/api/pupilSubjectsApi"
import { useAuth } from "../../contexts/AuthContext"
const subjects: Subject[] = [
  'Математика', 'Русский язык', 'Литература', 'Иностранный язык',
  'Физика', 'Химия', 'Биология', 'История', 
  'Обществознание', 'География', 'Информатика'
]
export const PupilSubjects = () => {
    const {getToken} = useAuth()
    //get this data from the server later even empty examples for filling 
    const [pupilSubject, setPupilSubjects] = useState<PupilSubject[]>(
        subjects.map(subject => ({
            name: subject,
            grades:  Array.from({length: 6}, (_, i) => ({
                grade: '' as Grade,
                classNumber: i + 5
            })),
            pupilSubjectProfileDTO: {
                interestLevel: "Не занимаюсь дополнительно",
                projectParticipationLevel: "Не участвовал",
                contestParticipationLevel: "Не участвовал",
                selectionProbabilityLevel: "Точно нет"
            }
        }))
    )
    useEffect(()=>{
        const loadPupilSubjects = async () => {
            try {
                const token = getToken()
                if (!token) throw new Error("Empty token")
                const result: PupilSubject[] = await pupilSubjectsApi.getPupilSubjects(token)
                if (!result || result.length < 0) return
                setPupilSubjects(prev => mergePupilSubjects(result, prev))
                //console.log("From server: ", mergePupilSubjects(result, pupilSubject))
            } catch(err) {
                toast.error("Ошибка при загрузке оценок")
            }
        }
        loadPupilSubjects()
    }, [])
const mergePupilSubjects = (serverData: PupilSubject[], template: PupilSubject[]): PupilSubject[] => {
    return template.map((templateItem:PupilSubject) => {
        // Find corresponding server data for this subject
        const serverItem = serverData.find(item => item.name === templateItem.name);
        
        if (serverItem) {
            // Merge grades: use server data where available, otherwise use template
            const mergedGrades = templateItem.grades.map(templateGrade => {
                const serverGrade = serverItem.grades?.find(
                g => g.classNumber === templateGrade.classNumber
                );
                return serverGrade || templateGrade;
            });
            const profile = serverItem.pupilSubjectProfileDTO ? serverItem.pupilSubjectProfileDTO : templateItem.pupilSubjectProfileDTO
            
            return {
                name: templateItem.name, // Keep template name (should be same)
                grades: mergedGrades ,
                pupilSubjectProfileDTO: profile
            };
        }
        
        // If no server data for this subject, return template
        return templateItem;
    })}
    return (
        <>
            <SubjectsPanel pupilSubjects={pupilSubject} setPupilSubjects={setPupilSubjects} />
            <Toaster />
        </>
        
    )
}