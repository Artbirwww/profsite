import { useEffect, useState } from "react"
import { Prediction, PredictionResult } from "../../types/prediction/prediction"
import api from "../../services/api/api"
import { pupilApi } from "../../services/api/pupilApi"
import { useAuth } from "../../contexts/AuthContext"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { predictionAPI } from "../../services/api/predictionApi"
import { getTopProfessions } from "./ProcessPrediction"
import { PredictionChart } from "./PredictionChart"
import "./css/prediction.css"
import { NoResults, Status } from "../ui/noResultComponent/NoResult"
export const Predictions = () => {
    const [prediction, setPrediction] = useState<Prediction>()
    const [results, setResult] = useState<PredictionResult[]>()
    const {getToken, getEmail} = useAuth()
    const [status, setStatus] = useState<Status>("loading")
    useEffect(() => {
        const getPredictions = async () => {
            try {
                //Загружаем все результаты для студента и берем самый ранний
                const predictionsTemp = await pupilApi.getPupilPrediction(getToken())
                if (predictionsTemp.length === 0) {
                    setStatus("empty")
                    return
                }
                const recentPrediction = predictionsTemp.sort((a, b) => 
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
                
                
                setPrediction(recentPrediction)
                
            } catch(err) {
                console.error(err)
                setStatus("empty")
                toast.error("Возникла ошибка при загрузке результатов")
            }
        }
        getPredictions()
    }, [])
    useEffect(() => {
        if (!prediction) return
        //подгружаем файл из результатов
        const getPredictionJson = async () => {
            try {
                const recentPredictionJson =  await predictionAPI.getPredictionJson(prediction.filePath)
                if (recentPredictionJson === null) {
                    setStatus("empty")
                    return
                }
                console.log("res", recentPredictionJson)
                setStatus("success")
                setResult(getTopProfessions(recentPredictionJson))
            } catch(err) {
                console.error(err)
                toast.error("Ошибка при загрузке результатов")
                setStatus("empty")
            }
        }
        getPredictionJson()
    }, [prediction])
    if (status === "empty") 
        return <NoResults variant={status} message="У вас пока нет результатов"/>
    if (status === "loading" || !results) 
        return (<> <NoResults variant={status} message="Ищем ваши результаты" title="Поиск"/>
    </>)
    
    return (
        <div className="prediction-results">
            <div className="results-header">
                <h1 className="results-title">Результаты подбора для {`${getEmail()}`}</h1>
                <p className="results-subtitle">
                    На основе анализа ваших данных подготовлены следующие рекомендации
                </p>
            </div>

            {/* Top 3 Cards */}
            <div className="top-section">
                <h2 className="section-title">Основные рекомендации</h2>
                <div className="cards-grid">
                    {results.map((prof, index) => (
                        <div key={index} className={`card card-${index + 1}`}>
                            <div className="card-rank">{index + 1}</div>
                            <h3 className="card-title">{prof.name}</h3>
                            <div className="card-stats">
                                <div className="stat">
                                    <span className="stat-label">Совместимость</span>
                                    <span className="stat-value">
                                        {Math.min(99, Math.round((1 / prof.distance) * 100))}%
                                    </span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Кластер</span>
                                    <span className="stat-value">K{prof.cluster}</span>
                                </div>
                            </div>
                            <div className="card-progress">
                                <div 
                                    className="progress-bar"
                                    style={{ 
                                        width: `${Math.min(100, Math.round((1 / prof.distance) * 100))}%` 
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chart Section */}
            <div className="chart-section">
                <h2 className="section-title">Визуализация</h2>
                <div className="chart-container">
                    <PredictionChart data={results} />
                </div>
            </div>

            {/* Full List */}
            <div className="list-section">
                <h2 className="section-title">Все профессии</h2>
                <div className="table-container">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Профессия</th>
                                <th>Совместимость</th>
                                <th>Кластер</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((prof, index) => (
                                <tr key={index} className={index < 3 ? 'highlight' : ''}>
                                    <td className="rank">{index + 1}</td>
                                    <td className="profession">{prof.name}</td>
                                    <td className="compatibility">
                                        <div className="compat-bar">
                                            <div 
                                                className="compat-fill"
                                                style={{ 
                                                    width: `${Math.min(100, Math.round((1 / prof.distance) * 100))}%` 
                                                }}
                                            />
                                        </div>
                                        <span className="compat-value">
                                            {Math.min(99, Math.round((1 / prof.distance) * 100))}%
                                        </span>
                                    </td>
                                    <td className="cluster">K{prof.cluster}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Toaster position="top-right" />
        </div>
    );
}