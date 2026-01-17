import { ChangeEvent, FC, useState } from "react";
import { FieldInput } from "../ui/reusable/fieldInput";
import { UserPen, MailOpen, School, Hash, CaseUpper, ChevronsLeft, CheckCheck } from "lucide-react";
import { Button } from "../ui/reusable/button";
import { Radio } from "../ui/reusable/radio";

export const PersonalInformation: FC = () => {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [patronymic, setPatronymic] = useState("")
    const [gender, setGender] = useState<string>('')
    const [email, setEmail] = useState("")
    const [school, setSchool] = useState("")
    const [classNumber, setClassNumber] = useState("")
    const [classLetter, setClassLetter] = useState("")

    const handleSaveClick = () => {
        console.log("Data saved")
    }

    const handleBackClick = () => {
        console.log("Back")
    }

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value)
    }

    return (
        <div className="profile-personal-container">
            <div className="profile-personal-title">Информация о Вас</div>

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
                    <div>Национальность</div>
                    <div>День рождения</div>
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
                        <FieldInput inputLabel={"Номер класса"}
                                    inputIcon={<Hash size={20}/>}
                                    inputPlaceholder={"1...11"}
                                    inputValue={classNumber}
                                    inputOnChange={setClassNumber}/>
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
                        <Button buttonLabel={"Назад"}
                                buttonIcon={<ChevronsLeft size={20}/>}
                                buttonType={"outline"}
                                buttonFunction={handleBackClick}/>
                    </div>

                    <div>
                        <Button buttonLabel={"Сохранить"}
                                buttonIcon={<CheckCheck size={20}/>}
                                buttonFunction={handleSaveClick}/>
                    </div>
                </div>
            </div>
        </div>
    )
}