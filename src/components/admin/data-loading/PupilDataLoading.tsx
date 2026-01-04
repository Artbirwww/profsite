import { ChangeEvent, Component, useEffect, useState } from "react";
import { useExcelMapper } from "../../../hooks/useExcelMapper";
import { PupilDataKeys, PupilDTO} from '../../../types/pupil/pupil'
import {type AccountApiRegisterDTO} from '../../../types/pupil/account'
import { pupilService } from "../../../services/api/pupilApi";
export const PupilDataLoading = () => {
    const {rawData, headers, setHeaders, processExcelFile} = useExcelMapper()
    const [pupilKeys, setPupilKeys] = useState(PupilDataKeys)
    const [headerMappings, setHeaderMappings] = useState<Record<string, string>>({})

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
    const response = await pupilService.autoRegisterAll(data)
    console.log(response)
  }

  return (
    <>
      <div>
        <input type="file" onChange={pickupFileHander} />
      </div>
      {headers && 
        <div className='mapping-fields'>
          {headers.map(name => (
            <div className='field'>
              <p>{name}</p>
              <select onChange={(e: ChangeEvent<HTMLSelectElement>) => {
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
        <button onClick={applyMappings}>Отправить</button>
    </>
  )
}
