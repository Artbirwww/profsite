import { DetailedCategory, EPIScale, QuestionProps, temperamentTypes } from "./EPIQuestions"

// Структура итогового результата
export interface EPIResults {
    temperament: typeof temperamentTypes.choleric,               // Темперамент
    scores: Record<EPIScale, number>,                            // Сырые баллы
    detailedScores: Partial<Record<DetailedCategory, number>>,   // Баллы по подкатегориям
    normalizedTraits: Partial<Record<DetailedCategory, number>>, // Процент выражености черты (0 - 100%)
    isLie: boolean,                                              // Флаг достоверности
}

// Процесс обработки теста EPI
export const EPITestProcess = (questions: QuestionProps[], userAnswers: Record<number, boolean>): EPIResults => {

    // Инициализация счетчиков
    const scores: Record<EPIScale, number> = { Extraversion: 0, Neuroticism: 0, Lie: 0 }
    const detailedScores: Partial<Record<DetailedCategory, number>> = {}
    const categoryTotalQuestions: Partial<Record<DetailedCategory, number>> = {}

    // Сбор сырых баллов и подсчет общего кол-ва вопросов в каждой категории
    questions.forEach((q) => {

        // Считаем, сколько всего вопросов в каждой категории (для нормализации)
        categoryTotalQuestions[q.category] = (categoryTotalQuestions[q.category] || 0) + 1

        // Если ответ пользователя слвпадает с ключом к баллу
        const userAnswer = userAnswers[q.id]
        if (userAnswer === q.pointsForYes) {
            scores[q.scale]++
            detailedScores[q.category] = (detailedScores[q.category] || 0) + 1
        }
    })

    // Нормализация (Перевод в проценты 0-100%)
    const normalizedTraits: Partial<Record<DetailedCategory, number>> = {};
    (Object.keys(categoryTotalQuestions) as DetailedCategory[]).forEach((cat) => {
        const earned = detailedScores[cat] || 0
        const total = categoryTotalQuestions[cat] || 1
        normalizedTraits[cat] = Math.round((earned / total) * 100)
    })

    // Определение типа темперамента (Классическая матрица Айзенка)
    // Порог разделения - 12 баллов из 24 возможных
    let typeKey: keyof typeof temperamentTypes

    const isExtravert = scores.Extraversion >= 12
    const isHighNeurotic = scores.Neuroticism >= 12

    if (isExtravert && isHighNeurotic) {
        typeKey = "choleric"                        // Экстраверт + Эмоционально нестабильный
    } else if (isExtravert && !isHighNeurotic) {
        typeKey = "sanguine"                        // Экстраверт + Эмоционально стабильный
    } else if (!isExtravert && isHighNeurotic) {
        typeKey = "melancholic"                     // Интроверт + Эмоционально нестабильный
    } else {
        typeKey = "phlegmatic"                      // Интроверт + Эмоционально стабильный
    }

    // Проверка шкалы лжи (достоверность результата)
    // В EPI значение 4-5 и выше считается критическим
    const isLie = scores.Lie > 4

    return {
        temperament: temperamentTypes[typeKey],
        scores,
        detailedScores,
        normalizedTraits,
        isLie,
    }
}



/**
 * Пример использования в будущем
 * 
 *  import { EPITestProcess } from './EPIProcess'
    import { epiFormA, epiFormB } from './EPIQuestions'

    // Имитируем ответы пользователя (id вопроса: ответ)
    const userAnswers = {
        1: true,
        2: false,
        3: true,
        // ... и так далее для всех 57 вопросов
    }

    // Запускаем обработку
    const results = EPITestProcess(questions, userAnswers)

    // Используем результат
    if (results.isLie) {
        console.warn("Результаты могут быть недостоверны (высокий показатель по шкале лжи)")
    }

    console.log(`Ваш темперамент: ${results.temperament.title}`)
    console.log(`Экстраверсия: ${results.scores.Extraversion} из 24`)
    console.log(`Нейротизм: ${results.scores.Neuroticism} из 24`)

    // Пример вывода детальной черты в %
    console.log(`Уровень общительности: ${results.normalizedTraits.Sociability}%`)
 */