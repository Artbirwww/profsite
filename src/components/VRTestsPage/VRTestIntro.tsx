import { useParams } from "react-router-dom"
import { TestIntro } from "../testsPage/TestIntro"

export const VRTestIntro = () => {
    const {profession, professionId} = useParams<{profession: string, professionId:string}>()
    console.log("loading...")
    return (
        <TestIntro 
            testDescriptionPath="public/professions_questionnaire/data/description.json"
            testNavigation={`/vr-tests/${profession}/${professionId}/questionnaire`}

        />
    )
}