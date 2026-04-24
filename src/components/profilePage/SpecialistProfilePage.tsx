import { FC, useEffect, useMemo, useState } from "react"
import { FieldInput } from "../ui/reusable/fieldInput"
import { UserPen, MailOpen, UserRound, Phone, Briefcase, School, Hash, CaseUpper, PersonStanding, CheckCheck, SpellCheck } from "lucide-react"
import { Button } from "../ui/reusable/button"
import { Radio, RadioGroup } from "../ui/reusable/radio"
import { Dropdown } from "../ui/reusable/dropdown"
import { Gender } from "../../types/pupil/gender"
import { useAuth } from "../../contexts/AuthContext"
import toast, { Toaster } from "react-hot-toast"
import { Specialist } from "../../types/specialist/specialist"
import { specialistsAPI } from "../../services/api/specialistApi"

export const SpecialistProfilePage: FC = () => {
    const { getToken } = useAuth()

    const [specialist, setSpecialist] = useState<Specialist>({
        email: '',
        name: '',
        surname: '',
        patronymic: '',
        contactEmail: '',
        contactPhone: '',
        experience: '',
        jobSatisfaction: '',
        profession: '',
        gender: Gender.MALE
    })

    const [professions, setProfessions] = useState<Array<{ value: string; label: string }>>([])


    useEffect(() => {
        const loadSpecialistData = async () => {
            try {
                const specialistData = await specialistsAPI.getSpecialistData(getToken())
                console.log(specialistData)
                setSpecialist(specialistData)

            } catch (err) {
                console.error(err)
                toast.error("Ошибка при загрузке данных")
            }
        }

        const loadProfessions = async () => {
            try {
                const professionsTemp = await specialistsAPI.getProfessions()
                console.log(professionsTemp.map(profession => profession.name))
                setProfessions(professionsTemp.map(profession => ({ value: profession.name, label: profession.name })))

            } catch (err) {
                console.error(err)
                toast.error("Ошибка при загрузке профессий")
            }
        }

        loadSpecialistData()
        loadProfessions()
    }, [])

    const jobExpirienceOptions = useMemo(() => [
        { value: "менее 1 года", label: "менее 1 года" },
        { value: "1 - 2 года", label: "1 - 2 года" },
        { value: "3 - 4 года", label: "3 - 4 года" },
        { value: "более 4 лет", label: "более 4 лет" }
    ], [])

    const jobSatisfactionOptions = useMemo(() => [
        { value: "Нравится", label: "Нравится" },
        { value: "Скорее нравится", label: "Скорее нравится" },
        { value: "Нейтрально", label: "Нейтрально" },
        { value: "Скорее не нравится", label: "Скорее не нравится" },
        { value: "Не нравится", label: "Не нравится" }
    ], [])

    const handleChange = (e: any) => {
        const { name, value } = e.target
        console.log(name, value)
        setSpecialist(prev => ({ ...prev, [name]: value }))
    }

    const radioGroupHandleChange = (name: string, value: string) => {
        setSpecialist(prev => ({ ...prev, [name]: value }))
    }

    const updateData = async () => {
        try {
            const updatedSpecialist = await specialistsAPI.updateSpecialist(getToken(), specialist)
            setSpecialist(updatedSpecialist)
            toast.success("Данные успешно обновлены")

        } catch (err) {
            console.error(err)
            toast.error("Возникла ошибка при обновлении профиля")
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
                                value={specialist.gender}
                                onChange={(value) => radioGroupHandleChange("gender", value)}
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
                                inputValue={specialist?.email}
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
                                name="surname"
                                inputIcon={<UserPen size={20} />}
                                inputPlaceholder="Иванов"
                                inputValue={specialist.surname}
                                onChange={handleChange} />
                        </div>

                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Имя</h4>
                            </div>

                            <FieldInput
                                name="name"
                                inputPlaceholder="Иван"
                                inputValue={specialist.name}
                                onChange={handleChange} />
                        </div>

                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Отчество</h4>
                            </div>

                            <FieldInput
                                name="patronymic"
                                inputPlaceholder="Иванович"
                                inputValue={specialist.patronymic}
                                onChange={handleChange} />
                        </div>
                    </div>

                    {/* контакты */}
                    <div className="profile-grid-item profile-grid-item-4">
                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Почта для контакта</h4>
                            </div>

                            <FieldInput
                                name="contactEmail"
                                inputIcon={<MailOpen size={20} />}
                                inputPlaceholder="example@mail.ru"
                                inputValue={specialist.contactEmail}
                                onChange={handleChange} />
                        </div>

                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Номер телефона</h4>
                            </div>

                            <FieldInput
                                name="contactPhone"
                                inputIcon={<Phone size={20} />}
                                inputPlaceholder="+7"
                                inputValue={specialist.contactPhone}
                                onChange={handleChange} />
                        </div>
                    </div>

                    {/* опыт работы */}
                    <div className="profile-grid-item profile-grid-item-5">
                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Опыт работы</h4>
                            </div>

                            <select name="experience"
                                onChange={handleChange}
                                value={specialist.experience ? specialist.experience : "Выберите..."}>
                                <option value={""}>Выберите...</option>
                                {jobExpirienceOptions && jobExpirienceOptions.map(exp => (
                                    <option value={exp.value}>{exp.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Насколько вы довольны работой</h4>
                            </div>

                            <select name="jobSatisfaction"
                                value={specialist.jobSatisfaction ? specialist.jobSatisfaction : "Выберите..."}
                                onChange={handleChange}>
                                <option value={""}>Выберите...</option>
                                {jobSatisfactionOptions && jobSatisfactionOptions.map(s => (
                                    <option value={s.label}>{s.value}</option>
                                ))}

                            </select>
                        </div>

                        <div className="profile-grid-wrapper">
                            <div className="profile-grid-item-header">
                                <h4>Ваша профессия</h4>
                            </div>

                            <select name="profession"
                                value={specialist.profession ? specialist.profession : "Выберите..."}
                                onChange={handleChange}>
                                <option value="">Ваша профессия</option>
                                {professions && professions.map(p => (
                                    <option value={p.value}>{p.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="profile-options profile-grid-item-6">
                        <Button
                            buttonLabel="Сохранить"
                            buttonFunction={updateData} />
                    </div>
                </div>
            </div>
        </div>
        <Toaster />
    </>)
}