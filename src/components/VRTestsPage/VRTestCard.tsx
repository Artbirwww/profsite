import { profession } from "../../types/specialist/specialist"
import { Button } from "../ui/reusable/button"
import { Status } from "./VRTestsPage"

interface VRTestCardProps {
    item: profession
    status: Status
}
const statusesRu: Record<Status, string> = {
    "not started": "Не начато",
    "first stage": "Первый этап",
    "second stage": "Второй этап"
}

export const VRTestCard = ({item, status} : VRTestCardProps) => {
    console.log(status)

    return (<>
        <div key={item.id} className="test">
            <div className="test-header">
                <div className="test-title">
                    <h4>{item.name}</h4>
                    <small>{statusesRu[status]}</small>
                </div>
                
                <a href="#" style={{color: "var(--error-color-500)"}}>Сбросить</a>
            </div>
            <Button label="Начать" />
        </div>
    </>)
}