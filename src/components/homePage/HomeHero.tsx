import { FC, useEffect, useState } from "react"

import bannerLogoFasie from "../../res/home-imgs/banner-logo-fasie.webp"

export const HomeHero: FC = ({ }) => {
    return (
        <div className="home-grid-item-1-grid">
            <div className="home-block item-1">
                <div className="home-block-header">
                    ПрофиВектор
                </div>

                <div className="home-block-subtitle">
                    Пройди тесты, примерь VR-шлем и узнай, какая высокооплачиваемая профессия в горнодобывающей индустрии подходит именно тебе!
                </div>

                <a className="partner-badge"
                    href="https://fasie.ru/"
                    target="_blank"
                    rel="noopener noreferrer">

                    <div className="partner-badge-text">
                        Проект реализован при поддержке:
                    </div>

                    <div className="partner-logo-wrapper">
                        <img src={bannerLogoFasie} alt="Логотип Фонда содействия инновациям" />
                    </div>
                </a>
            </div>

            <div className="item-2-grid item-2">
                <div className="home-block stat-item">
                    <div className="home-block-header">
                        5
                    </div>

                    <div className="home-block-text">
                        Топовых профессий
                    </div>
                </div>

                <div className="home-block stat-item">
                    <div className="home-block-header">
                        9
                    </div>

                    <div className="home-block-text">
                        Ключевых тестов
                    </div>
                </div>

                <div className="home-block stat-item">
                    <div className="home-block-header">
                        VR
                    </div>


                    <div className="home-block-text">
                        VR-аналитика будущего
                    </div>
                </div>
            </div>
        </div>
    )
}