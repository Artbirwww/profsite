import { FC } from "react"
import { temeperamentParamLabels, TemperamentParam } from "./temperamentData"

interface ScaleProps {
    name: string
    label: string
    value: number
}

export const ProgressBar: FC<ScaleProps> = ({ name, label, value }) => {
    const isSincerity = name === "sincerity_score"
    const max = isSincerity ? 9 : 24

    const getStatus = (val: number) => {
        if (isSincerity)
            return val <= 4
                ? { text: "Достоверный результат", className: "status-ok" }
                : { text: "Недостоверный результат", className: "status-critical" }

        if (val <= 7)
            return { text: "Низкий уровень", className: "status-critical" }

        if (val <= 16)
            return { text: "Средний уровень", className: "status-warn" }

        return { text: "Высокий уровень", className: "status-ok" }
    }

    const status = getStatus(value)
    const percentage = Math.min((value / max) * 100, 100)

    return (
        <div
            className="eysenck-scales-container">

            <div
                className="scale-status">

                <p><span>{(value).toString().padStart(2, "0")}</span> из <span>{(max).toString().padStart(2, "0")}</span></p>

            </div>

            <div
                className="eysenck-scales-text">

                <div
                    className="scales-status-label">

                    <p><span>{label} </span> <span className={`${status.className}`}>({status.text})</span></p>

                </div>

                <div
                    className="eysenck-scales-progress-bar-container">

                    <div
                        className={`eysenck-scales-progress-bar ${status.className}`}
                        style={{ width: `${percentage}%` }}>
                    </div>

                </div>


            </div>

        </div>
    )
}

export const EysenckScales = ({ params }: { params: { name: string, param: number }[] }) => {
    const order: TemperamentParam[] = [
        "extrav_introver_score",
        "neirotizm_score",
        "sincerity_score",
    ]

    const sortedParams = [...params].sort((a, b) => {
        return order.indexOf(a.name as TemperamentParam) - order.indexOf(b.name as TemperamentParam)
    })

    return (
        <div
            className="eysenck-scales-wrapper">

            {sortedParams.map((p) => (
                <ProgressBar
                    key={p.name}
                    name={p.name}
                    label={temeperamentParamLabels[p.name as TemperamentParam] || p.name}
                    value={p.param} />
            ))}

        </div>
    )
}