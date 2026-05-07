import toast, { Toaster } from "react-hot-toast"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { WheelEvent } from "react"
import { Button } from "../../../ui/reusable/button"
import { ProgressBar } from "../progressBar/ProgressBar"
import { ArrowLeft, ChevronUp, ChevronDown, ArrowRight, CheckCheck } from "lucide-react"

export interface SliderData {
    id: number
    text: string
    value: number
    min: number
    max: number
}

interface ConstantSumSliderProps {
    sliders: SliderData[]
    setSliders: Dispatch<SetStateAction<SliderData[]>>
    currentGroupNumber: number
    maxValue: number
    nextPage: (step: number) => void
}

export const ConstantSumSlider = ({ sliders, setSliders, currentGroupNumber, maxValue, nextPage }: ConstantSumSliderProps) => {
    const [totalValue, setTotalValue] = useState(0)
    const [isLocked, setIsLocked] = useState(false)

    const gridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (gridRef.current) {
            gridRef.current.scrollTop = 0
        }
    }, [currentGroupNumber])

    //При переходе назад помогает показать заполненные очки (в новых 0)
    useEffect(() => {
        setTotalValue(sliders.reduce((value, slider) => {

            return value + slider.value
        }, 0))
    }, [sliders])

    const handleWheel = (e: WheelEvent<HTMLInputElement>) => {
        if (isLocked) {
            e.preventDefault()
            toast.error("Выбрано максимальное кол-во баллов")
            setIsLocked(false)
        }
    }

    const handleSliderScroll = (value: number, sliderScrolled: SliderData) => {
        const totalValueCurrent = sliders.reduce((total, slider) => total + slider.value, 0)
        const totalValueNew = totalValueCurrent + value - sliderScrolled.value

        if (totalValueNew > maxValue) {
            //setIsLocked(true)
            //return
        }

        const slidersTemp = sliders.map(slider => {
            if (slider.id === sliderScrolled.id) {
                return { ...sliderScrolled, value: value }
            }

            return slider
        })

        setSliders(slidersTemp)
        //setIsLocked(false)

    }

    const nextPageHandler = () => {
        if (totalValue !== maxValue) {
            toast(`Наберите ровно ${maxValue} баллов`)
            return
        }
        setTotalValue(0)
        nextPage(1)
    }

    const currentTotal = sliders.reduce((sum, s) => sum + s.value, 0)


    return (
        <div className="test-card constant-sum-slider">
            <div className="test-card-info">
                <div className="test-card-count">
                    {/* TODO: Вместо 7 здесь надо подсасывать кол-во вопросов */}
                    {currentGroupNumber + 1} из 7
                </div>

                <div className="test-card-count" style={{ color: currentTotal > maxValue ? "#f03063" : currentTotal === maxValue ? "#55d38e" : "" }}>
                    {/* TODO: Вместо 10 здесь надо подсасывать максимальное кол-во баллов для распределения */}
                    {totalValue} из 10
                </div>
            </div>

            <div className="test-slider-grid" ref={gridRef}>
                {sliders.map(slider => {
                    const progress = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;

                    return (
                        <div key={slider.id} className="test-grid-item">
                            
                            <div className="test-card-text">{slider?.text}</div>

                            <div className="test-card-input">
                                <input
                                    className="input-slider"
                                    type="range"
                                    min={slider.min}
                                    max={slider.max}
                                    value={slider.value}
                                    style={{ '--progress': `${progress}%` } as React.CSSProperties}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        handleSliderScroll(parseInt(e.target.value), slider)
                                    }}
                                    onWheel={handleWheel}
                                />
                                <div className="slider-labels">
                                    <span>0</span>
                                    <span>5</span>
                                    <span>10</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="test-card-options">
                <Button label={"Назад"} variant="secondary" icon={<ArrowLeft />} disabled={currentGroupNumber === 0} onClick={() => { nextPage(-1) }} />
                
                {currentGroupNumber === 6 ? (
                    <Button label={"Завершить"} icon={<CheckCheck />} onClick={nextPageHandler} />
                ) : (
                    <Button label={"Далее"} icon={<ArrowRight />} onClick={nextPageHandler} />
                )}
            </div>

            {/* TODO: Вместо 7 здесь надо подсасывать кол-во вопросов */}
            <ProgressBar currentTaskNumber={currentGroupNumber} total={7} />

            <Toaster />
        </div >
    )
}