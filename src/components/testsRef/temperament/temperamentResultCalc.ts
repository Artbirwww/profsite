import { TestResultResponse } from "../../../types/testTypes";
import { TemperamentOption } from "./temperamentData";

export const calculateParams = (options: TemperamentOption[], completeTime: number, temperamentFormData: TemperamentOption[]) => {
   const results: TestResultResponse = {
    completionTimeSeconds: completeTime, 
    testTypeName: "Temperament" , 
    psychParams: [{name: "extrav_introver_score", param : 0}, {name: "neirotizm_score", param: 0}, {name: "sincerity_score", param: 0}]}
    options.forEach(option => {
        // Only count if answer is true (assuming boolean answer)
        if (option.answer) {
            if (option.param === 'extrav_introver_score') 
                results.psychParams[0].param += 1
            else if (option.param === 'neirotizm_score')
                results.psychParams[1].param += 1
            else if (option.param === 'sincerity_score')
                results.psychParams[2].param += 1
        }
    })
    return results
}
export const calculateTemperament = (data: TestResultResponse) => {

}