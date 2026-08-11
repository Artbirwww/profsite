export interface PredictionResponse {
    pupilId: number;
    cluster: number;
    predictedProfession: string;
    nearestSpecialistId: number;
    distance: number;
    confidenceCategory: string;
}

export interface Prediction {
    id: number;
    pupilId: number;
    cluster: number;
    predictedProfession: string;
    nearestSpecialistId: number;
    distance: number;
    confidenceCategory: string;
    createdAt: string;
}