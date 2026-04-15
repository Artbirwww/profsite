import toast, { Toaster } from "react-hot-toast"
import { Button } from "../../ui/reusable/button"
import { useExcelMapper } from "../../../hooks/useExcelMapper"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Specialist, SpecialistKeys } from "../../../types/specialist/specialist"
import "../css/upload-data.css"
import { AccountRequest } from "../../../types/account/account"
import { specialistsAPI } from "../../../services/api/specialistApi"
import { useAuth } from "../../../contexts/AuthContext"
import { BASE_URL } from "../../../services/api/baseUrl"
export const UploadSpecialists = () => {
    const {getToken} = useAuth()
    const {rawData, headers, setHeaders, processExcelFile, resetData} = useExcelMapper()
    const [specialistKeys, setSpecialistKeys] = useState(SpecialistKeys)
    const [headerMapping, setHeaderMapping] = useState<Record<string, string>>({})

    const fileRef = useRef<HTMLInputElement>(null)
    const uploadSpecialists = async () => {
        try {
            const specialists = applyMapping(rawData)
            const responseData = await specialistsAPI.specialistAutoRegister(specialists, getToken())
            toast.success(responseData)
            resetData()
            if (fileRef.current) {
                fileRef.current.value = '';
}
        } catch(err) {
            console.error(err)
            toast.error("Ошибка при выгрузке специалистов, проверьте логи F12")
        }
    }
    useEffect(() => {
        if (!headers) return
        const initialMapping: Record<string, string> = {}
        headers.forEach(header => {
            initialMapping[header] = ""
        })
        setHeaderMapping(initialMapping)
    }, [headers])
    const applyMapping = (data: any[]) => {
        const specialists = data?.map(row => {
            const specialist: any = {}
            const account: any = {}
            Object.entries(headerMapping).forEach(([header, mappedKey]) => {
                if (mappedKey === "email" || mappedKey === "password")
                    account[mappedKey] = row[header]
                else if (mappedKey && row[header] !== undefined)
                    specialist[mappedKey] = row[header]
            })
            console.log(specialist, account)
            return {  "specialist" : specialist as Specialist, "account": account as AccountRequest}
        })
        return specialists
    }
    const pickupFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        processExcelFile(file as File)
    }
    const handleSpecialistKeys = (headerName:string, selectedKey: string) => {
        console.log(headerName, selectedKey)
        setHeaderMapping(prev => ({...prev, [headerName]: selectedKey}))
    }

    return(<>
        <div className="content-wrapper">
            <div className="upload-section">
                <h3>Загрузка специалистов</h3>
                <div className="upload-container">
                    <div className="file-input-wrapper">
                        <input type="file" ref={fileRef} accept=".xlsx, .xls" onChange={pickupFileHandler} id="file-upload"/>
                        <label htmlFor="file-upload" className="file-label">
                            {"Excel файл"}
                        </label>
                    </div>
                    <Button buttonLabel="Загрузить" buttonFunction={() => uploadSpecialists()}/>
                    <a href={`${BASE_URL}/public/admin/specialist.xlsx`}>Скачать шаблон specialist.xlsx</a>
                </div>
            </div>
            {headers && headers.length > 0 && (
                <div className="mapping-section">
                    <h4>Сопоставление</h4>
                    <div className="mapping-grid">
                        {headers.map((name, index) => (
                            <div key={index} className="mapping-item">
                                <div className="excel-header">
                                    <p>{name}</p>
                                </div>
                                <select 
                                    className="default mapping-select"
                                    onChange={(e) => handleSpecialistKeys(name, e.target.value)}
                                    value={headerMapping[name] || ""}>
                                        <option value={""}>Выбрать</option>
                                        {specialistKeys.map(key => (
                                            <option value={key}>{key}</option>
                                        ))}

                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <Toaster/>
        </div>
    </>)
}