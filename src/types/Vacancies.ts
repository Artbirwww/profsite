export interface Vacancy {
  id: string;
  source: string;
  region: Region;
  company: Company;
  "creation-date": string;
  date_modify: string;
  salary: string;
  salary_min: number;
  salary_max: number;
  "job-name": string;
  vac_url: string;
  employment: string;
  schedule: string;
  qualification: string;
  requirements: string;
  duty: string;
  category: Category;
  requirement: Requirement;
  addresses: Addresses;
  social_protected: string;
  contact_list: Contact[];
  contact_person: string;
  work_places: number;
  code_profession: string;
  typicalPosition: string;
  skills: any[];
  workPlaceType: WorkPlaceType;
  shift: any[];
  conditions: string;
  trainingDays: number;
  currency: string;
}

export interface Region {
  region_code: string;
  name: string;
}

export interface Company {
  companycode: string;
  email: string;
  "hr-agency": boolean;
  inn: string;
  kpp: string;
  name: string;
  ogrn: string;
  url: string;
}

export interface Category {
  specialisation: string;
}

export interface Requirement {
  education: string;
  experience: number;
}

export interface Addresses {
  address: Address[];
}

export interface Address {
  location: string;
  lng: string;
  lat: string;
}

export interface Contact {
  contact_type: string;
  contact_value: string;
}

export interface WorkPlaceType {
  workPlaceForeign: boolean;
  workPlaceOrdinary: boolean;
  workPlaceQuota: boolean;
  workPlaceSpecial: boolean;
}

export interface ApiResponse {
  status: string;
  request: {
    api: string;
  };
  meta: {
    total: string;
    limit?: number;
    offset?: number;
    error?: string;
  };
  results: {
    vacancies?: Array<{ vacancy: Vacancy }>;
  };
}