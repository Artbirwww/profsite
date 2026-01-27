import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from "react"
import { FieldInput } from "../ui/reusable/fieldInput"
import { UserPen, MailOpen, School, Hash, CaseUpper, PersonStanding, CheckCheck } from "lucide-react"
import { Button } from "../ui/reusable/button"
import { Radio } from "../ui/reusable/radio"
import { Dropdown } from "../ui/reusable/dropdown"
import { DatePicker } from "../ui/reusable/datePicker"
import { Temporal } from "@js-temporal/polyfill"
import { PupilDTO, PupilResponse } from "../../types/pupil/pupil"
import { Gender } from "../../types/pupil/gender"
import { useAuth } from "../../contexts/AuthContext"
import { pupilApi } from "../../services/api/pupilApi"
import toast, { Toaster } from "react-hot-toast"
/**
 * 
 * Обновить вместо pupilResponse просто pupilDTO T_T
 * Почту не менять, ее если и менять то отдельно, после исправление использовать уе api
 */
export const PersonalInformation: FC = () => {
    const {getToken} = useAuth()

    const [email, setEmail] = useState<string>("")
    const [formData, setFormData] = useState<PupilDTO>(
    {
        name: "",
        surname: "",
        patronymic: "",
        birthday: Temporal.Now.plainDateISO().toString(), // YYYY-MM-DD
        school: "",
        healthCondition: "",
        nationality: "",
        extraActivities: "",
        classNumber: 0,
        classLabel: "",
        gender: Gender.MALE
    })

    useEffect(()=> {
        const getPupilData = async () => {
            try {
                const token = getToken()
                if (!token) {
                    return 
                }

                const pupilData = await pupilApi.getPupilData(token)

                if (!pupilData.pupilDTO.id) {
                    setEmail(pupilData.email)
                    return 
                }

                setEmail(pupilData.email)
                setFormData(pupilData.pupilDTO)
                
            } catch(err) {
                console.error(err)
                return
            }
        }
        getPupilData()
    }, [])

    const classNumberOptions = useMemo(() => [
        { value: 5, label: "5" },
        { value: 6, label: "6" },
        { value: 7, label: "7" },
        { value: 8, label: "8" },
        { value: 9, label: "9" },
        { value: 10, label: "10" },
        { value: 11, label: "11" },
    ], [])

    const nationalityOptions = useMemo(() => [
        { value: "aboba", label: "aboba" },
        { value: "aboba1", label: "aboba1" },
        { value: "aboba2", label: "aboba2" },
    ], [])

    const updateField = useCallback((field: keyof PupilDTO) => (value: string | number | Gender | {value: string}) => {
        const extractedValue = (value && typeof value === 'object' && 'value' in value)
            ? value.value
            : value
        setFormData(prev => ({ ...prev, [field]: value }))
    }, [])

    /*
    const updatePupilDTO = useCallback((field: keyof PupilDTO) => (value: string | number | Gender | {value: string}) => {
        //Эта штука необходима что бы работать с данными из дроп списка, поскольку там инфа хранится в отдельных обьектах
        //Он типо смотрит если это обьект и в нем есть ключ value то просто берет из него это значение (совпало название value.value)
        const extractedValue = (value && typeof value === 'object' && 'value' in value)
            ? value.value
            : value
        setFormData(prev => ({...prev, pupilDTO: {...prev.pupilDTO, [field]: extractedValue}}))
    }, [])
    */

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, gender: e.target.value as Gender}))
    }

    const handleDateSelect = useCallback((date: Temporal.PlainDate) => {
        setFormData(prev => ({ ...prev,  birthday: date.toString() })) // check format
    }, [])

    const handleSaveClick = async () => {
        console.log("Saving data: ", formData)

        try {
            const token = getToken()
            if (!token) throw new Error("Empty token")
            //Реализовать валидацию чувствительных данных
            await pupilApi.updatePupilData(formData, token)
            toast.success("Ваши данные успешно обновлены")
            
        } catch(err) {
            console.error(err)
            toast.error("Не получилось обновить данные")
        }
    }

    return (
        <div className="profile-personal-container">
            <h3 className="profile-personal-title">Персональная информация</h3>
            <div className="profile-separator" />

            <div className="profile-personal-inputs-cols">
                {/* Секция Пола */}
                <div className="profile-personal-inputs-row">
                    <fieldset>
                        <legend>Укажите Ваш пол *</legend>

                        <div className="radio-group">
                            <Radio radioLabel="Мужской" radioGroup="gender" radioValue="MALE"
                                   radioChecked={formData.gender === "MALE"} radioOnChange={handleRadioChange} />

                            <Radio radioLabel="Женский" radioGroup="gender" radioValue="FEMALE"
                                   radioChecked={formData.gender === "FEMALE"} radioOnChange={handleRadioChange} />
                        </div>
                    </fieldset>
                </div>

                {/* ФИО */}
                <div className="profile-personal-inputs-row">
                    <FieldInput inputLabel="Фамилия" inputIcon={<UserPen size={20} />} inputPlaceholder="Иванов"
                                isImportant inputValue={formData.surname} inputOnChange={updateField("surname")} />

                    <FieldInput inputLabel="Имя" inputPlaceholder="Иван"
                                isImportant inputValue={formData.name} inputOnChange={updateField("name")} />

                    <FieldInput inputLabel="Отчество" inputPlaceholder="Иванович"
                                isImportant inputValue={formData.patronymic} inputOnChange={updateField("patronymic")} />
                </div>

                {/* Контакты */}
                <div className="profile-personal-inputs-row">
                    <FieldInput inputLabel="Электронная почта" inputIcon={<MailOpen size={20} />}
                                inputPlaceholder="example@gmail.com" isImportant
                                inputValue={email} inputOnChange={undefined} />
                </div>

                {/* Национальность и Дата */}
                <div className="profile-personal-inputs-row">
                    <Dropdown dropdownLabel="Национальность" dropdownIcon={<PersonStanding size={20} />}
                              dropdownOptions={nationalityOptions} dropdownSelected={formData.nationality}
                              optionOnSelect={(opt) => updateField("nationality")(opt.value)} />

                    <DatePicker datePickerLabel="Дата рождения" datePickerSelected={Temporal.PlainDate.from(formData.birthday)}
                                onDateSelect={handleDateSelect} />
                </div>

                {/* Школа и Класс */}
                <div className="profile-personal-inputs-row">
                    <FieldInput inputLabel="Школа" inputIcon={<School size={20} />}
                                inputPlaceholder="МБОУ СОШ №9" inputValue={formData.school}
                                inputOnChange={updateField("school")} />

                    <Dropdown dropdownLabel="Номер класса" dropdownIcon={<Hash size={20} />}
                              dropdownOptions={classNumberOptions} dropdownSelected={formData.classNumber}
                              optionOnSelect={(opt) => updateField("classNumber")(opt.value)} />

                    <FieldInput inputLabel="Буква класса" inputIcon={<CaseUpper size={20} />}
                                inputPlaceholder="а-я" inputValue={formData.classLabel}
                                inputOnChange={updateField("classLabel")} />
                </div>

                {/* Кнопка сохранения */}
                <div className="profile-personal-inputs-row button-input-row">
                    <Button buttonLabel="Сохранить" buttonIcon={<CheckCheck size={20} />}
                            buttonFunction={handleSaveClick} />
                </div>
            </div>
            <Toaster />
        </div>
    )
}