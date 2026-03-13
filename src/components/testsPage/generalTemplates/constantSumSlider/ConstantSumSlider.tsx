import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { WheelEvent } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Button } from "../../../ui/reusable/button"
import { ProgressBar } from "../progressBar/ProgressBar"

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
            setIsLocked(true)
            return
        }

        const slidersTemp = sliders.map(slider => {
            if (slider.id === sliderScrolled.id) {
                return { ...sliderScrolled, value: value }
            }

            return slider
        })

        //setTotalValue(totalValueNew)
        setSliders(slidersTemp)
        setIsLocked(false)

    }

    const nextPageHandler = () => {
        if (totalValue !== maxValue) {
            toast(`Пожалуйста наберите ${maxValue} баллов`)
            return
        }
        //setTotal(sliders.length)
        //setCurrentNumber(currentGroupNumber + 1)
        setTotalValue(0)
        nextPage(1)
    }

    return (<>
        <span>Распределено баллов: {totalValue} / 10</span>
        <div>
            <ProgressBar currentTaskNumber={currentGroupNumber} total={7} />

            <div
                className="test-grid-template-1">
                {sliders.map(slider => (

                    <div
                        key={slider.id}
                        className="test-card test-card-height-155">

                        <span>{slider.text}</span>

                        <div
                            className="test-card-input">

                            <input
                                className="input-slider"
                                type="range"
                                min={slider.min}
                                max={slider.max}
                                value={slider.value}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { handleSliderScroll(parseInt(e.target.value), slider) }}
                                onWheel={handleWheel} />

                            <span>{slider.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div
            className="test-card-options">

            <Button
                buttonLabel={"Назад"}
                buttonFunction={() => { nextPage(-1) }} />

            <Button
                buttonLabel={"Далее"}
                buttonFunction={nextPageHandler} />
        </div>

        <Toaster />
    </>)
}