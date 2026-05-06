import { useCallback, useEffect, useState } from "react"
import { PupilListResponse, PupilResponse } from "../../../types/pupil/pupil"
import toast, { Toaster } from "react-hot-toast"
import { pupilApi } from "../../../services/api/pupilApi"
import style from "./pupils-list.module.css"
import "../css/admin-pages.css"
import "../css/card.css"
import { Pagination } from "../../ui/reusable/Pagination"
import { PupilCard } from "./PupilCard"
export const PupilsList = () => {
    const [pupilListResponse, setPupilListResponse] = useState<PupilListResponse | undefined>(undefined)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [size, setSize] = useState<number>(9)

    const fetchPupils = useCallback(async (signal: AbortSignal) => {
        
        try {
            const response = await pupilApi.getAllPupils(currentPage, size, signal);
            console.log(response)
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
        <div className={"content-wrapper"}>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total={pupilListResponse.totalPages}  />
            <div className={"cards-container"}>
                {pupilListResponse.content.map(p => (
                    <PupilCard pupil={p} />
                ))}
            </div>
        
        
        </div>
        <Toaster position="top-right" />

    </>
}