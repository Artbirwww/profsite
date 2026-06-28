import { HRManager } from "../../../types/company/HRManager"

interface HRCardProps {
    manager: HRManager
}
export const HRCard = ({manager} : HRCardProps) => {

    return (<>
        <div className="base-card">
            <div className="card-title">
                {manager.fullName}
            </div>
            <div className="info-row">
                <span className="info-label">Логин:</span>
                <span>{manager.email}</span>
            </div>
            <div className="info-row">
                <span className="info-label">Организация:</span>
                <span>{manager.companyName}</span>
            </div>
        </div>
    </>)
}