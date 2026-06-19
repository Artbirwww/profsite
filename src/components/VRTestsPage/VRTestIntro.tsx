import { useParams } from "react-router-dom"
import { TestIntro } from "../testsPage/TestIntro"

export const VRTestIntro = () => {
    const {profession} = useParams<{profession: string}>()
    console.log("loading...")
    return (
        <TestIntro 
            testDescriptionPath="public/professions_questionnaire/data/description.json"
            testNavigation={`/vr-tests/${profession}/questionnaire`}

        />
    )
}