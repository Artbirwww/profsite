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
            className: "item-1-grid",
            image: masterImage,
        },
        {
            title: "Горный инженер",
            description:
                "Проектирует масштабные карьеры и подземные сооружения. Разрабатывает безопасные способы добычи и управляет сложными цифровыми системами.",
            className: "item-2-grid",
            image: engineerImage,
        },
        {
            title: "Горный взрыватель",
            description:
                "Управляет стихией. Рассчитывает и проводит точные направленные взрывы, чтобы разрушить крепчайшую скалу и открыть доступ к ценной руде.",
            className: "item-3-grid",
            image: explosivesImage,
        },
        {
            title: "Горный спасатель",
            description:
                "Первым приходит на помощь при авариях. Ликвидирует подземные пожары, проверяет системы жизнеобеспечения шахт и спасает людей с помощью передового снаряжения.",
            className: "item-4-grid",
            image: rescuerImage,
        },
        {
            title: "Водитель карьерного самосвала",
            description:
                "Управляет машинами-гигантами весом до 450 тонн. Контролирует десятки цифровых датчиков, следит за распределением веса и координирует движение по уклонам карьера.",
            className: "item-5-grid",
            image: driverImage,
        },
    ]

    return (
        <div className="home-grid-item-3-grid">
            {professionsList.map((prof) => (
                <div className={`prof-item ${prof.className}`} key={prof.title}>
                    <div className="home-block title">
                        {prof.title}
                    </div>
                    <div className="home-block img">
                        <img src={prof.image} alt={prof.title} />
                    </div>
                    <div className="home-block description">
                        {prof.description}
                    </div>
                </div>
            ))}
        </div>
    )
}