import { useEffect, useRef, useState } from "react"
import { Prediction } from "../../types/prediction/prediction"
import api from "../../services/api/api"
import { useAuth } from "../../contexts/AuthContext"
import toast, { Toaster } from "react-hot-toast"
import { NoResults } from "../ui/noResultComponent/NoResult"
import "./css/prediction.css"
import { getCategoryLabel, getCompatibilityColor, getCompatibilityFromDistance, getDistanceCategory } 
    from "../../utils/distanceCategory"
import { formatDateTime } from "../../services/dates/formatDate"
import { Button } from "../ui/reusable/button"
import { predictionAPI } from "../../services/api/predictionApi"

export const Predictions = () => {
    const [prediction, setPrediction] = useState<Prediction | null>(null)
    const [loading, setLoading] = useState(true) // Initial load only
    const [isPredicting, setIsPredicting] = useState(false) // Button action only
    const { getToken, getEmail } = useAuth()

    useEffect(() => {
        const getPrediction = async () => {
            try {
                setLoading(true)
                const response = await predictionAPI.getLatestPrediction(getToken())
                setPrediction(response)
            } catch (err) {
                console.error(err)
                setPrediction(null)
                toast.error("Не удалось загрузить результат")
            } finally {
                setLoading(false)
            }
        }
        getPrediction()
    }, [])

    const predict = async () => {
        if (isPredicting || loading) return // Prevent double clicks
        try {
            setIsPredicting(true) // Use the new state here
            const predictionTemp = await predictionAPI.predict(getToken())
            setPrediction(predictionTemp)
            toast.success("Результаты успешно получены!")
        } catch(err) {
            toast.error("Возникла ошибка при подсчете результатов")
        } finally {
            setIsPredicting(false)
        }
    }

    // Only show full-screen loading on initial page load
    if (loading) {
        return <NoResults variant="loading" message="Загрузка результатов..." />
    }

    if (!prediction) {
        return (
            <NoResults 
                variant="empty" 
                message="У вас пока нет результатов" 
                actionText={isPredicting ? "Загрузка..." : "Получить результаты"} 
                onAction={predict}
            />
        )
    }

    const distance = prediction.distance
    const compatibility = getCompatibilityFromDistance(distance)
    const category = getDistanceCategory(distance)
    const categoryLabel = getCategoryLabel(distance)
    const color = getCompatibilityColor(distance)

    return (
        <div className="prediction-results">
            <div className="results-header">
                <h1 className="results-title">Результаты подбора для {getEmail()}</h1>
                <p className="results-subtitle">
                    На основе анализа ваших данных подготовлены следующие рекомендации
                </p>
            </div>

            {/* Prediction Card */}
            <div className="prediction-card">
                <div className="card-header">
                    <Button label="Обновить результат" onClick={() => predict()} />
                </div>

                <div className="card-body">
                    <div className="profession-section">
                        <label className="label">Рекомендуемая профессия</label>
                        <h2 className="profession-name">{prediction.predictedProfession}</h2>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-item">
                            <label className="label">Кластер</label>
                            <div className="stat-value">K{prediction.cluster}</div>
                        </div>

                        <div className="stat-item">
                            <label className="label">Категория дистанции</label>
                            <div className="stat-value" style={{ color }}>
                                {categoryLabel}
                            </div>
                        </div>

                        <div className="stat-item">
                            <label className="label">Дистанция</label>
                            <div className="stat-value">{distance.toFixed(3)}</div>
                        </div>

                        <div className="stat-item">
                            <label className="label">Совместимость</label>
                            <div className="stat-value" style={{ color }}>
                                {compatibility}%
                            </div>
                        </div>
                    </div>

                    {/* Compatibility Bar */}
                    <div className="compatibility-section">
                        <div className="compat-label">
                            <span>Уровень совместимости</span>
                            <span style={{ color }}>{compatibility}%</span>
                        </div>
                        <div className="compat-bar">
                            <div 
                                className="compat-fill" 
                                style={{ 
                                    width: `${compatibility}%`,
                                    background: color
                                }}
                            />
                        </div>
                    </div>

                    {/* Category Description */}
                    <div className="category-info">
                        <div className="info-badge" style={{ background: color }}>
                            {categoryLabel}
                        </div>
                        <span className="info-text">
                            {distance <= 0.7 ? 'Отличный результат! Профессия идеально подходит.' :
                             distance <= 1.5 ? 'Хороший результат. Профессия очень подходит.' :
                             distance <= 2.2 ? 'Средний результат. Профессия подходит.' :
                             distance <= 3.0 ? 'Ниже среднего. Есть более подходящие профессии.' :
                             distance <= 4.0 ? 'Низкая совместимость. Рекомендуется рассмотреть другие варианты.' :
                             'Очень низкая совместимость. Профессия не рекомендуется.'}
                        </span>
                    </div>

                    {/* Distance Scale */}
                    <div className="distance-scale">
                        <div className="scale-labels">
                            <span>Идеально</span>
                            <span>Средне</span>
                            <span>Экстремально</span>
                        </div>
                        <div className="scale-bar">
                            <div 
                                className="scale-marker" 
                                style={{ left: `${Math.min(100, (distance / 5) * 100)}%`}}>
                                ●
                            </div>
                            <div className="scale-gradient">
                                <div className="gradient-section" style={{ background: '#10b981' }} />
                                <div className="gradient-section" style={{ background: '#fbbf24' }} />
                                <div className="gradient-section" style={{ background: '#f59e0b' }} />
                                <div className="gradient-section" style={{ background: '#ef4444' }} />
                                <div className="gradient-section" style={{ background: '#991b1b' }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-footer">
                    <span className="date">
                        {formatDateTime(prediction.createdAt)}
                    </span>
                    <span className="id">ID: {prediction.pupilId}</span>
                </div>
            </div>

            <Toaster position="top-right" />
        </div>
    )
}