import "./css/homePageStyles.css"

import { MousePointerClick, Lightbulb, HardHat, Handshake } from "lucide-react"

import { FC, useEffect, useRef, useState } from "react"
import { HomeAbout } from "./HomeAbout"
import { HomeHowto } from "./HomeHowto"
import { HomeProfessions } from "./HomeProfessions"
import { HomePartners } from "./HomePartners"

const SECTIONS = [
    { Icon: MousePointerClick, Component: HomeAbout },
    { Icon: Lightbulb, Component: HomeHowto },
    { Icon: HardHat, Component: HomeProfessions },
    { Icon: Handshake, Component: HomePartners },
]

export const HomePage: FC = ({ }) => {
    const homeContainerRef = useRef<HTMLDivElement>(null)
    const [visibleIds, setVisibleIds] = useState<number[]>([])

    useEffect(() => {
        const container = homeContainerRef.current
        if (!container)
            return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const idAttr = entry.target.getAttribute("data-id")
                    if (idAttr === null)
                        return

                    const index = Number(idAttr)

                    if (entry.isIntersecting) {
                        entry.target.classList.add("show")
                        setVisibleIds(prev => (prev.includes(index) ? prev : [...prev, index]))

                    } else {
                        entry.target.classList.remove("show")
                        setVisibleIds(prev => prev.filter(i => i !== index))
                    }
                })
            },
            {
                root: container,
                threshold: .2,
            }
        )

        const items = container.querySelectorAll(".home-grid-item-container")
        items.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <div className="home-wrapper">
            <div className="home-grid" ref={homeContainerRef}>
                {SECTIONS.map(({ Component }, index) => (
                    <div className="home-grid-item-container" data-id={index}>
                        <Component />
                    </div>

                ))}
            </div>

            <div className="home-indicator">
                {SECTIONS.map(({ Icon }, index) => (
                    <Icon key={index} className={`icon ${visibleIds.includes(index) ? "active" : ""}`} />
                ))}
            </div>
        </div>
    )
}