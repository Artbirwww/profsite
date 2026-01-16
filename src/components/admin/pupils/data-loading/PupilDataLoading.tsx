import { ChangeEvent, Component, useEffect, useRef, useState } from "react";
import { useExcelMapper } from "../../../../hooks/useExcelMapper";
import { PupilDataKeys, PupilDTO} from '../../../../types/pupil/pupil'
import {type AccountApiRegisterDTO} from '../../../../types/pupil/account'
import { pupilService } from "../../../../services/api/pupilApi";
import { authApi } from "../../../../services/api/authApi";
import style from "./pupil-data-loading.module.css"
import classNames from "classnames"
import toast, {Toaster} from 'react-hot-toast'
export const PupilDataLoading = () => {
    const {rawData, headers, setHeaders, processExcelFile, resetData} = useExcelMapper()
    const [pupilKeys, setPupilKeys] = useState(PupilDataKeys)
    const [headerMappings, setHeaderMappings] = useState<Record<string, string>>({})

    const fileRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (!headers) return

        const initialMappings: Record<string, string> = {};
        headers.forEach(header => {
            // Try to auto-match or leave empty
            initialMappings[header] = '';
        });
        setHeaderMappings(initialMappings);
        
  }, [headers])

  const pickupFileHander = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    processExcelFile(file as File)
  }

  const handlePupilKeys = (headerName: string, selectedKey: string) => {
    setHeaderMappings(prev => ({...prev, [headerName]: selectedKey}))
  }

  //change fields in rawData to what user picked
  const applyMappings = () => {
    const mappedData = rawData?.map(row => {
      const pupil: any = {}
      const account: any = {}
      Object.entries(headerMappings).forEach(([header, mappedKey]) => {
        if (mappedKey === "email" || mappedKey == "password"){
          account[mappedKey] = row[header]
        }
        else if (mappedKey && row[header] !== undefined)
          pupil[mappedKey] = row[header]
      })
      return {"pupilDTO": pupil, "accountRegisterRequestDTO": account} as AccountApiRegisterDTO
    })
    console.log(mappedData)
    sendPupils(mappedData)
  }

  const sendPupils = async (data: AccountApiRegisterDTO[]) => {
    if (rawData.length === 0) {
      toast.error("Выберите файл", {style : {backgroundColor: "#FF7F7F"}})
      return
    }
    try {
      const response = await authApi.autoRegisterAll(data)
      console.log(data)
      toast.success("Данные успешно загружены")
      resetData()
      if (fileRef.current) {
        fileRef.current.value = ""
      }
    } catch(err) {
      console.log(err)
      toast.error("Ошибка, не удалось загрузить данные", {style : {backgroundColor: "#FF7F7F"}})
    }
  }

  return (
    <div className={style["form-wrapper"]}>
      <p>Форма автоматической регистрации студентов</p>
      <div className={style["data-loading-form"]}>

        {headers && 
          <div className={style['mapping-fields']}>
            {headers.map(name => (
              <div className={ classNames(style['field'])}>
                <p>{name}</p>
                <select className={style["default"]} onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    handlePupilKeys(name, e.target.value)
                  }}>
                    <option value={""}>Выберите поле</option>
                  {pupilKeys.map(key => (
                    <option value={key}>{key}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>}
          <div className = {style["options"]}>
              <input ref={fileRef} className={classNames(style["default"], style["primary"])} type="file" onChange={pickupFileHander} />
              <button className={classNames(style["default"], style["success"])} onClick={applyMappings}>Отправить</button>
          </div>
          
      </div>
      <Toaster position="top-right" />
    </div>
  )
}
