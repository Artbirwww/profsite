import api, { getBaseUrl } from "../../../../services/api/api"
import { ApiTemplate } from "../ApiTemplate"

export const ProfessionsForm = () => {
    const baseUrl = getBaseUrl()
    return (
        <>
            <ApiTemplate  
                postApiUrl={`${baseUrl}/api/specialists/professions`}
                getApiUrl={`${baseUrl}/api/specialists/professions`}
                deleteApiUrl={`${baseUrl}/api/specialists/professions`}
                apiParams={["name"]}
                name="Профессии"
            />
        </>
    )
}