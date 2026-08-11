// utils/distanceCategory.ts

export interface DistanceCategory {
    min: number;
    max: number;
    label: string;
    compatibility: number; // percentage
    color: string;
}

export const DISTANCE_CATEGORIES: DistanceCategory[] = [
    { min: 0.0, max: 0.0, label: "Идеальное", compatibility: 100, color: "#10b981" },
    { min: 0.0, max: 0.7, label: "Очень маленькое", compatibility: 90, color: "#34d399" },
    { min: 0.7, max: 1.5, label: "Маленькое", compatibility: 75, color: "#fbbf24" },
    { min: 1.5, max: 2.2, label: "Нижнее среднее", compatibility: 60, color: "#f59e0b" },
    { min: 2.2, max: 3.0, label: "Верхнее среднее", compatibility: 45, color: "#fb923c" },
    { min: 3.0, max: 4.0, label: "Большое", compatibility: 30, color: "#ef4444" },
    { min: 4.0, max: 5.0, label: "Очень большое", compatibility: 15, color: "#dc2626" },
    { min: 5.0, max: Infinity, label: "Экстремальное", compatibility: 5, color: "#991b1b" }
];

export const getDistanceCategory = (distance: number): DistanceCategory => {
    const category = DISTANCE_CATEGORIES.find(
        cat => distance >= cat.min && distance < cat.max
    );
    return category || DISTANCE_CATEGORIES[DISTANCE_CATEGORIES.length - 1];
};

export const getCompatibilityFromDistance = (distance: number): number => {
    const category = getDistanceCategory(distance);
    return category.compatibility;
};

export const getCompatibilityColor = (distance: number): string => {
    const category = getDistanceCategory(distance);
    return category.color;
};

export const getCategoryLabel = (distance: number): string => {
    const category = getDistanceCategory(distance);
    return category.label;
};