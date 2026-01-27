import "./css/tests-style.css"

import React, { FC, useCallback, useEffect, useState } from "react"
import { GraduationCap, Info } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../ui/reusable/button"
import { testsList, TestsItem } from "./testsData"
import { ProgressBar } from "../../ui/reusable/progressBar"
import { useAuth } from "../../../contexts/AuthContext"
import { pupilApi } from "../../../services/api/pupilApi"

const TestsItemComponent: FC<{ item: TestsItem, onClick: (path: string) => void }> = ({ item, onClick }) => {
    const handleClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        onClick(item.path)
    }, [item.path, onClick]) 
    
    return (
        <div className={`tests-item-container`} >
            <div className="test-item-icon-container" data-item={item.dataItem}>{item.icon}</div>
            <div className="test-item-label">{item.label}</div>
            <div className="test-item-description">{item.description}</div>
            <div className="test-item-button"><Button buttonLabel={"Начать тест"} buttonFunction={handleClick}/></div>
        </div>
    )
}

export const Tests = () => {
    const navigate = useNavigate()

    const { getToken } = useAuth()

    const [userName, setUserName] = useState("")

    const [completedCount, setCompletedCount] = useState(3)

    const totalCount = testsList.length

    useEffect(() => {
        const getUserName = async () => {
            try {
                const token = getToken()

                if (!token) {
                    setUserName("blank user")
                    return
                }

                const pupilData = await pupilApi.getPupilData(token)
                setUserName(`${pupilData.pupilDTO.name} ${pupilData.pupilDTO.surname}`)

            } catch (error) {
                console.error("Failed load user data:", error)
                setUserName("blank user")
            }
        }

        getUserName()
    }, [getToken])

    const handleItemClick = useCallback((path: string) => {
        navigate(path)
    }, [navigate])

    return (
        <div className="tests-base">
            <div className="tests-header-container">
                <div className="tests-header-info">
                    <div className="tests-header-icon"><GraduationCap size={24}/></div>
                    <div className="tests-header-title">
                        <div className="tests-header-label">Пройти тесты</div>
                        <div className="tests-header-user-name">{userName}</div>
                    </div>
                </div>
                <div className="tests-header-progressbar">
                    <div className="tests-progressbar-label">Ваш прогресс прохождения тестов</div>
                    <div className="tests-progressbar-count"><span>{completedCount}</span> из <span>{totalCount}</span></div>
                    <ProgressBar value={completedCount} max={totalCount}/>
                </div>
            </div>

            <div className="tests-description-container">
                <div className="tests-description-icon"><Info size={18}/></div>
                <div className="tests-description"><p>Для получения полных результатов необходимо пройти все 5 групп тестирования. Каждая группа содержит 5 вопросов. После прохождения группы она станет недоступной, и вы вернётесь в личный кабинет. Как только вы завершите все группы, вы автоматически перейдёте к результатам.</p></div>
            </div>

            <div className="tests-options">{testsList.map((item) => (<TestsItemComponent key={item.id} item={item} onClick={handleItemClick} />))}</div>
        </div>
    )
}
