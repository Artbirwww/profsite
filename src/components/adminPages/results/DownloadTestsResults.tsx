import { useState } from "react"
import { DatePicker } from "../../ui/reusable/datePicker"
import { Temporal } from "@js-temporal/polyfill"
import { Button } from "../../ui/reusable/button"
import { Download } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import "../css/form.css"
import { testApi } from "../../../services/api/testApi"
import { useAuth } from "../../../contexts/AuthContext"
import { formatDateToDateTime } from "../../../services/dates/formatDate"
import { exportToExcel } from "../../../utils/convertData/exportToExcel"
import { exportToJson } from "../../../utils/convertData/exportToJson"
type format = "xlsx" | "json"
export const DownloadTestsResults = () => {
    const [resultSettings, setResultSettings] = useState({
        type: "Pupil",
        startDate: Temporal.Now.plainDateISO().toString(),
        endDate: Temporal.Now.plainDateISO().toString()
    })
    const [dataFormat, setDataFormat] = useState<format>("xlsx")
    const {getToken} = useAuth()
    const handleChange = (key: string, value: any) => {
        console.log(key, value)
        setResultSettings(prev => ({...prev, [key]: value}))
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!resultSettings.type || !resultSettings.startDate || !resultSettings.endDate){
            toast.error("Заполните все данные")
            return
        }
        try {
            const token = getToken()
            const tests = await testApi.getCompletedTestsByDates(
                token, resultSettings.type, formatDateToDateTime(resultSettings.startDate), formatDateToDateTime(resultSettings.endDate, true))
            if (dataFormat === "xlsx")
                exportToExcel(tests, `${resultSettings.type[0]}_${resultSettings.startDate}_${resultSettings.endDate}`)
            else 
            exportToJson(tests, `${resultSettings.type[0]}_${resultSettings.startDate}_${resultSettings.endDate}`)
        } catch(err) {
            console.error("Возникла ошибка при загрузке данных", err)
            toast.error(`Возникла ошибка при загрузке данных, ${err}`)
        }
        
    }

    return (<>
        <div className="content-wrapper">
            <form onSubmit={handleSubmit}>
                <label>
                    <input 
                        type="radio"
                        name="type" 
                        value={"Pupil"}
                        checked = {resultSettings.type === "Pupil"}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                        <span>Ученик</span>
                </label>
                <label>
                    <input 
                        type="radio"
                        name="type" 
                        value={"Specialist"}
                        checked = {resultSettings.type === "Specialist"}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                        Специалист
                </label>
                <label>
                    <input 
                        type="radio"
                        name="type" 
                        value={"all"}
                        checked = {resultSettings.type === "all"}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                        Все
                </label>
                <div className="row">
                    <DatePicker 
                        datePickerSelected={Temporal.PlainDate.from(resultSettings.startDate)}
                        onDateSelect={(date: Temporal.PlainDate) => handleChange("startDate", date.toString())}
                        dropdownDirection="up"
                    />
                    <DatePicker 
                        datePickerSelected={Temporal.PlainDate.from(resultSettings.endDate)}
                        onDateSelect={(date: Temporal.PlainDate) => handleChange("endDate", date.toString())}
                        dropdownDirection="up"
                    />
                </div>
                <label>
                    <input
                        type="radio"
                        name="format"
                        value={"xlsx"}
                        checked={dataFormat === "xlsx" ? true : false}
                        onChange={(e) => setDataFormat("xlsx")}
                         />
                    xlsx
                </label>
                <label>
                    <input
                        type="radio"
                        name="format"
                        value={"json"}
                        checked={dataFormat === "json" ? true : false}
                        onChange={(e) => setDataFormat("json")}
                         />
                    json
                </label>
                    <Button label={`Выгрузить ${`${resultSettings.type[0]}_${resultSettings.startDate}_${resultSettings.endDate}.${dataFormat}`}`} icon={<Download/>} type="submit"/>
            </form>
        </div>
        <Toaster/>
    </>)
}