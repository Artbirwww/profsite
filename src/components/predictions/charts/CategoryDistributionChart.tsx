import { count } from 'console';
import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from 'recharts';
interface CategoryDistributionChartProps {
    categoriesData: any
    currentCluster: number
    setCurrentCluster: (value: number) => void
    clustersCount: number
}
export const CategoryDistributionChart = ({categoriesData, currentCluster, setCurrentCluster, clustersCount} : CategoryDistributionChartProps) => {
    
    const chartData = Object.entries(categoriesData || {})  // Add fallback
        .map(([category, specialists]: [string, any]) => ({
            category: category,
            count: specialists.length,
            dominantSpecialist: specialists.length > 0 
                ? specialists.reduce((min: any, spec: any) => 
                    spec.distance < min.distance ? spec : min,  // Fixed typo: disntace → distance
                    specialists[0]
                  ) 
                : null
        }))
        .filter(item => item.count > 0);

    
         // Color mapping for categories
    const getCategoryColor = (category: string) => {
        const colors = {
            'Идеальное': '#4CAF50',
            'Очень маленькое': '#8BC34A',
            'Маленькое': '#CDDC39',
            'Нижнее среднее': '#FFC107',
            'Верхнее среднее': '#FF9800',
            'Большое': '#FF5722',
            'Очень большое': '#F44336',
            'Экстремальное': '#9C27B0'
            };
            return colors[category] || '#999';
  };
  // Handle cluster change
    const handleClusterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentCluster(Number(e.target.value));
    };
    return (
    <div style={{ width: '100%', height: "400px"}}>
        <h4>Ваш профиль относительно специалистов разных профессий</h4>
        <select 
            name='cluster'
            value={currentCluster}
            onChange={handleClusterChange}
            style={{ padding: '8px 12px', borderRadius: 4, border: '1px solid #ddd' }}
        >
            {Array.from({ length: clustersCount }, (_, i) => i + 2).map(num => (
                <option key={num} value={num}>Кластер {num}</option>
            ))}
        </select>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" label={{ value: 'Количество специалистов', position: 'bottom' }} />
          <YAxis 
            type="category" 
            dataKey="category" 
            width={120}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
                    <strong>{data.category}</strong>
                    <div>Специалистов: {data.count}</div>
                    {data.dominantSpecialist && (
                      <>
                        <div style={{ marginTop: '8px', borderTop: '1px solid #eee', paddingTop: '4px' }}>
                          <strong>Ближайший:</strong>
                          <div>{data.dominantSpecialist.profession}</div>
                          <div>{data.dominantSpecialist.distance.toFixed(2)} ед.</div>
                        </div>
                      </>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
            ))}
            <LabelList dataKey="count" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    {/*Секция для общего вывода*/}
    <div style={{ marginTop: 20, padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
                <h5 style={{ margin: '0 0 8px 0' }}>Ближайшие профессии по категориям</h5>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 8 }}>
                    {chartData.map(item => (
                        <div key={item.category} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                            <span style={{ fontWeight: 'bold', color: getCategoryColor(item.category) }}>
                                {item.category}:
                            </span>
                            <span style={{ flex: 1, marginLeft: 8 }}>
                                {item.dominantSpecialist?.profession?.split(',')[0].length > 15 ? 
                                    item.dominantSpecialist?.profession?.split(',')[0].slice(0,15) : item.dominantSpecialist?.profession?.split(',')[0]}
                            </span>
                            <span style={{ color: '#666' }}>
                                {item.dominantSpecialist?.distance.toFixed(1)} ед.
                            </span>
                        </div>
                    ))}
                </div>
            </div>

    </div>
  );
}
