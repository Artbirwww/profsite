
export interface PupilSubjectProfile {
    interestLevel: InterestLevelType
    projectParticipationLevel: ParticipationLevelType
    contestParticipationLevel: ParticipationLevelType
    selectionProbabilityLevel: ProbabilityLevelType
}
export type InterestLevelType = "Не занимаюсь дополнительно" | 'Занимаюсь редко' | "Занимаюсь регулярно, но немного" | "Занимаюсь регулярно" | "Занимаюсь очень активно"
export type ParticipationLevelType = "Не участвовал" | "Школьный" | "Муниципальный" | "Региональный" | "Федеральный"
export type ProbabilityLevelType = "Точно нет" | "Мало вероятно" | "Возможно" | "Скорее да" | "Однозначно да"
