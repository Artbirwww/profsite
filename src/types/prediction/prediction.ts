
export interface Prediction {
    id: number
    pupilId: number
    filePath: string
    predictionType: string
    createdAt: string
}
export interface PredictionResult {
    name: string
    distance: number
    cluster: number
}