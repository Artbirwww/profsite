import { Specialist } from "../../../types/specialist/specialist"
import "../css/card.css"
interface SpecialistCardProps {
    specialist: Specialist
}
export const SpecialistCard = ({specialist}: SpecialistCardProps) => {
    const fullName = [specialist.name, specialist.surname, specialist.patronymic]
                    .filter(Boolean)
                    .join(' ') || 'ФИО не заполнено'
    return (<>
        <div className="base-card">
            <div className="card-tit">
                {fullName}
            </div>
            <div className="info-row">
                <span className="info-label">Логин:</span>
                <span>{specialist.email}</span>
            </div>
            <div className="info-row">
                <span className="info-label">Телефон:</span>
                <span>{specialist.contactPhone || '—'}</span>
            </div>
            <div className="info-row">
                <span className="info-label">Почта:</span>
                <span>{specialist.contactEmail || '—'}</span>
            </div>
            <div className="info-row">
                <span className="info-label">Профессия:</span>
                <span>{specialist.profession || '—'}</span>
            </div>
            <div className="info-row">
                <span className="info-label">Опыт:</span>
                <span>{specialist.experience || '—'}</span>
            </div>
            <div className="info-row">
                <span className="info-label">Впечатления:</span>
                <span>{specialist.jobSatisfaction || '—'}</span>
            </div>
        </div>
    </>)
}