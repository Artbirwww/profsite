import { PsychParam, TestResultRequest, TestResultResponse } from "../../../types/testTypes"
import { GroupRolesQuestion, groupRolesDataRoleMapping } from "./groupRolesData"

export const calculateGroupRolesParams = (groupQuestionsResult: GroupRolesQuestion[][]): TestResultRequest => {
    const rolesOccurs = {
        company_worker: 0,
        chairman: 0,
        shaper: 0,
        plant: 0,
        resource_investigator: 0,
        monitor_evaluation: 0,
        team_worker: 0,
        completer_finisher: 0
    }

    //Берем значение из маппинга (загоняем ру -> анг, затем получаем нужное совпадение)
    groupQuestionsResult.forEach(questions => {
        questions.forEach(question => {
            if (question.value > 0)
                rolesOccurs[groupRolesDataRoleMapping[question.groupRole]] += question.value
        })
    })

    const testResultRequest: TestResultRequest = {
        completionTimeSeconds: 0,
        testTypeName: "Group-Roles",
        psychParams: Object.entries(rolesOccurs).map(([name, param]) => ({ name, param }))
    }

    return testResultRequest
}
export const calculateGroupRolesDominantRoles = (results: TestResultResponse): PsychParam[] => {
    const maxParam = Math.max(...results.psychParams.map(param => param.param))

    return results.psychParams.filter(param => param.param === maxParam)
}