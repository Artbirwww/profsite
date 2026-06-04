import { FC } from "react"

import masterImage from "../../res/home-imgs/master-image.webp"
import engineerImage from "../../res/home-imgs/engineer-image.webp"
import explosivesImage from "../../res/home-imgs/explosives-image.webp"
import rescuerImage from "../../res/home-imgs/rescuer-image.webp"
import driverImage from "../../res/home-imgs/driver-image.webp"

export const HomeProfessions: FC = ({ }) => {
    const professionsList = [
        {
            title: "Горный мастер",
            description:
                "Руководит сменой в шахте или карьере. Распределяет задачи между бригадами, контролирует работу техники и полностью отвечает за безопасность сотрудников.",
            className: "item-1",
            image: masterImage,
        },
        {
            title: "Горный инженер",
            description:
                "Проектирует масштабные карьеры и подземные сооружения. Разрабатывает безопасные способы добычи и управляет сложными цифровыми системами.",
            className: "item-2",
            image: engineerImage,
        },
        {
            title: "Горный взрыватель",
            description:
                "Управляет стихией. Рассчитывает и проводит точные направленные взрывы, чтобы разрушить крепчайшую скалу и открыть доступ к ценной руде.",
            className: "item-3",
            image: explosivesImage,
        },
        {
            title: "Горный спасатель",
            description:
                "Первым приходит на помощь при авариях. Ликвидирует подземные пожары, проверяет системы жизнеобеспечения шахт и спасает людей с помощью передового снаряжения.",
            className: "item-4",
            image: rescuerImage,
        },
        {
            title: "Водитель карьерного самосвала",
            description:
                "Управляет машинами-гигантами весом до 450 тонн. Контролирует десятки цифровых датчиков, следит за распределением веса и координирует движение по уклонам карьера.",
            className: "item-5",
            image: driverImage,
        },
    ]

    return (
        <div className="home-section-wrapper">
            <div className="home-prof-grid">

                <div className="home-block header">
                    Профессии горнодобывющей промышленности
                </div>

                {professionsList.map((prof) => (
                    <div className={`home-block prof-item ${prof.className}`} key={prof.title}>
                        <div className="prof-image-wrapper">
                            <img src={prof.image} alt={prof.title} />
                            <div className="image-darkening-overlay" />
                            <div className="image-gradient-overlay" />
                        </div>

                        <div className="prof-content">
                            <h4>{prof.title}</h4>
                            <p>{prof.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}