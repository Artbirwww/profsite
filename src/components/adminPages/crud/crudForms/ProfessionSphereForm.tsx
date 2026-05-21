import { getBaseUrl } from "../../../../services/api/api"
import { ApiTemplate } from "../ApiTemplate"

export const ProfessionSphereForm = () => {
    const baseUrl = getBaseUrl()
    return (<>
        <>
            <ApiTemplate  
                getApiUrl={`${baseUrl}/api/specialists/professions-spheres`}
                apiParams={["name"]}
                name="Профессии"
            />
        </>
    </>)
}