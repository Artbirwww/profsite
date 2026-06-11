import "./css/homePageStyles.css"
import "./css/heroSection.css"
import "./css/howItsWorkingSection.css"
import "./css/professionsSection.css"
import "./css/footerInfoSection.css"

import { MousePointerClick, Lightbulb, HardHat, RectangleEllipsis } from "lucide-react"

import { FC, useEffect, useRef, useState } from "react"
import { HomeHero } from "./HomeHero"
import { HomeHowItsWorking } from "./HomeHowItsWorking"
import { HomeProfessions } from "./HomeProfessions"
import { HomeFooterInfo } from "./HomeFooterInfo"

const SECTIONS = [
    { Icon: MousePointerClick, Component: HomeHero },
    { Icon: Lightbulb, Component: HomeHowItsWorking },
    { Icon: HardHat, Component: HomeProfessions },
    { Icon: RectangleEllipsis, Component: HomeFooterInfo },
]

export const HomePage: FC = ({ }) => {
    return (
        <div className="home-wrapper">
            <div className="home-grid">
                {SECTIONS.map(({ Component }, index) => (
                    <Component />
                ))}
            </div>
        </div>
    )
}