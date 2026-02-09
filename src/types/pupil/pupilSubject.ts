//Common subject for all years 
export interface PupilSubject {
    name: Subject
    grades: PupilGrade []
}
//unit grade for subject (11 in total)
export interface PupilGrade {
    grade: Grade
    classNumber: number
}
export type Subject = 
  | 'Математика'
  | 'Русский язык'
  | 'Литература'
  | 'Иностранный язык'
  | 'Физика'
  | 'Химия'
  | 'Биология'
  | 'История'
  | 'Обществознание'
  | 'География'
  | 'Информатика';
export type Grade = "н/а" | "" | 3 | 4 | 5