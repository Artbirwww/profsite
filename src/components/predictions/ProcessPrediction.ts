import cluster from "cluster"
import { PredictionResult } from "../../types/prediction/prediction"



export const getTopProfessions = (predictionData: any): PredictionResult[] => {
    if (!predictionData) return [];
    
    const professions: PredictionResult[] = [];
    
    for (let i = 2; i <= 9; i++) {
        const profession = predictionData[`K${i}_profession`];
        const distance = predictionData[`K${i}_distance`];
        
        if (profession && distance !== undefined) {
            professions.push({
                name: profession,
                distance: distance,
                cluster: i
            });
        }
    }
    
    // Удаляем дубликаты профессий и оставляем профессии с наименьшей дистанцией из каждого кластера
    const uniqueProfessions = new Map<string, PredictionResult>();
    professions.forEach(prof => {
        const existing = uniqueProfessions.get(prof.name);
        if (!existing || existing.distance > prof.distance) {
            uniqueProfessions.set(prof.name, prof);
        }
    });
    
    // Sort by distance (lower is better) and return all
    return Array.from(uniqueProfessions.values())
        .sort((a, b) => a.distance - b.distance);
};