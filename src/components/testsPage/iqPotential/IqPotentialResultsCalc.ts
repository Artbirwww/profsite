import { PupilResponse } from "../../../types/pupil/pupil";
import { TestResultResponse } from "../../../types/testTypes";
import { Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker";

export const calcIqTestScore = (tasks: Task[]) => {
    return tasks.reduce((score, task) => task.answer === task.userAnswer ? score + 1 : score , 0)
}
export const calcIqTestResult = (score: number, completionTimeSeconds: number) : TestResultResponse => {
    return {completionTimeSeconds: completionTimeSeconds, 
        psychParams: [{name: "iq_score", param: score}],
        testTypeName: "Intellectual-Potential"
    }
}