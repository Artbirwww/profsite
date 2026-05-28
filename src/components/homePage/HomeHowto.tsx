import { FC } from "react"

import testingImage from "../../res/home-imgs/test.webp"
import vrImage from "../../res/home-imgs/vr.webp"
import eegImage from "../../res/home-imgs/eeg.webp"

export const HomeHowto: FC = ({ }) => {
    return (
        <div className="home-section-item">

            <div className="home-section-header">
                <h4>Как работает наш сервис</h4>
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