import { FC } from "react"

export const HomeHowItsWorking: FC = ({ }) => {
    return (
        <div className="home-grid-item-2-grid">

            <div className="item-1-grid">
                <div className="home-block">
                    <h4>9 фундаментальных тестов</h4>

                    <p>Цифровой профиль товего мышления, характера и карьерных ценностей</p>

                    <div className="widget-tags-container">
                        <div className="widget-tag">Темперамент</div>
                        <div className="widget-tag">Групповые роли</div>
                        <div className="widget-tag">Инженерное мышление</div>
                    </div>
                </div>

                <div className="home-block">
                    <h4>Тест-драйв в VR-шлеме</h4>

                    <p>Погружение в реальные рабочие сценарии на добывающем предприятии</p>

                    <div className="widget-tags-container">
                        <div className="widget-tag">Интерактивные задачи</div>
                        <div className="widget-tag">Симуляция работы в карьере</div>
                        <div className="widget-tag">Eye-tracking</div>
                    </div>
                </div>

                <div className="home-block">
                    <h4>Биологическая Обратная Связь</h4>

                    <p>Считывание сигналов мозга  во время прохождения VR-симуляции</p>

                    <div className="widget-tags-container">
                        <div className="widget-tag">Фиксация пиков концентрации</div>
                        <div className="widget-tag">Уровень стресса и вовлеченности</div>
                        <div className="widget-tag">Реакции без эффекта "угадывания"</div>
                    </div>
                </div>
            </div>

            <div className="home-block item-2">
                <h4>Сравнение с эталоном индустрии</h4>
                <p>Наш алгоритм собирает данные твоих тестов, взгляда в VR и сигналов ЭЭГ, а затем сравнивает их с цифровыми профилями реальных, успешных сотрудников горнодобывающей промышленности.</p>
                <p>Результат: Ты получаешь точный персональный отчет: насколько ты подходишь профессии, и — главное — насколько тебе понравится эта работа через 5–10 лет.</p>
            </div>
        </div>
    )
}