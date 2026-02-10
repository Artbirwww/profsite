import "./css/tests-style.css"

import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { GraduationCap, Info } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../ui/reusable/button"
import { testsList, TestsItem } from "./testsData"
import { ProgressBar } from "../../ui/reusable/progressBar"
import { useAuth } from "../../../contexts/AuthContext"
import { pupilApi } from "../../../services/api/pupilApi"
import { TestComponent } from "./testComponent"

const LIST_CONFIG = {
    VISIBLE_COUNT: 3,
    STEP: 3,
    SCROLL_DELAY: 300,
}

export const Tests = () => {
    const navigate = useNavigate()
    const { getToken } = useAuth()

    // Состояние пользователя и прокрутки
    const [userName, setUserName] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)

    const scrollRef = useRef<HTMLDivElement>(null)
    const isScrolling = useRef(false)

    // TODO: Сделать получение прогресса
    const [completedCount, setCompletedCount] = useState(3)
    const totalCount = testsList.length

    useEffect(() => {
        const getUserName = async () => {
            try {
                const token = getToken()

                if (!token) {
                    setUserName("blank user")
                    return
                }

                const pupilData = await pupilApi.getPupilData(token)
                setUserName(`${pupilData.pupilDTO.name} ${pupilData.pupilDTO.surname}`)

            } catch (error) {
                console.error("Failed load user data:", error)
                setUserName("blank user")
            }
        }

        getUserName()
    }, [getToken])

    const handleItemClick = useCallback((path: string) => {
        navigate(path)
    }, [navigate])

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        // Если скролл уже выполняется или реф не привязан — игнорируем
        if (isScrolling.current || !scrollRef.current) return

        const container = scrollRef.current
        const firstItem = container?.firstElementChild as HTMLElement
        if (!firstItem) return

        // Вычисляем динамические параметры сетки из CSS
        const computedStyle = window.getComputedStyle(container)
        const gap = parseInt(computedStyle.rowGap) || 0
        const scrollStepHeight  = firstItem.offsetHeight + gap

        // Определяем направление (-1 вверх, 1 вниз)
        const direction = e.deltaY > 0 ? 1 : -1
        let nextIndex = currentIndex + (direction * LIST_CONFIG.STEP)

        // Рассчитываем границы (не даем пролистать в пустоту в конце списка)
        const maxIndex = Math.max(0, testsList.length - LIST_CONFIG.VISIBLE_COUNT)

        // Валидация индекса
        if (nextIndex < 0) nextIndex = 0
        if (nextIndex > maxIndex) nextIndex = maxIndex

        // Если индекс изменился — выполняем анимацию
        if (nextIndex !== currentIndex) {
            isScrolling.current = true
            setCurrentIndex(nextIndex)

            container.scrollTo({
                top: nextIndex * scrollStepHeight,
                behavior: "smooth",
            })

            // Блокируем новые события на время анимации
            setTimeout(() => {
                isScrolling.current = false
            }, LIST_CONFIG.SCROLL_DELAY)
        }
    }

    return (
        <div className="tests-base"
             // Передаем переменную в CSS для динамического расчета высоты карточек
             style={{ ["--visible-count" as any]: LIST_CONFIG.VISIBLE_COUNT } as React.CSSProperties}>

            <div className="tests-scroll-wrapper">
                
                <div className="tests-options"
                     ref={scrollRef}
                     onWheel={handleWheel}
                     style={{ overflow: "hidden" }}>

                    {testsList.map((item) => (
                        <TestComponent
                            key={item.id}
                            item={item}
                            onClick={handleItemClick} />
                    ))}
                </div>
            </div>
        </div>
    )
}
