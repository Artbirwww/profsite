import { FC } from "react"

export const HomeHowItsWorking: FC = ({ }) => {
    return (
        <div className="home-grid-item-2-grid">

            <div className="item-1-grid">
                <div className="home-block">
                    <div className="home-block-header">
                        Ключевые тесты
                    </div>

                    <div className="home-block-text">
                        Цифровой профиль товего мышления, характера и карьерных ценностей
                    </div>

                    <div className="widget-tags-container">
                        <div className="widget-tag">Темперамент</div>
                        <div className="widget-tag">Групповые роли</div>
                        <div className="widget-tag">Инженерное мышление</div>
                        <div className="widget-tag">Профориентационное тестирование</div>
                    </div>
                </div>

                <div className="home-block">
                    <div className="home-block-header">
                        Тест-драйв в VR шлеме
                    </div>

                    <div className="home-block-text">
                        Погружение в реальные рабочие сценарии на добывающем предприятии
                    </div>

                    <div className="widget-tags-container">
                        <div className="widget-tag">Интерактивные задачи</div>
                        <div className="widget-tag">Симуляция работы в карьере</div>
                        <div className="widget-tag">Eye-tracking</div>
                        <div className="widget-tag">Face-tracking</div>
                    </div>
                </div>

                <div className="home-block">
                    <div className="home-block-header">
                        Биологическая обратная связь
                    </div>

                    <div className="home-block-text">
                        Считывание сигналов мозга  во время прохождения VR-симуляции
                    </div>

                    <div className="widget-tags-container">
                        <div className="widget-tag">Фиксация пиков концентрации</div>
                        <div className="widget-tag">Уровень стресса и вовлеченности</div>
                        <div className="widget-tag">Реакции без эффекта "угадывания"</div>
                    </div>
                </div>
            </div>

            <div className="home-block item-2">
                <div className="home-block-header">
                    Сравнение с эталоном индустрии
                </div>

                <div className="home-block-text">
                    Наш алгоритм собирает данные твоих тестов, взгляда в VR и сигналов ЭЭГ, а затем сравнивает их с цифровыми профилями реальных, успешных сотрудников горнодобывающей промышленности.
                    Результат: Ты получаешь точный персональный отчет: насколько ты подходишь профессии, и — главное — насколько тебе понравится эта работа через 5–10 лет.
                </div>
            </div>
        </div>
    )
}