import { BelbinBlockProps, BelbinRoleInfoProps, BelbinRoleKey, belbinRoles } from "./GroupRolesQuestion"

// Структура итогового результата роли
export interface BelbinResultsScore extends BelbinRoleInfoProps {
    roleKey: BelbinRoleKey, // Ключ роли
    score: number,          // Суммарный балл
}

// Итоговый рузльтат теста
export interface BelbinResults {
    allRoles: BelbinResultsScore[],        // Все роли, отсортированные по убыванию
    dominationRoles: BelbinResultsScore[], // Топ-3 роли
    isComplete: boolean,                   // Флаг, все ли блоки заполенны верно (по 10 баллов)
}

// Процесс обработки теста Белбина
export const BelbinTestProcess = (blocks: BelbinBlockProps[], userAnswers: Record<string, number>): BelbinResults => {

    // Инициализация счетчиков баллов для каждой роли
    const roleScores: Record<BelbinRoleKey, number> = {
        implementer: 0,
        coordinator: 0,
        shaper: 0,
        plant: 0,
        monitor: 0,
        investigator: 0,
        teamworker: 0,
        completer: 0,
    }

    let validBlocksCount = 0

    // Сбор баллов по ролям и проверка валидности блоков
    blocks.forEach((block) => {
        let blockSum = 0

        block.options.forEach((option) => {
            const points = userAnswers[option.id] || 0
            roleScores[option.role] += points
            blockSum += points
        })

        // Блок считается валидным, если сумма баллов в нем ровно 10
        if (blockSum === 10) validBlocksCount++
    })

    // Формирование итогового списка ролей с описаниями
    const allRoles: BelbinResultsScore[] = (Object.keys(roleScores) as BelbinRoleKey[])
        .map((key) => ({
            roleKey: key,
            name: belbinRoles[key].name,
            description: belbinRoles[key].description,
            score: roleScores[key],
        }))

        // Сортировка: роли с наибольшим количеством баллов идут первыми
        .sort((a, b) => b.score - a.score)

    return {
        allRoles,
        dominationRoles: allRoles.slice(0, 3),
        isComplete: validBlocksCount === blocks.length,
    }
}



/**
 * Пример использования в будущем
 * 
 *  import { belbinBlocks } from './GroupRolesQuestion'
    import { BelbinTestProcess } from './GroupRolesProcess'

    // Эмуляция ответов пользователя для одного блока
    // Допустим, в 1-м блоке пользователь распределил 10 баллов так:
    const userAnswers: Record<string, number> = {
        "belbin1-1": 5, // Исследователь ресурсов +5
        "belbin1-3": 3, // Генератор идей +3
        "belbin1-5": 2, // Исполнитель +2
        // Остальные вопросы этого блока по умолчанию 0
    }

    // Запуск основного процесса обработки (когда все 7 блоков заполнены)
    const results = BelbinTestProcess(belbinBlocks, userAnswers)

    // Вывод результата
    if (results.isComplete) {
        console.log("--- РЕЗУЛЬТАТЫ ТЕСТА БЕЛБИНА ---")
        
        console.log("Твоя главная роль:")
        const topRole = results.dominantRoles[0]
        console.log(`${topRole.name}: ${topRole.score} баллов.`)
        console.log(`Описание: ${topRole.description}`)

        console.log("\nТоп-3 роли в команде:")
        results.dominantRoles.forEach((res, index) => {
            console.log(`${index + 1}. ${res.name} (${res.score} б.)`)
        })
    } else {
        console.log("Тест не завершен: не все блоки содержат по 10 баллов.")
    }
 */