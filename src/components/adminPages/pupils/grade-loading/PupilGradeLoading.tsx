import { Toaster } from "react-hot-toast"
import style from "./pupil-grade-loading.module.css"
import classNames from "classnames"
export const PupilGradeLoading = () => {

    return (<>
    <div className={style["form-wrapper"]}>
        <p>Форма выгрузки оценок для учеников</p>
        <div className={style["data-loading-form"]}>
            <div className={style["options"]}>
                <input type="file" className={classNames(style["default"], style["primary"])} />
                <button className={classNames(style["default"], style["success"])}>Отправить</button>
            </div>
        </div>
    </div>
        
        <Toaster position="top-right"/>
    </>
        
    )
}