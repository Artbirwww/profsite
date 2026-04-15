import { FC } from "react"

export const HomeProfessions: FC = ({ }) => {
    return (
        <div className="home-section-item">

            <div className="home-section-header">
                <h4>Профессии</h4>
            </div>

            <div className="home-professions-section-wrapper">
                <div className="home-professions-item">
                    <h4>Горный инженер</h4>
                </div>

                <div className="home-professions-item">
                    <h4>Горный мастер</h4>
                </div>

                <div className="home-professions-item">
                    <h4>Взрывотехник</h4>
                </div>

                <div className="home-professions-item">
                    <h4>Горноспасатель</h4>
                </div>

                <div className="home-professions-item">
                    <h4>Водитель карьерного самосвала</h4>
                </div>
            </div>

        </div>
    )
}