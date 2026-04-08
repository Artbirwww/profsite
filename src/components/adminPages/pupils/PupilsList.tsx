import { useCallback, useEffect, useState } from "react"
import { PupilListResponse, PupilResponse } from "../../../types/pupil/pupil"
import toast, { Toaster } from "react-hot-toast"
import { pupilApi } from "../../../services/api/pupilApi"
import style from "./pupils-list.module.css"
const paginationLimit = 5
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
    const generatePagination = (total: number, limit: number, ) => {
        let startPage = Math.max(1, currentPage - Math.floor(limit / 2))
        let endPage = Math.min(total, startPage + limit - 1)
        if (endPage - startPage + 1 < limit) 
            startPage = Math.max(1, endPage - limit + 1)
        const pages = []
        for (let i = startPage; i <= endPage; i++) pages.push(i)
        return (<>
            {pages.map(pageNum => (
                <p key={pageNum} 
                    className={`${pageNum - 1 === currentPage ? "current-page": "page"}`}
                    onClick={() => setCurrentPage(pageNum - 1)}>
                        {pageNum}
                </p>
            ))}
            {endPage < total && (
                <>
                    <p>...</p>
                    <p className="page" onClick={() => setCurrentPage(total)}>
                        {total}
                    </p>
                </>
            )}
        </>)
        
    }

    if (!pupilListResponse) 
        return <><p>Загружаем ...</p></>
    return <>
        <div className={style["pupils-list-wrapper"]}>
            <h3>Список учеников</h3>
            <div className="pagination">
                {generatePagination(pupilListResponse.totalPages, paginationLimit)}
            </div>
            <div className={style["pupils-list"]}>
                {pupilListResponse.content.map(p => (
                    <div className={style["pupil-item"]}>
                        <p><b>{p.pupilDTO?.surname} {p.pupilDTO?.name} {p.pupilDTO?.patronymic}</b> {p.pupilDTO?.classNumber}{p.pupilDTO?.classLabel}</p>
                        <p>Почта: {p.email}</p>
                        <p>Дата регистрации: {p.pupilDTO.createdAt}</p>
                    </div>
                ))}
            </div>
        
        
        </div>
        <Toaster position="top-right" />

    </>
}