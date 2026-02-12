import "../css/tests-style.css"

import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../ui/reusable/button"
import { testsList, TestsItem } from "./testsData"
import { useAuth } from "../../../contexts/AuthContext"
import { pupilApi } from "../../../services/api/pupilApi"
import { TestComponent } from "./testComponent"
import { ScrollContainer } from "../../ui/reusable/scrollContainer"

export const Tests = () => {
    const navigate = useNavigate()
    const { getToken } = useAuth()

    // Состояние пользователя и прокрутки
    const [userName, setUserName] = useState("")

    // TODO: Сделать получение прогресса
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
            
            <ScrollContainer
                items={testsList}
                visibleCount={3}
                step={3}
                scrollDelay={300}
                renderItem={(item) => (

                    <TestComponent
                        item={item}
                        onClick={handleItemClick}/>
                )}/>
        </div>
    )
}
