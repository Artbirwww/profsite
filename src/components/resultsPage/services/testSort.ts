import {TestResultResponse} from "../../../types/testTypes"
export const getActualTestByDate = (results: TestResultResponse[]): TestResultResponse | undefined => {
    const resultWithDates = results.filter(result => result.createdAt)
    if (resultWithDates.length === 0) return undefined
    return resultWithDates.sort((a, b) => 
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())[0]
}