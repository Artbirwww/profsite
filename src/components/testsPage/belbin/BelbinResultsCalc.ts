import { TestResultRequest } from "../../../types/testTypes";
import { BelbinQuestion, BelbinRole, BelbinRoleEN, belbinRoleMapping } from "./belbinData";

export const calculateBelbinParams = (groupQuestionsResult: BelbinQuestion[][]): TestResultRequest => {
    const rolesOccurs = {
        company_worker: 0,
        chairman: 0,
        shaper: 0,
        plant: 0,
        resource_investigator: 0,
        monitor_evaluation: 0,
        team_worker: 0,
        completer_finisher: 0
    };
    //Берем значение из маппинга (загоняем ру -> анг, затем получаем нужное совпадение)
    groupQuestionsResult.forEach(questions => {
        questions.forEach(question => {
            if (question.value > 0)
                rolesOccurs[belbinRoleMapping[question.belbinRole]] += question.value
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