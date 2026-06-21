import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { StandartTest } from "../testsPage/generalTests/StandartTest"
import { PositiveNegative, PositiveNegativeOption } from "../testsPage/generalTemplates/positiveNegative/PositiveNegative"
import api, { getBaseUrl } from "../../services/api/api"
import { SingleOptionsPicker, Task } from "../testsPage/generalTemplates/singleOptionsPicker/SingleOptionsPicker"
import { NoResults } from "../ui/noResultComponent/NoResult"

export const VRTest = () => {
    const [testData, setTestData] = useState()
    const {profession, professionId} = useParams<{profession: string, professionId: string}>()

    // Load data on mount
    useEffect(() => {
        const loadGenericQuestions = async () => {
            try {
                const response = await api.get(
                    `${getBaseUrl()}/public/professions_questionnaire/data/generic_questions.json`
                );
                setTestData(response.data);
            } catch (error) {
                console.error("Failed to load test data:", error);
                // Show error state if needed
            }
        };
        loadGenericQuestions();
    }, []);
    if (!testData || !profession) 
        return (<NoResults message="Загружаем тест" variant="loading" />)
    const tasksWithProfession = testData.tasks.map((task: Task) => ({
        ...task,
        text: task.text?.replace(/\{profession\}/g, profession)
    }))
    const DynamicTest = StandartTest<Task>({
        Component: SingleOptionsPicker,
        fetchData: async () => tasksWithProfession,
        resultPath: `/vr-tests/${profession}/${professionId}/results`,
        stateKey: "results",
        description: testData.description || "Оцените профессию по различным критериям",
        autoStartTimer: true,
        pickerStyle: "extended",
        optionStyle: "column",
    });

    return <DynamicTest />;
}