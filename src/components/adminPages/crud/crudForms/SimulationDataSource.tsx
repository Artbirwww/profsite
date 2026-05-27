import { getBaseUrl } from "../../../../services/api/api"
import { ApiTemplate } from "../ApiTemplate"

export const SimulationDataSource = () => {

    const baseUrl = getBaseUrl()
    return (<>
        <ApiTemplate
            getApiUrl={`${getBaseUrl()}/api/simulations/simulation-data-sources`}
            apiParams={["name"]}
            name="Источники данных для симуляций"/>
    </>)
}