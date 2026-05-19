import { saveAs } from "file-saver";
import { TestResultResponse } from "../../types/testTypes";
import { AccountsTests } from "../../types/account/account";

export const exportToJson = (data: AccountsTests[], filename: string = "result") => {
    if (!data.length) {
        console.error("No data to export")
        throw new Error("No data to export check dates")
    }
    try {
        const jsonStr = JSON.stringify(data, null, 2)
        const blob = new Blob([jsonStr], {type: 'application/json'})
        saveAs(blob, filename)

    } catch(err) {
        console.error(err)
    }
}