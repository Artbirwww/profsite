import { ChangeEvent, FC, useState } from "react";
import { FieldInput } from "../ui/reusable/fieldInput";
import { UserPen, MailOpen, School, Hash, CaseUpper, PersonStanding, CheckCheck } from "lucide-react";
import { Button } from "../ui/reusable/button";
import { Radio } from "../ui/reusable/radio";
import { Dropdown } from "../ui/reusable/dropdown";
import { DatePicker } from "../ui/reusable/datePicker";
import { Temporal } from "@js-temporal/polyfill";

export const PersonalInformation: FC = () => {
    const [name, setName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [patronymic, setPatronymic] = useState<string>("")
    const [gender, setGender] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [nationality, setNationality] = useState<string | number>("")
    const [birthDate, setBirthDate] = useState<Temporal.PlainDate>()
    const [school, setSchool] = useState<string>("")
    const [classNumber, setClassNumber] = useState<string | number>("")
    const [classLetter, setClassLetter] = useState<string>("")


    const classNumberOptions = [
        { value: 5, label: "5" },
        { value: 6, label: "6" },
        { value: 7, label: "7" },
        { value: 8, label: "8" },
        { value: 9, label: "9" },
        { value: 10, label: "10" },
        { value: 11, label: "11" },
    ]

    const nationalityOptions = [
        { value: "aboba", label: "aboba" },
        { value: "aboba1", label: "aboba1" },
        { value: "aboba2", label: "aboba2" },
        { value: "aboba3", label: "aboba3" },
        { value: "aboba4", label: "aboba4" },
        { value: "aboba5", label: "aboba5" },
        { value: "aboba6", label: "aboba6" },
        { value: "aboba6", label: "aboba6" },
        { value: "aboba6", label: "aboba6" },
        { value: "aboba6", label: "aboba6" },
        { value: "aboba6", label: "aboba6" },
    ]

    const handleSaveClick = () => {
        console.log("Data saved")
    }

    const handleBackClick = () => {
        console.log("Back")
    }

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value)
    }

    const handleDateSelect = (date: Temporal.PlainDate) => {
        setBirthDate(date)
    }

    return (
        <div className="profile-personal-container">
            <h3 className="profile-personal-title">Персональная информация</h3>

            <div className="profile-separator"></div>

            <div className="profile-personal-inputs-cols">
                <div className="profile-personal-inputs-row">
                    <fieldset>
                        <legend>Укажите Ваш пол *</legend>

                        <Radio radioLabel={"Мужской"}
                               radioGroup={"profile-user-gender"}
                               radioValue={"male"}
                               radioChecked={gender === "male"}
                               radioOnChange={handleRadioChange}/>

                        <Radio radioLabel={"Женский"}
                               radioGroup={"profile-user-gender"}
                               radioValue={"female"}
                               radioChecked={gender === "female"}
                               radioOnChange={handleRadioChange}/>
                    </fieldset>
                </div>

                <div className="profile-personal-inputs-row">
                    <div>
                        <FieldInput inputLabel={"Имя"}
                                    inputIcon={<UserPen size={20}/>}
                                    inputPlaceholder={"Иван"}
                                    isImportant={true}
                                    inputValue={name}
                                    inputOnChange={setName}/>
                    </div>

                    <div>
                        <FieldInput inputLabel={"Фамилия"}
                                    inputPlaceholder={"Иванов"}
                                    isImportant={true}
                                    inputValue={surname}
                                    inputOnChange={setSurname}/>
                    </div>

                    <div>
                        <FieldInput inputLabel={"Отчество"}
                                    inputPlaceholder={"Иванович"}
                                    isImportant={true}
                                    inputValue={patronymic}
                                    inputOnChange={setPatronymic}/>
                    </div>
                </div>

                <div className="profile-personal-inputs-row">
                    <div>
                        <FieldInput inputLabel={"Электронная почта"}
                                    inputIcon={<MailOpen size={20}/>}
                                    inputPlaceholder={"example@gmail.com"}
                                    isImportant={true}
                                    inputValue={email}
                                    inputOnChange={setEmail}/>
                    </div>
                </div>

                <div className="profile-personal-inputs-row">
                    <div>
                        <Dropdown dropdownLabel={"Национальность"}
                                  dropdownOptions={nationalityOptions}
                                  dropdownSelected={nationality}
                                  dropdownIcon={<PersonStanding size={20}/>}
                                  optionOnSelect={(opt) => setNationality(opt.value)}/>
                    </div>

                    <div>
                        <DatePicker datePickerLabel={"Дата рождения"}
                                    datePickerSelected={birthDate}
                                    onDateSelect={handleDateSelect}/>
                    </div>
                </div>

                <div className="profile-personal-inputs-row">
                    <div>
                        <FieldInput inputLabel={"Школа"}
                                    inputIcon={<School size={20}/>}
                                    inputPlaceholder={"МБОУ города Абакана СОШ №9"}
                                    inputValue={school}
                                    inputOnChange={setSchool}/>
                    </div>

                    <div>
                        <Dropdown dropdownLabel={"Номер класса"}
                                  dropdownOptions={classNumberOptions}
                                  dropdownSelected={classNumber}
                                  dropdownIcon={<Hash size={20}/>}
                                  optionOnSelect={(opt) => setClassNumber(opt.value)}/>
                    </div>

                    <div>
                        <FieldInput inputLabel={"Буква класса"}
                                    inputIcon={<CaseUpper size={20}/>}
                                    inputPlaceholder={"а-я"}
                                    inputValue={classLetter}
                                    inputOnChange={setClassLetter}/>
                    </div>
                </div>

                <div className="profile-personal-inputs-row">

                    <div>
                        <Button buttonLabel={"Сохранить"}
                                buttonIcon={<CheckCheck size={20}/>}
                                isDisabled={false}
                                buttonFunction={handleSaveClick}/>
                    </div>
                </div>
            </div>
        </div>
    )
}