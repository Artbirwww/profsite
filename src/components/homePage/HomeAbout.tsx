import { FC } from "react"

import aboutImage from "../../res/home-imgs/engineer.webp"

export const HomeAbout: FC = ({ }) => {
    return (
        <div className="home-section-item">
            <img src={aboutImage} alt="О нас"/>
        </div>
    )
}