import { ChangeEvent, FC, useCallback, useMemo, useState } from "react"
import { FieldInput } from "../ui/reusable/fieldInput"
import { UserPen, MailOpen, School, Hash, CaseUpper, PersonStanding, CheckCheck } from "lucide-react"
import { Button } from "../ui/reusable/button"
import { Radio } from "../ui/reusable/radio"
import { Dropdown } from "../ui/reusable/dropdown"
import { DatePicker } from "../ui/reusable/datePicker"
import { Temporal } from "@js-temporal/polyfill"

interface PersonalData {
    gender?: string
    surname?: string
    name?: string
    patronymic?: string
    email?: string
    nationality?: string | number
    birthDate?: Temporal.PlainDate
    school?: string
    classNumber?: string | number
    classLetter?: string
}


export const PersonalInformation: FC = () => {
    const [formData, setFormData] = useState<PersonalData>({
        gender: "",
        surname: "",
        name: "",
        patronymic: "",
        email: "",
        nationality: "",
        school: "",
        classNumber: "",
        classLetter: "",
    })


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

    const updateField = useCallback((field: keyof PersonalData) => (value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }, [])

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, gender: e.target.value }))
    }

    const handleDateSelect = useCallback((date: Temporal.PlainDate) => {
        setFormData(prev => ({ ...prev, birthDate: date }))
    }, [])

    const handleSaveClick = () => {
        console.log("Saving data: ", formData)
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
                            <Radio radioLabel="Мужской" radioGroup="gender" radioValue="male"
                                   radioChecked={formData.gender === "male"} radioOnChange={handleRadioChange} />

                            <Radio radioLabel="Женский" radioGroup="gender" radioValue="female"
                                   radioChecked={formData.gender === "female"} radioOnChange={handleRadioChange} />
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
                                inputValue={formData.email} inputOnChange={updateField("email")} />
                </div>

                {/* Национальность и Дата */}
                <div className="profile-personal-inputs-row">
                    <Dropdown dropdownLabel="Национальность" dropdownIcon={<PersonStanding size={20} />}
                              dropdownOptions={nationalityOptions} dropdownSelected={formData.nationality}
                              optionOnSelect={(opt) => updateField("nationality")(opt.value)} />

                    <DatePicker datePickerLabel="Дата рождения" datePickerSelected={formData.birthDate}
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
                                inputPlaceholder="а-я" inputValue={formData.classLetter}
                                inputOnChange={updateField("classLetter")} />
                </div>

                {/* Кнопка сохранения */}
                <div className="profile-personal-inputs-row button-input-row">
                    <Button buttonLabel="Сохранить" buttonIcon={<CheckCheck size={20} />}
                            buttonFunction={handleSaveClick} />
                </div>
            </div>
        </div>
    )
}