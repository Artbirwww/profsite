import "./css/testsPageStyle.css"

import React, { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { testsList } from "./TestsData"
import { TestComponent } from "./TestComponent"
import { useNavigate } from "react-router-dom"
import { DisplacementFilter } from "../../DisplacementFilter"

import bg1 from "../../res/test-imgs/testsBackgrounds/1.svg"
import bg2 from "../../res/test-imgs/testsBackgrounds/2.svg"
import bg3 from "../../res/test-imgs/testsBackgrounds/3.svg"
import bg4 from "../../res/test-imgs/testsBackgrounds/4.svg"
import bg5 from "../../res/test-imgs/testsBackgrounds/5.svg"
import bg6 from "../../res/test-imgs/testsBackgrounds/6.svg"
import bg7 from "../../res/test-imgs/testsBackgrounds/7.svg"
import bg8 from "../../res/test-imgs/testsBackgrounds/8.svg"
import bg9 from "../../res/test-imgs/testsBackgrounds/9.svg"

const bgsSVG = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9]

const PAGE_CONFIG = {
    visibleItemsCount: 3,
    itemsGap: 10,
    padding: 10,
}

export const TestsPage: FC = ({ }) => {
    const navigate = useNavigate()
    const testContainerRef = useRef<HTMLDivElement>(null)
    const [visibleIds, setVisibleIds] = React.useState<Set<string | number>>(new Set())

    useEffect(() => {
        const container = testContainerRef.current
        if (!container) return

        const observer = new IntersectionObserver(
            (entries) => {
                setVisibleIds(prev => {
                    const newSet = new Set(prev)
                    entries.forEach((entry) => {
                        const id = entry.target.getAttribute("data-id")
                        if (!id) return

                        if (entry.isIntersecting) {
                            newSet.add(id)
                            entry.target.classList.add("show")
                        } else {
                            newSet.delete(id)
                            entry.target.classList.remove("show")
                        }
                    })
                    return newSet
                })
            },
            {
                threshold: .25,
                root: container,
            }
        )

        const items = container.querySelectorAll(".test-item-wrapper")
        items.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [testsList.length])

    const scrollToTest = useCallback((id: string | number) => {
        const elememt = testContainerRef.current?.querySelector(`[data-id="${id}"]`)
        if (elememt) {
            elememt.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            })
        }
    }, [])

    const handleClick = useCallback((path: string) => {
        navigate(path)
    }, [navigate])

    const containerStyle = useMemo(() => ({
        "--visible-items-count": PAGE_CONFIG.visibleItemsCount,
        "--items-gap": `${PAGE_CONFIG.itemsGap}px`,
        "--padding": `${PAGE_CONFIG.padding}px`,
    } as React.CSSProperties), [])

    return (
        <div ref={testContainerRef} className="test-selector-wrapper" style={containerStyle}>

            {testsList.map((item, index) => {
                return (
                    <TestComponent
                        key={item.id || index}
                        dataId={item.id}
                        item={item}
                        background={bgsSVG[index % bgsSVG.length]}
                        onClick={handleClick} />
                )
            })}

            <div className="test-nav-dots liquid-glass-component">

                <DisplacementFilter />

                {testsList.map((item, index) => {
                    const isActive = visibleIds.has(String(item.id))

                    return (
                        <div key={item.id} className="nav-dots-wrapper" onClick={() => scrollToTest(item.id)}>

                            <div className={`dot ${isActive ? "active" : ""}`} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}