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
import { PasswordReset } from "./PasswordReset"

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

    // Replace all className with these:

    return (
        <div className="profile-wrapper">
            <div className="profile-container">
                <div className="profile-grid flex-layout">
                    
                    {/* Row 1: Gender + Email */}
                    <div className="profile-row row-2">
                        <div className="profile-card">
                            <h4>Пол</h4>
                            <RadioGroup
                                name="gender"
                                value={formData.gender}
                                onChange={updateField("gender")}
                                direction="row">
                                <Radio radioLabel="Мужской" radioValue={Gender.MALE} />
                                <Radio radioLabel="Женский" radioValue={Gender.FEMALE} />
                            </RadioGroup>
                        </div>

                        <div className="profile-card">
                            <h4>Логин / Электронная почта</h4>
                            <FieldInput
                                name="email"
                                inputIcon={<UserRound size={20} />}
                                inputPlaceholder="example@mail.ru"
                                inputValue={email}
                                isDisabled={true} />
                        </div>
                    </div>

                    {/* Row 2: Full Name */}
                    <div className="profile-card row-full">
                        <div className="name-fields">
                            <div>
                                <h4>Фамилия</h4>
                                <FieldInput
                                    inputIcon={<UserPen size={20} />}
                                    inputPlaceholder="Иванов"
                                    inputValue={formData.surname}
                                    inputOnChange={updateField("surname")} />
                            </div>
                            <div>
                                <h4>Имя</h4>
                                <FieldInput
                                    inputPlaceholder="Иван"
                                    inputValue={formData.name}
                                    inputOnChange={updateField("name")} />
                            </div>
                            <div>
                                <h4>Отчество</h4>
                                <FieldInput
                                    inputPlaceholder="Иванович"
                                    inputValue={formData.patronymic}
                                    inputOnChange={updateField("patronymic")} />
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Nationality + Birthday */}
                    <div className="profile-row row-2">
                        <div className="profile-card">
                            <h4>Национальность</h4>
                            <Dropdown
                                dropdownIcon={<PersonStanding size={20} />}
                                dropdownOptions={nationalityOptions}
                                dropdownSelected={formData.nationality}
                                optionOnSelect={(opt) => updateField("nationality")(opt.value)}
                                dropdownDirection="up" />
                        </div>

                        <div className="profile-card">
                            <h4>Дата рождения</h4>
                            <DatePicker
                                datePickerSelected={Temporal.PlainDate.from(formData.birthday || Temporal.Now.plainDateISO().toString())}
                                onDateSelect={handleDateSelect}
                                dropdownDirection="up" />
                        </div>
                    </div>

                    {/* Row 4: School Info */}
                    <div className="profile-row row-3">
                        <div className="profile-card">
                            <h4>Школа</h4>
                            <Dropdown
                                dropdownIcon={<School size={20} />}
                                dropdownOptions={schoolNames}
                                dropdownSelected={formData.school}
                                optionOnSelect={(opt) => updateField("school")(opt.value)}
                                dropdownDirection="up" />
                        </div>

                        <div className="profile-card">
                            <h4>Номер класса</h4>
                            <Dropdown
                                dropdownIcon={<Hash size={20} />}
                                dropdownOptions={classNumberOptions}
                                dropdownSelected={formData.classNumber}
                                optionOnSelect={(opt) => updateField("classNumber")(opt.value)}
                                dropdownDirection="up" />
                        </div>

                        <div className="profile-card">
                            <h4>Буква класса</h4>
                            <FieldInput
                                inputIcon={<CaseUpper size={20} />}
                                inputPlaceholder="а-я"
                                inputValue={formData.classLabel}
                                inputOnChange={updateField("classLabel")} />
                        </div>
                    </div>

                    {/* Row 5: Buttons */}
                    <div className="profile-card">
                        <div className="flex flex-col gap-4">
                            <Button 
                                label="Сохранить" 
                                icon={<CheckCheck />} 
                                onClick={handleSaveClick} 
                                className="w-full flex justify-center"
                            />
                        </div>
                        
                    </div>
                    <PasswordReset />
                </div>
            </div>
            <Toaster />
        </div>
    )
}