import { Link, useNavigate } from "react-router-dom"
import {crudRoutes} from "./routes.config.ts"
import "../css/form.css"
export const FormsListPage = () => {
    const navigate = useNavigate()
    return (<>
        <div className="content-wrapper">
            <h3>Управление формами</h3>
            <div className="data-table">
                {crudRoutes.map(route => (
                    <div className="row" key={route.path} onClick={() => navigate(`/admin/${route.path}`)}>
                        <p className="param-cell">{route.name}</p>
                    </div>
                ))}
            </div>
        </div>
    </>)
}