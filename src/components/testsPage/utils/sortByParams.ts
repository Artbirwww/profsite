import { PsychParam } from "../../../types/testTypes";


export const sortByParam = (params: PsychParam[]) => [...params].sort((a, b) => b.param - a.param) 