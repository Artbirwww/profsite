import { useCallback, useEffect, useState } from "react"
import { PupilListResponse, PupilResponse } from "../../../types/pupil/pupil"
import toast, { Toaster } from "react-hot-toast"
import { pupilApi } from "../../../services/api/pupilApi"
import style from "./pupils-list.module.css"
export const PupilsList = () => {
    const [pupilListResponse, setPupilListResponse] = useState<PupilListResponse | undefined>(undefined)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [size, setSize] = useState<number>(10)

    const fetchPupils = useCallback(async (signal: AbortSignal) => {
        
        try {
            const response = await pupilApi.getAllPupils(currentPage, size, signal);
            setPupilListResponse(response)
        } catch(err: any) {
            if (err.name === "AbortError" || err.name === "CanceledError"){
                console.log("Request was cancelled");
                return;
            }
            console.log(err)
            toast.error("Ошибка, не удалось загрузить список учеников", {style : {backgroundColor: "#FF7F7F"}})
        }
    }, [currentPage, size])
    useEffect(() => {
        const controller = new AbortController();
        fetchPupils(controller.signal);
        return () => {
            controller.abort();
        }
    }, [fetchPupils])

    if (!pupilListResponse) 
        return <><p>Загружаем ...</p></>
    return <>
        <div className={style["pupils-list-wrapper"]}>
            <p>Список учеников</p>
            <div className={style["pupils-list"]}>
                {pupilListResponse.content.map(p => (
                    <div className={style["pupil-item"]}>
                        <p>{p.pupilDTO?.surname} {p.pupilDTO?.name} {p.pupilDTO?.patronymic} {p.pupilDTO?.classNumber}{p.pupilDTO?.classLabel}</p>
                        <p>{p.email}</p>
                    </div>
                ))}
            </div>
        <div className={style["pages"]}>
            {Array.from({length: pupilListResponse.totalPages}, (_, index) => (
                <button onClick={() => {setCurrentPage(index)}}>{index + 1}</button>
            ))}
        </div>
        
        </div>
        <Toaster position="top-right" />

    </>
}