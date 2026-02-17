import "./css/scrollStyle.css"

import React, { useRef, useState } from "react"

interface ScrollContainerProps<Items> {
    items: Items[]
    renderItem: (item: Items) => React.ReactNode
    className?: string
    visibleCount?: number
    step?: number
    scrollDelay?: number
    itemsGap?: string
}

export const Scroll = <Items extends { id: string | number }>({ items, renderItem, className = "", visibleCount = 3, step = 3, scrollDelay = 300, itemsGap = "2px" }: ScrollContainerProps<Items>) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)
    const isScrolling = useRef(false)

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        // Если скролл уже выполняется или реф не привязан — игнорируем
        if (isScrolling.current || !scrollRef.current) return

        const container = scrollRef.current
        const firstItem = container.firstElementChild as HTMLElement
        if (!firstItem) return

        // Вычисляем динамические параметры сетки из CSS
        const computedStyle = window.getComputedStyle(container)
        const gap = parseInt(computedStyle.rowGap) || 0
        const scrollStepHeight = firstItem.offsetHeight + gap

        // Определяем направление (-1 вверх, 1 вниз)
        const direction = e.deltaY > 0 ? 1 : -1
        let nextIndex = currentIndex + (direction * step)

        // Рассчитываем границы (не даем пролистать в пустоту в конце списка)
        const maxIndex = Math.max(0, items.length - visibleCount)

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
            }, scrollDelay)
        }
    }

    return (
        <div className="scroll-wrapper">

            <div className={`scroll-container`}
                 ref={scrollRef}
                 onWheel={handleWheel}
                 // Передаем переменную в CSS для динамического расчета высоты карточек
                 style={{ overflow: "hidden", 
                          ["--visible-count" as any]: visibleCount,
                          ["--items-gap" as any]: itemsGap }}>

                {items.map((item) => (
                    <div key={item.id} 
                         className={`scroll-item`}>

                        {renderItem(item)}
                    </div>
                ))}
            </div>
        </div>
    )
}