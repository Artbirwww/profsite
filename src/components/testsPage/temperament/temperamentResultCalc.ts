import { TestResultResponse } from "../../../types/testTypes"
import { TemperamentOption, TemperamentType, temperamentTypes } from "./temperamentData"

export const calculateParams = (options: TemperamentOption[], completeTime: number, temperamentFormData: TemperamentOption[]) => {
    const results: TestResultResponse = {
        completionTimeSeconds: completeTime,
        testTypeName: "Temperament",
        psychParams: [{ name: "extrav_introver_score", param: 0 }, { name: "neirotizm_score", param: 0 }, { name: "sincerity_score", param: 0 }]
    }

    options.forEach(userAnswer => {
        // Находим эталонный вопрос с таким же ID
        const presetQuestion = temperamentFormData.find(q => q.id === userAnswer.id)

        if (presetQuestion) {
            // Проверяем: совпадает ли ответ пользователя с тем ответом, который дает балл?
            if (userAnswer.answer === presetQuestion.answer) {

                if (presetQuestion.param === 'extrav_introver_score') {
                    results.psychParams[0].param += 1

                } else if (presetQuestion.param === 'neirotizm_score') {
                    results.psychParams[1].param += 1

                } else if (presetQuestion.param === 'sincerity_score') {
                    results.psychParams[2].param += 1
                }
            }
        }
    })

    return results
}

export const calculateTemperament = (test: TestResultResponse): TemperamentType => {
    const extraversion = test.psychParams.find(param => param.name === "extrav_introver_score")?.param || 0
    const neurotizm = test.psychParams.find(param => param.name === "neirotizm_score")?.param || 0
    const sincerity = test.psychParams.find(param => param.name === "sincerity_score")?.param || 0
    let result

    if (sincerity > 4) {
        return temperamentTypes.unreliable as TemperamentType
    }

    if (extraversion > 5) {
        result = neurotizm > 5 ? temperamentTypes.choleric : temperamentTypes.sanguine
    }

    if (extraversion < 5) {
        result = neurotizm > 5 ? temperamentTypes.melancholic : temperamentTypes.phlegmatic
    }

    return result as TemperamentType
}