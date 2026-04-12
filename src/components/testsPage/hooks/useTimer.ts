import { useEffect, useState } from "react"

export const useTimer = (initialSeconds: number, defaultCountDawn:boolean = true) => {
    const [seconds, setSeconds] = useState(initialSeconds)
    const [isAlive, setIsAlive] = useState(false)

    const [countDown, setCountDown] = useState(defaultCountDawn)

    useEffect(() => {
        if (!isAlive) return 
        let interval
        interval = setInterval(() => {
            setSeconds(prev => prev + (countDown ? -1 : +1))
        }, 1000)
        return () => clearInterval(interval)

    }, [isAlive, countDown])
    useEffect(() => {
        if (seconds <= 0) stop()
    }, [seconds])
    const start = () => setIsAlive(true)
    const stop = () => setIsAlive(false)
    const reset = () => setSeconds(initialSeconds)
    const minutes = Math.floor(seconds / 60)
    const remaningSeconds = seconds % 60

    return {seconds, minutes, remaningSeconds, start, stop, reset, setCountDown}
}