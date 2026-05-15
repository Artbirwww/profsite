import { useState } from "react"
import { DatePicker } from "../../ui/reusable/datePicker"
import { Temporal } from "@js-temporal/polyfill"
import { Button } from "../../ui/reusable/button"
import { Download } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import "../css/form.css"
export const DownloadTestsResults = () => {
    const [resultSettings, setResultSettings] = useState({
        type: "Pupil",
        startDate: Temporal.Now.plainDateISO().toString(),
        endDate: Temporal.Now.plainDateISO().toString()
    })
    const handleChange = (key: string, value: any) => {
        console.log(key, value)
        setResultSettings(prev => ({...prev, [key]: value}))
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            console.log("TODO make api request and return data -> to xlsx")
        } catch(err) {
            console.error("Возникла ошибка при загрузке данных")
            toast.error("Возникла ошибка при загрузке данных")
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
                <DatePicker 
                    datePickerSelected={Temporal.PlainDate.from(resultSettings.startDate)}
                    onDateSelect={(date: Temporal.PlainDate) => handleChange("startDate", date)}
                    dropdownDirection="up"
                />
                <Button label="Выгрузить" icon={<Download/>} type="submit" />
            </form>
        </div>
        <Toaster/>
    </>)
}