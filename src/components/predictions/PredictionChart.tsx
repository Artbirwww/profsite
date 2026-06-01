import { Interface } from "node:readline"
import { PredictionResult } from "../../types/prediction/prediction"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
interface PredictionChartProps {
    data: PredictionResult[]
}
export const PredictionChart = ({data}: PredictionChartProps) => {
    const chartData = data.slice(0, 6).map(item => ({
            name: item.name.length > 25 ? item.name.slice(0, 25) + '...' : item.name,
            fullName: item.name,
            distance: Number(item.distance.toFixed(2)),
            cluster: item.cluster
        }));
    return (
        <div className="chart-container">
            <h3>Распределение профессий по расстоянию</h3>
            <p className="chart-hint">Чем меньше расстояние - тем лучше подходит профессия</p>
            
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" label={{ value: 'Расстояние', position: 'bottom' }} />
                    <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={100}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                        formatter={(value: number) => [`${value}`, 'Расстояние']}
                        labelFormatter={(label) => `Профессия: ${label}`}
                    />
                    <Bar 
                        dataKey="distance" 
                        fill="#8884d8"
                        radius={[0, 4, 4, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

}