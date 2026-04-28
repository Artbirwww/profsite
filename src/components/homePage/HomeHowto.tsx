import { FC } from "react"

export const HomeHowto: FC = ({ }) => {
    return (
        <div className="home-section-item">

            <div className="home-section-header">
                <h4>Что это такое?</h4>
            </div>

            <div className="home-howto-section-wrapper">
                <div className="home-howto-item">
                    <h4>Тесты</h4>
                </div>

                <div className="home-howto-item">
                    <h4>VR симуляция</h4>
                </div>

                <div className="home-howto-item">
                    <h4>Биологическая Обратная Связь</h4>
                </div>
            </div>

        </div>
    )
}