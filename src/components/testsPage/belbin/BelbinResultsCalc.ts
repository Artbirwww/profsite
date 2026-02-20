import { TestResultRequest } from "../../../types/testTypes";
import { BelbinQuestion } from "./belbinData";

export const calculateBelbinParams = (groupQuestionsResult: BelbinQuestion[][]): TestResultRequest => {
    const rolesOccurs = {
        исполнитель: 0,
        кординатор: 0,
        формирователь: 0,
        мыслитель: 0,
        разведчик: 0,
        оценщик: 0,
        коллективист: 0,
        доводчик: 0
    };
    
    groupQuestionsResult.forEach(questions => {
        questions.forEach(question => {
            if (question.value > 0)
                rolesOccurs[question.belbinRole] += question.value
        })
    })
    const testResultRequest: TestResultRequest = {
        completionTimeSeconds: 0,
        testTypeName: "Group Roles", 
        psychParams: Object.entries(rolesOccurs).map(([name, param]) => ({name, param}))
    }
    //convert mapped calculated occures to list of objects for the server
    return testResultRequest
}