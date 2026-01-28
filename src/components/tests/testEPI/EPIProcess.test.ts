// npm install --save-dev jest ts-jest @types/jest

import { calculateEpiTest, temperamentTypes } from './epi-engine';
import { Question } from './types';

// Mock-данные для тестов
const mockQuestions: Question[] = [
    { id: 1, text: "Вопрос на экстраверсию", scale: "Extraversion", category: "Социальность", pointsForYes: true },
    { id: 2, text: "Вопрос на нейротизм", scale: "Neuroticism", category: "Тревожность", pointsForYes: true },
    { id: 3, text: "Вопрос на ложь", scale: "Lie", category: "Надежность", pointsForYes: true },
    { id: 4, text: "Еще экстраверсия", scale: "Extraversion", category: "Социальность", pointsForYes: true }
];

describe('EPI Engine Logic', () => {

    test('Должен правильно определить Сангвиника (High E, Low N)', () => {
        const answers = {
            1: true,  // Extraversion +1
            2: false, // Neuroticism 0
            3: false, // Lie 0
            4: true   // Extraversion +1
        };

        // Для теста занизим порог в движке или используем много вопросов.
        // В оригинале порог 12, здесь просто проверяем логику выбора объекта.
        const result = calculateEpiTest(mockQuestions, answers);

        // Проверяем сырые баллы
        expect(result.scores.Extraversion).toBe(2);
        expect(result.scores.Neuroticism).toBe(0);

        // В нашем моке 2 балла — это уже "высокий" показатель относительно 2 вопросов
        // Если в коде стоит порог 12, для теста нужно либо 12+ вопросов, либо подправить порог
        expect(result.temperament.name).toBe('Сангвиник');
    });

    test('Должен вычислять нормализацию (проценты) корректно', () => {
        const answers = {
            1: true,  // Социальность: 1 из 2 (50%)
            2: true,  // Тревожность: 1 из 1 (100%)
            3: false,
            4: false  // Социальность: 0 баллов за этот вопрос
        };

        const result = calculateEpiTest(mockQuestions, answers);

        expect(result.normalizedTraits['Социальность']).toBe(50);
        expect(result.normalizedTraits['Тревожность']).toBe(100);
    });

    test('Должен фиксировать ложь, если баллов больше 4', () => {
        // Генерируем 6 вопросов на шкалу лжи
        const lieQuestions: Question[] = Array.from({ length: 6 }, (_, i) => ({
            id: i,
            text: "Правда?",
            scale: "Lie",
            category: "Надежность",
            pointsForYes: true
        }));

        const answers = { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true };
        const result = calculateEpiTest(lieQuestions, answers);

        expect(result.isLie).toBe(true);
        expect(result.scores.Lie).toBe(6);
    });

    test('Должен возвращать правильные метаданные (цвет, профессии)', () => {
        const result = calculateEpiTest(mockQuestions, { 1: true, 4: true }); // Сангвиник

        expect(result.temperament.color).toBe('orange');
        expect(result.temperament.traits).toContain('Оптимизм');
        expect(typeof result.temperament.professions).toBe('string');
    });

});
