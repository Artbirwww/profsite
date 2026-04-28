import "./css/profilePageStyles.css"

import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { FieldInput } from "../ui/reusable/fieldInput"
import { UserPen, UserRound, School, Hash, CaseUpper, PersonStanding, CheckCheck } from "lucide-react"
import { Button } from "../ui/reusable/button"
import { Radio, RadioGroup } from "../ui/reusable/radio"
import { Dropdown } from "../ui/reusable/dropdown"
import { DatePicker } from "../ui/reusable/datePicker"
import { Temporal } from "@js-temporal/polyfill"
import { PupilDTO } from "../../types/pupil/pupil"
import { Gender } from "../../types/pupil/gender"
import { useAuth } from "../../contexts/AuthContext"
import { pupilApi } from "../../services/api/pupilApi"
import toast, { Toaster } from "react-hot-toast"

export const PupilProfilePage: FC = () => {
    const { getToken } = useAuth()

    const [email, setEmail] = useState<string>("")
    const [formData, setFormData] = useState<PupilDTO>(
        {
            name: "",
            surname: "",
            patronymic: "",
            birthday: Temporal.Now.plainDateISO().toString(),
            school: "",
            healthCondition: "",
            nationality: "",
            extraActivities: "",
            classNumber: 0,
            classLabel: "",
            gender: Gender.MALE
        })

    useEffect(() => {
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

            } catch (err) {
                console.error(err)
                return
            }
        }
        getPupilData()
    }, [])

    const classNumberOptions = useMemo(() => [
        { value: 5, label: "5 класс" },
        { value: 6, label: "6 класс" },
        { value: 7, label: "7 класс" },
        { value: 8, label: "8 класс" },
        { value: 9, label: "9 класс" },
        { value: 10, label: "10 класс" },
        { value: 11, label: "11 класс" },
    ], []);

    const nationalityOptions = useMemo(() => [
        { value: "russian", label: "Русский(-ая)" },
        { value: "tatar", label: "Татар(-ка)" },
        { value: "chechen", label: "Чечен(-ка)" },
        { value: "bashkir", label: "Башкир(-ка)" },
        { value: "chuvash", label: "Чуваш(-ка)" },
        { value: "avars", label: "Аварец/Аварка" },
        { value: "armenian", label: "Армянин/Армянка" },
        { value: "yakut", label: "Якут(-ка)" },
        { value: "ossetian", label: "Осетин(-ка)" },
        { value: "other", label: "Другая" },
    ], []);

    const schoolNames = useMemo(() => [
        { value: "sosh 33", label: "МБОУ СОШ №33 города Абакана" },
        { value: "top", label: "Академия 'Топ'" },
        { value: "test", label: "Тест" },
    ], []);

    const updateField = useCallback((field: keyof PupilDTO) => (value: any) => {
        const extractedValue = (value && typeof value === 'object' && 'value' in value)
            ? value.value
            : value

        setFormData(prev => ({ ...prev, [field]: extractedValue }))
    }, [])

    const handleDateSelect = useCallback((date: Temporal.PlainDate) => {
        setFormData(prev => ({ ...prev, birthday: date.toString() }))
    }, [])

    const handleSaveClick = async () => {
        console.log("Saving data: ", formData)

        try {
            const token = getToken()
            if (!token) throw new Error("Empty token")
            await pupilApi.updatePupilData(formData, token)
            toast.success("Ваши данные успешно обновлены")

        } catch (err) {
            console.error(err)
            toast.error("Не получилось обновить данные")
        }
    }

    return (<>
        <div className="page-header">
            <h1>Личный кабинет</h1>
        </div>

        <div className="profile-wrapper">
            <div className="profile-container">
                <div className="profile-grid">

                    {/* пол */}
                    <div className="profile-grid-item profile-grid-item-1">
                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Пол</h4>
                            </div>

                            <RadioGroup
                                name="gender"
                                value={formData.gender}
                                onChange={updateField("gender")}
                                direction="row">

                                <Radio radioLabel="Мужской" radioValue={Gender.MALE}></Radio>
                                <Radio radioLabel="Женский" radioValue={Gender.FEMALE}></Radio>

                            </RadioGroup>
                        </div>
                    </div>

                    {/* логин / почта */}
                    <div className="profile-grid-item profile-grid-item-2">
                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Логин / Электронная почта</h4>
                            </div>

                            <FieldInput
                                name="email"
                                inputIcon={<UserRound size={20} />}
                                inputPlaceholder="example@mail.ru"
                                inputValue={email}
                                isDisabled={true} />
                        </div>
                    </div>

                    {/* фио */}
                    <div className="profile-grid-item profile-grid-item-3">
                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Фамилия</h4>
                            </div>

                            <FieldInput
                                inputIcon={<UserPen size={20} />}
                                inputPlaceholder="Иванов"
                                inputValue={formData.surname}
                                inputOnChange={updateField("surname")} />
                        </div>

                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Имя</h4>
                            </div>

                            <FieldInput
                                inputPlaceholder="Иван"
                                inputValue={formData.name}
                                inputOnChange={updateField("name")} />
                        </div>

                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Отчество</h4>
                            </div>

                            <FieldInput
                                inputPlaceholder="Иванович"
                                inputValue={formData.patronymic}
                                inputOnChange={updateField("patronymic")} />
                        </div>
                    </div>

                    {/* национальность и дата рождения */}
                    <div className="profile-grid-item profile-grid-item-4">
                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Национальность</h4>
                            </div>

                            <Dropdown
                                dropdownIcon={<PersonStanding size={20} />}
                                dropdownOptions={nationalityOptions}
                                dropdownSelected={formData.nationality}
                                optionOnSelect={(opt) => updateField("nationality")(opt.value)}
                                dropdownDirection="up" />
                        </div>

                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Дата рождения</h4>
                            </div>

                            <DatePicker
                                datePickerSelected={Temporal.PlainDate.from(formData.birthday ? formData.birthday : Temporal.Now.plainDateISO().toString())}
                                onDateSelect={handleDateSelect}
                                dropdownDirection="up" />
                        </div>
                    </div>

                    {/* школа и класс */}
                    <div className="profile-grid-item profile-grid-item-5">
                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Школа</h4>
                            </div>

                            <Dropdown
                                dropdownIcon={<School size={20} />}
                                dropdownOptions={schoolNames}
                                dropdownSelected={formData.school}
                                optionOnSelect={(opt) => updateField("school")(opt.value)}
                                dropdownDirection="up" />
                        </div>

                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Номер класса</h4>
                            </div>

                            <Dropdown
                                dropdownIcon={<Hash size={20} />}
                                dropdownOptions={classNumberOptions}
                                dropdownSelected={formData.classNumber}
                                optionOnSelect={(opt) => updateField("classNumber")(opt.value)}
                                dropdownDirection="up" />
                        </div>

                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Буква класса</h4>
                            </div>

                            <FieldInput
                                inputIcon={<CaseUpper size={20} />}
                                inputPlaceholder="а-я"
                                inputValue={formData.classLabel}
                                inputOnChange={updateField("classLabel")} />
                        </div>
                    </div>

                    {/* кнопка сохранения */}
                    <div className="profile-options profile-grid-item-6 ">
                        <Button
                            buttonLabel="Сохранить"
                            buttonFunction={handleSaveClick} />
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    </>)
}