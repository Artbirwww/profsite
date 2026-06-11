import { FC, useEffect, useState } from "react"

import bannerLogoFasie from "../../res/home-imgs/banner-logo-fasie.webp"

export const HomeHero: FC = ({ }) => {
    return (
        <div className="home-grid-item-1-grid">
            <div className="home-block item-1">
                <div className="hero-logo">
                    <h2>ПрофиВектор</h2>
                </div>
                <p>Пройди тесты, примерь VR-шлем и узнай, какая высокооплачиваемая профессия в горнодобывающей индустрии подходит именно тебе!</p>

                <a className="partner-badge"
                    href="https://fasie.ru/"
                    target="_blank"
                    rel="noopener noreferrer">
                    <p>Проект реализован при поддержке:</p>

                    <div className="partner-logo-wrapper">
                        <img src={bannerLogoFasie} alt="Логотип Фонда содействия инновациям" />
                    </div>
                </a>
            </div>

            <div className="item-2-grid">
                <div className="home-block stat-item">
                    <h1>5</h1>
                    <p>Топовых профессий</p>
                </div>

                <div className="home-block stat-item">
                    <h1>9</h1>
                    <p>Фундаментальных тестов</p>
                </div>

                <div className="home-block stat-item">
                    <h1>VR</h1>
                    <p>VR-аналитика будущего</p>
                </div>
            </div>
        </div>
    )
}