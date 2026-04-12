import "./css/homePageStyles.css"

import { FC } from "react"

export const HomePage: FC = ({ }) => {
    return (
        <div className="home-wrapper">

            <div className="home-header">
                <h1>Добро пожаловать</h1>
            </div>

            <div className="home-grid">

                <div className="home-grid-item">

                    <div className="grid-item-header">
                        <h4>Подбор профессий</h4>
                    </div>

                    <div className="home-about-wrapper">

                        <div className="home-about-item">

                        </div>

                        <div className="home-about-item">

                        </div>

                    </div>

                </div>

                <div className="home-grid-item">

                    <div className="grid-item-header">
                        <h4>Что это такое?</h4>
                    </div>

                    <div className="home-howto-wrapper">

                        <div className="home-howto-item">

                        </div>

                        <div className="home-howto-item">

                        </div>

                        <div className="home-howto-item">

                        </div>

                    </div>

                </div>

                <div className="home-grid-item">

                    <div className="grid-item-header">
                        <h4>Наши профессии</h4>
                    </div>

                    <div className="home-professions-wrapper">

                        <div className="home-proffesions-item">

                        </div>

                        <div className="home-proffesions-item">

                        </div>

                        <div className="home-proffesions-item">

                        </div>

                        <div className="home-proffesions-item">

                        </div>

                        <div className="home-proffesions-item">

                        </div>

                    </div>

                </div>

                <div className="home-grid-item">

                    <div className="grid-item-header">
                        <h4>Проект реализован благодаря</h4>
                    </div>

                    <div className="home-partners-wrapper">

                        <div className="home-partners-item">

                        </div>

                        <div className="home-partners-item">

                        </div>

                    </div>

                </div>

            </div>

            <div className="home-indicator">

            </div>

        </div>
    )
}