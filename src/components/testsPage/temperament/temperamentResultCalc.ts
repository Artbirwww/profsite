import { TestResultResponse } from "../../../types/testTypes";
import { TemperamentOption } from "./temperamentData";

export const calculateParams = (options: TemperamentOption[], completeTime: number, temperamentFormData: TemperamentOption[]) => {
    const results: TestResultResponse = {
        completionTimeSeconds: completeTime,
        testTypeName: "Temperament",
        psychParams: [{ name: "extrav_introver_score", param: 0 }, { name: "neirotizm_score", param: 0 }, { name: "sincerity_score", param: 0 }]
    }

    options.forEach(userAnswer => {
        // Находим эталонный вопрос с таким же ID
        const presetQuestion = temperamentFormData.find(q => q.id === userAnswer.id);
        
        if (presetQuestion) {
            // Проверяем: совпадает ли ответ пользователя с тем ответом, который дает балл?
            if (userAnswer.answer === presetQuestion.answer) {
                if (presetQuestion.param === 'extrav_introver_score') {
                    results.psychParams[0].param += 1;
                } else if (presetQuestion.param === 'neirotizm_score') {
                    results.psychParams[1].param += 1;
                } else if (presetQuestion.param === 'sincerity_score') {
                    results.psychParams[2].param += 1;
                }
            }
        }
    });

    return results;
}

export const calculateTemperament = (data: TestResultResponse) => {

}