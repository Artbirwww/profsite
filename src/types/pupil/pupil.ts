import { Gender } from "./gender"

export interface PupilDTO {
  id?: number;
  name: string;
  surname: string;
  patronymic: string;
  birthday: string;
  school: string;
  healthCondition: string;
  nationality: string;
  extraActivities: string;
  classNumber: number;
  classLabel: string;
  gender: Gender;
}

export interface PupilResponse {
  email: string;
  pupilDTO: PupilDTO;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PaginatedPupilResponse {
  content: PupilResponse[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}

export interface PupilListResponse {
    content: PupilResponse[];
    numberOfElements: number;
    size: number;
    number: number; //number of the current page u in
    totalElements: number;
    totalPages: number;
}

export const PupilDataKeys = ["email", "password", "name", "surname", "patronymic", 
    "birthday", "school", "classNumber", "classLabel", "gender"];