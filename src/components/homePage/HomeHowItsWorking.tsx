import { FC } from "react"

export const HomeHowItsWorking: FC = ({ }) => {
    return (
        <div className="home-column-section-wrapper">
            <div className="row-top">
                <div className="home-block top-left-widget">
                    <h4>9 фундаментальных тестов</h4>
                    <p>Цифровой профиль товего мышления, характера и карьерных ценностей</p>

                    <div className="widget-tags-container">
                        <div className="widget-tag">Профориентация по Холланду и Йовайши</div>
                        <div className="widget-tag">Логика Беннета и IQ</div>
                        <div className="widget-tag">Роли в команде по Белбину</div>
                    </div>
                </div>

                <div className="home-block top-mid-widget">
                    <h4>Тест-драйв в VR-шлеме</h4>
                    <p>Погружение в реальные рабочие сценарии на добывающем предприятии</p>

                    <div className="widget-tags-container">
                        <div className="widget-tag">Интерактивные задачи</div>
                        <div className="widget-tag">Симуляция работы на руднике / в карьере</div>
                        <div className="widget-tag">Eye-tracking (фиксация направления взгляда)</div>
                    </div>
                </div>

                <div className="home-block top-right-widget">
                    <h4>Биологическая Обратная Связь (ЭЭГ)</h4>
                    <p>Считывание сигналов мозга  во время прохождения VR-симуляции</p>

                    <div className="widget-tags-container">
                        <div className="widget-tag">Фиксация пиков концентрации</div>
                        <div className="widget-tag">Измерение уровня стресса и вовлеченности</div>
                        <div className="widget-tag">Объективные реакции без эффекта "угадывания"</div>
                    </div>
                </div>
            </div>

            <div className="row-bottom">
                <div className="home-block bottom-widget">
                    <h4>Сравнение с эталоном индустрии</h4>
                    <p>Наш алгоритм собирает данные твоих тестов, взгляда в VR и сигналов ЭЭГ, а затем сравнивает их с цифровыми профилями реальных, успешных сотрудников горнодобывающей промышленности.</p>
                    <p>Результат: Ты получаешь точный персональный отчет: насколько ты подходишь профессии, и — главное — насколько тебе понравится эта работа через 5–10 лет.</p>
                </div>
            </div>
        </div>
    )
}