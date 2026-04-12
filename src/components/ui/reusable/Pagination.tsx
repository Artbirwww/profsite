import { Dispatch, SetStateAction } from "react"
import "./css/pagination.css"
interface PaginationProps {
    total: number
    limit?: number
    currentPage: number
    setCurrentPage: Dispatch<SetStateAction<number>>
}
//total - Всего страниц
//limit - Кол-во отображаемых блоков
export const Pagination = ({total, limit = 5, currentPage, setCurrentPage}: PaginationProps) => {
    if (!total || !limit) return (<>
        <p>Пагинация не сгенерирована проверьте параметры</p>
    </>)

    let startPage = Math.max(1, currentPage - Math.floor(limit / 2))
    let endPage = Math.min(total, startPage + limit - 1)
    if (endPage - startPage + 1 < limit) 
        startPage = Math.max(1, endPage - limit + 1)
    const pages = []
    for (let i = startPage; i <= endPage; i++) pages.push(i)

    

    return (<>
    <div className="pagination">
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
                <p className="page" onClick={() => setCurrentPage(total-1)}>
                    {total}
                </p>
            </>
        )}
    </div>
    </>)
}