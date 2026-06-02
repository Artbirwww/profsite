import { FC } from "react"

export const HomeHero: FC = ({ }) => {
    return (
        <div className="home-row-section-wrapper">
            <div className="col-left">
                <div className="home-block left-top-widget">
                    <h2>Твой цифровой дублер в горном деле</h2>
                    <p>Пройди тесты, примерь VR-шлем и узнай, какая высокооплачиваемая профессия в горнодобывающей индустрии подходит именно тебе!</p>
                    <p>Данные ТВОЕГО профиля сверяются с психологическими картами действующих ТОП-профессионалов горного дела</p>
                </div>

                <div className="home-block left-bottom-widget">
                    <p>Проект реализован при поддержке Фонда содействия инновациям</p>
                </div>
            </div>

            <div className="col-right">
                <div className="home-block right-widget hero-stats-container">
                    <div className="hero-stats-item">
                        <span>5</span>
                        <p>Топовых профессий горнодобывающей промышленности</p>
                    </div>

                    <div className="hero-stats-item">
                        <span>9</span>
                        <p>Фундаментальных тестов</p>
                    </div>

                    <div className="hero-stats-item">
                        <span>VR</span>
                        <p>VR-аналитика будущего</p>
                    </div>
                </div>
            </div>
        </div>
    )
}