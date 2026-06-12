import { count } from "console"
import { useMemo } from "react"
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell, CartesianAxis, CartesianGrid} from 'recharts';
const UserMarker = (props) => {
    const { cx, cy } = props;
    
    return (
        <g>
            {/* Radar/ping effect */}
            <circle cx={cx} cy={cy} r={16} fill="none" stroke="#2196F3" strokeWidth={1.5}>
                <animate attributeName="r" values="12;24" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="strokeOpacity" values="0.8;0" dur="1.5s" repeatCount="indefinite" />
            </circle>
            
            {/* Shadow/glow */}
            <circle cx={cx} cy={cy} r={10} fill="rgba(33, 150, 243, 0.3)" />
            
            {/* Main marker */}
            <circle cx={cx} cy={cy} r={8} fill="#2196F3" stroke="white" strokeWidth={2.5} />
            
            {/* Inner dot */}
            <circle cx={cx} cy={cy} r={3} fill="white" />
        </g>
    );
};
interface BubbleDistanceChartProps {
    categories: any
}
export const BubbleDistanceChart = ({categories} : BubbleDistanceChartProps) => {
    
const data = useMemo(() => {
    const specialistsTotal = Object.values(categories || {})
        .flatMap((specialists) => Array.isArray(specialists) ? specialists : []);
    
    if (specialistsTotal.length === 0) return [];
    
    const distances = specialistsTotal.map(s => s.distance);
    const minDistance = Math.min(...distances);
    const maxDistance = Math.max(...distances);
    const distanceRange = maxDistance - minDistance;
    //Используем полярную систему координат
    // Get unique categories
    const categoryKeys = Object.keys(categories);
    const categoriesCount = categoryKeys.length;
    
    return specialistsTotal.map((spec) => {
        // Find which category this specialist belongs to
        const categoryIndex = categoryKeys.findIndex(key => 
            categories[key].some(s => s.spec_id === spec.spec_id)
        );
        
        // Calculate angle based on category (spread evenly around circle)
        const angleByCategory = (categoryIndex / categoriesCount) * Math.PI * 2;
        
        // Add small random offset within category (±0.3 radians ≈ ±17 degrees)
        const randomOffset = (Math.random() - 0.5) * 0.6;
        const finalAngle = angleByCategory + randomOffset;
        
        // По факту определяем расстояние учитывая наименьшее и наибольшее из расстояний (как бы по отношению к min max)
        // Calculate radius: closer distance = smaller radius (near center)
        // Normalize distance: 0 = closest, 1 = farthest
        const normalizedDistance = (spec.distance - minDistance) / (distanceRange || 1);
        
        // Radius scale: closest at radius 1, farthest at radius 10
        const radius = 1 + normalizedDistance * 9;
        
        //Если радиус (расстояния от 0.0 до специалиста) маленькое, 
        // то круг больше формула инверсит маленькость в большость =)
        // Bubble size: inverse relationship (closer = bigger)
        const bubbleSize = 80 + (1 - normalizedDistance) * 320; // Range: 80 to 400
        
        // Calculate X, Y coordinates
        const x = Math.cos(finalAngle) * radius;
        const y = Math.sin(finalAngle) * radius;
        
        return {
            name: spec.profession,
            category: categoryKeys[categoryIndex],
            distance: spec.distance,
            x: x,
            y: y,
            z: Math.max(60, Math.min(400, bubbleSize)),
            isClosest: spec.distance === minDistance,
            isFarthest: spec.distance === maxDistance,
            type: 'specialist'
        };
    });
}, [categories]);
    
    // Color mapping by category
    const getCategoryColor = (category) => {
        const colors = {
            'Идеальное': '#4CAF50',
            'Очень маленькое': '#8BC34A',
            'Маленькое': '#CDDC39',
            'Нижнее среднее': '#FFC107',
            'Верхнее среднее': '#FF9800',
            'Большое': '#FF5722',
            'Очень большое': '#ff9891',
            'Экстремальное': '#9C27B0'
        };
        return colors[category] || '#8884d8';
    };
    
    if (data.length === 0) {
        return <div style={{ padding: 40, textAlign: 'center' }}>Нет данных</div>;
    }
    
    return (
        <div style={{ width: '100%', height: 500 }}>
            <ResponsiveContainer>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid stroke="#b8b8b8" strokeDasharray="5 5" />
                    <XAxis type="number" dataKey="x" domain={[-12, 12]} hide />
                    <YAxis type="number" dataKey="y" domain={[-12, 12]} hide />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} />
                    <Tooltip
                        content={({ active, payload }) => {
                            
                            if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                // Skip tooltip for user marker
                                if (data.type === 'user') {
                                    return (<div style={{ background: 'white', padding: 10, border: '1px solid #ccc', borderRadius: 4 }}>
                                        <strong>{data.name}</strong>
                                        <div>Стартовая точка 0:0</div>
                                    </div>)
                                }
                                return (
                                    <div style={{ background: 'white', padding: 10, border: '1px solid #ccc', borderRadius: 4 }}>
                                        <strong>{data.name}</strong>
                                        <div>📏 Расстояние: {data.distance.toFixed(2)} ед.</div>
                                        <div>📁 Категория: {data.category}</div>
                                        {data.isClosest && <div>🟢 Ближайший к вам!</div>}
                                        {data.isFarthest && <div>🔴 Самый дальний</div>}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Scatter 
                        data={data} 
                        fill="#8884d8"
                        shape="circle">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
                        ))}
                        
                    </Scatter>
                    {/* User marker at center (0,0) */}
                    <Scatter 
                        data={[{ 
                            x: 0, 
                            y: 0, 
                            type: 'user',
                            name: 'Вы'
                        }]} 
                        fill="#2196F3"
                        shape={<UserMarker />}
                    />
                </ScatterChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: '#666' }}>
                ● Вы в центре | Размер круга = близость к вам (чем ближе, тем больше круг) | Цвет = категория
            </div>
        </div>
    );
};