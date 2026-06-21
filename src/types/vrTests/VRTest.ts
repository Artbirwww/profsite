
export interface VRTest {
    id?: number,
    professionId: number,
    typeName: string,
    pupilId?: number
    specialistId?: number
    completionTimeSeconds: number
    answers: Answer []
    createdAt?: string
}
export interface Answer {
    questionText: string
    answerText: string
}
export type VRTestStatus = "not_started" | "first_stage" | "second_stage" | "completed";

export interface ProfessionWithStatus {
    id: number;
    name: string;
    status: VRTestStatus;
    testsCount: number;
    remainingAttempts: number;
    canTakeTest: boolean;
}