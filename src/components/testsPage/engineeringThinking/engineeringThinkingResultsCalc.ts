import { TestResultResponse } from "../../../types/testTypes";
import { Task } from "../generalTemplates/singleOptionsPicker/SingleOptionsPicker";

export const calculateResults = (tasks:Task[]): TestResultResponse => {
    const resultScore = tasks.reduce((result, task) => task.answer === task.userAnswer ? result + 1 : result, 0)
    return {
        completionTimeSeconds: 0, 
        testTypeName: "Engineering-Thinking", 
        psychParams : [{name: "engineering_thinking_level", param:  resultScore}]}
}