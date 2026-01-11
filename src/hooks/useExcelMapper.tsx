import { useCallback, useState } from "react"
import * as XLSX from 'xlsx'
import type { PupilDTO } from "../types/pupil/pupil"
export const useExcelMapper = () => {
    const [rawData, setRawData] = useState<any[]>([])
    const [headers, setHeaders] = useState<any[]>([])
    const extractHeaders = (data: any[]) => {
        const firstRow = data[0]
        console.log(firstRow)
        return Object.keys(firstRow).map(key => key)
    }
    
    const processExcelFile = useCallback((file: File): Promise<any[]> => {
        
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (event) => {
                try {
                    const binaryString = event.target?.result
                    const workbook = XLSX.read(binaryString, {type: 'binary'})
                    const sheetName = workbook.SheetNames[0]
                    const workSheet = workbook.Sheets[sheetName]
                    const data = XLSX.utils.sheet_to_json(workSheet, {raw: true})
                    if (!data || !data[0]) {
                        reject("Cant find headers or data")
                    }
                    setRawData(data)
                    setHeaders(extractHeaders(data))
                    
                    resolve(data)
                } catch(error) {
                    reject(error)
                }
            }
            reader.onerror = () => reject(reader.error)
            reader.readAsBinaryString(file)
        })
    }, [])
    return {
        rawData,
        headers,
        setHeaders,
        processExcelFile,
    }
}