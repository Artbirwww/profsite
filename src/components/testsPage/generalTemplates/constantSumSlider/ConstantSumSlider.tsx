import toast, { Toaster } from "react-hot-toast"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { WheelEvent } from "react"
import { Button } from "../../../ui/reusable/button"
import { ProgressBar } from "../progressBar/ProgressBar"
import { ArrowLeft, ChevronUp, ChevronDown } from "lucide-react"

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

    return (
        <div className="test-card constant-sum-slider">

            <div className="test-card-info">
                <div className="test-card-back" onClick={() => { nextPage(-1) }}>
                    <ArrowLeft size={20} />
                </div>

                <div className="test-card-count">
                    {/* TODO: Вместо 7 здесь надо подсасывать кол-во вопросов */}
                    <p><span>Вопрос</span> <span>{(currentGroupNumber + 1).toString().padStart(2, "0")}</span> из <span>{(7).toString().padStart(2, "0")}</span></p>
                </div>

                <div className="test-card-count">
                    {/* TODO: Вместо 10 здесь надо подсасывать максимальное кол-во баллов для распределения */}
                    {sliders.reduce((total, slider) => total + slider.value, 0) > maxValue ? 
                    <p style={{color: "red"}}><span >Распределено</span> <span>{(totalValue).toString().padStart(2, "0")}</span> из <span>{(10).toString().padStart(2, "0")}</span></p> :
                    <p><span>Распределено</span> <span>{(totalValue).toString().padStart(2, "0")}</span> из <span>{(10).toString().padStart(2, "0")}</span></p>}
                </div>
            </div>

            <div className="test-slider-grid" ref={gridRef}>
                {sliders.map(slider => (
                    <div key={slider.id} className="test-grid-item">
                        <div className="test-card-text">
                            <div className="input-slider-count">{slider?.value}</div>
                            {slider?.text}
                        </div>

                        <div className="test-card-input">
                            <input
                                className="input-slider"
                                type="range"
                                min={slider.min}
                                max={slider.max}
                                value={slider.value}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { handleSliderScroll(parseInt(e.target.value), slider) }}
                                onWheel={handleWheel} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="test-card-options">
                <Button
                    buttonLabel={"Далее"}
                    buttonFunction={nextPageHandler} />
            </div>

            {/* TODO: Вместо 7 здесь надо подсасывать кол-во вопросов */}
            <ProgressBar currentTaskNumber={currentGroupNumber} total={7} />

            <Toaster />

        </div>
    )
}