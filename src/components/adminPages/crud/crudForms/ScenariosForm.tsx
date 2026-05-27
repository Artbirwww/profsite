import { getBaseUrl } from "../../../../services/api/api"
import { ApiTemplate } from "../ApiTemplate"

export const ScenariosForm = () => {
    const baseUrl = getBaseUrl()
    return (<>
        <ApiTemplate
            getApiUrl={`${baseUrl}/api/simulations/scenarios`}
            apiParams={["name"]}
            name="Сценарии симуляций"/>
    </>)
}