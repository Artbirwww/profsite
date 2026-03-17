import { TestResultResponse } from "../../../types/testTypes"
import { KlimovTask, klimovTypeParam } from "./klimovTypes"

export const calculateResults = (testData: KlimovTask[]): TestResultResponse => {
    const result: TestResultResponse = {
        completionTimeSeconds: 0,
        testTypeName: "Professional-Orientation-Klimov",
        psychParams: [{ name: "human_score", param: 0 },
        { name: "nature_score", param: 0 },
        { name: "tech_score", param: 0 },
        { name: "sign_score", param: 0 },
        { name: "artistic_score", param: 0 }]
    }

    testData.forEach(task => {
        const pickedOption = task.options.find(op => op.isPicked === true)
        if (!pickedOption) return
        //use type to param mapping to get param
        result.psychParams.forEach(option => {
            if (option.name === klimovTypeParam[pickedOption?.type])
                option.param += 1
        })
    })
    return result
}