import { Temporal } from "@js-temporal/polyfill"
//usage formatDateRU("01-25-2025") -> '25.01.2025 00:00:00'
export const formatDateRU = (dateStr: string | undefined) => {
    if (!dateStr) return "Дата не найдена"
    const date = new Date(dateStr)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
}
//usage "01-25-2026", false -> "01-25-2026 00:00:00"
export const formatDateToDateTime = (dateStr: string, isEndOfDay: boolean = false) => {
    const date = Temporal.PlainDate.from(dateStr)
    const time = isEndOfDay ? "23:59:59" : "00:00:00"
    return `${date.toString()}T${time}`
}