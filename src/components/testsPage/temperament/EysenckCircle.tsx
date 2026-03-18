import { CSSProperties, FC } from "react"

interface EysenckCircleProps {
    extraversion: number // 0 - 24
    neuroticism: number // 0 - 24
}

export const EysenckCircle: FC<EysenckCircleProps> = ({ extraversion, neuroticism }) => {
    const size = 400
    const center = size / 2
    const padding = 50
    const scale = (center - padding) / 12
    const dotX = center + (extraversion - 12) * scale
    const dotY = center - (neuroticism - 12) * scale

    return (
        <div
            className="eysenck-circle-wrapper">

            <svg
                viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>

                {[4, 8, 12].map(r => (
                    <circle
                        className="inside-circle"
                        key={r} cx={center} cy={center} r={r * scale} strokeWidth={1} />
                ))}

                {/* главные оси */}
                <line
                    className="main-line"
                    x1={padding} y1={center} x2={size - padding} y2={center} strokeWidth={1.5} />

                <line
                    className="main-line"
                    x1={center} y1={padding} x2={center} y2={size - padding} strokeWidth={1.5} />

                {/* подписи шкал */}
                <text
                    x={center} y={padding - 20} textAnchor="middle">
                    Нестабильность
                </text>

                <text
                    x={center} y={size - padding + 35} textAnchor="middle" >
                    Стабильность
                </text>

                <text
                    x={padding - 30} y={center + 5} textAnchor="middle" transform={`rotate(-90, ${padding - 30}, ${center})`} >
                    Интроверсия
                </text>

                <text
                    x={size - padding + 30} y={center + 5} textAnchor="middle" transform={`rotate(90, ${size - padding + 30}, ${center})`} >
                    Экстраверсия
                </text>

                {/* названия темпераментов */}
                <text
                    x={padding} y={padding + 60}>
                    Меланхолик
                </text>

                <text
                    x={size - padding - 80} y={padding + 60}>
                    Холерик
                </text>

                <text
                    x={padding} y={size - padding - 40}>
                    Флегматик
                </text>

                <text
                    x={size - padding - 80} y={size - padding - 40}>
                    Сангвиник
                </text>

                {/* линии-проекции от точки к осям */}
                <line
                    className="projection-line"
                    x1={center} y1={dotY} x2={dotX} y2={dotY} strokeWidth={1} strokeDasharray={4} />

                <line
                    className="projection-line"
                    x1={dotX} y1={center} x2={dotX} y2={dotY} strokeWidth={1} strokeDasharray={4} />

                {/* точка результата */}
                <circle
                    className="result-dot"
                    cx={dotX} cy={dotY} r="5" />

                {/* координаты точки результата */}
                <rect
                    x={dotX - 31} y={dotY + 10} width={60} height={25} rx={12} />
                <text
                    x={dotX} y={dotY + 27} textAnchor="middle" fontSize={11} fontWeight={500} fill="#fff">

                    {extraversion} : {neuroticism}

                </text>
            </svg>

        </div>
    )
}