import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { WheelEvent } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Button } from "../../../ui/reusable/button"
import "./constantSumSlider.css"
export interface SliderData {
    id: number
    text: string
    value: number
    min: number
    max: number
}
interface ConstantSumSliderProps {
    sliders: SliderData[] // data for each slider
    setSliders: Dispatch<SetStateAction<SliderData[]>>
    maxValue: number // max value that can be exceed abouve when use slider 
    nextPage: (step: number) => void
}
export const ConstantSumSlider = ({ sliders, setSliders, maxValue, nextPage }: ConstantSumSliderProps) => {
    const [totalValue, setTotalValue] = useState(0)
    const [isLocked, setIsLocked] = useState(false)
    //При переходе назад помогает показать заполненные очки (в новых 0)
    useEffect(() => {
        console.log(sliders.reduce((value, slider) => {
            return value + slider.value
        }, 0))
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
        setTotalValue(0)
        nextPage(1)
    }
    return (<>
        <div className="constant-sum-slider-card">
            <p>Распределено баллов: {totalValue} / 10</p>

            <div className="constant-sum-slider-wrapper">
                {sliders.map(slider => (
                    <div key={slider.id} className="constant-sum-slider-item">

                        <p>{slider.text}</p>

                        <div className="constant-sum-slider-input-container">
                            <input
                                className="input-slider"
                                type="range"
                                min={slider.min}
                                max={slider.max}
                                value={slider.value}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { handleSliderScroll(parseInt(e.target.value), slider) }}
                                onWheel={handleWheel} />

                            <p>{slider.value}</p>
                        </div>

                    </div>
                ))}
            </div>
            <div className="buttons-options">
                <Button buttonLabel={"Назад"} buttonFunction={() => {nextPage(-1)}} />
                <Button buttonLabel={"Далее"} buttonFunction={nextPageHandler} />
            </div>
            
        </div>
        <Toaster />
    </>)
}