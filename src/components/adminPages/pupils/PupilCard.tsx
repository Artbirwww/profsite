import { PupilResponse } from "../../../types/pupil/pupil"
import style from "./pupils-list.module.css"
interface PupilCardProps {
    pupil: PupilResponse
}

export const PupilCard = ({pupil} : PupilCardProps) => {
    const fullName = [pupil.pupilDTO?.surname, pupil.pupilDTO?.name, pupil.pupilDTO?.patronymic]
                    .filter(Boolean)
                    .join(" ") || "ФИО не заполнено"
    const classInfo = pupil.pupilDTO?.classNumber ? `${pupil.pupilDTO.classNumber}${pupil.pupilDTO.classLabel}` : '--'
    return (
        <div className="base-card">
            <div className="card-title">
                {fullName} <span style={{fontSize: '0.9rem', color: '#666'}}>({classInfo})</span>
            </div>
            <div className="info-row">
                <span className="info-label">Почта:</span>
                <span>{pupil.email || '--'}</span>
            </div>
            <div className="info-row">
                <span className="info-label">
                    Дата регистрации:
                </span>
                <span>{pupil.pupilDTO?.createdAt || '--'}</span>
            </div>
        </div>
    )
}