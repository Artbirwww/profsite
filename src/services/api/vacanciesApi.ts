import { ApiResponse } from '../../types/Vacancies';

const VAC_URL = 'http://opendata.trudvsem.ru/api/v1/vacancies';

export interface VacanciesParams {
  text?: string;
  regionCode?: string;
  limit?: number;
  offset?: number;
}

export async function fetchVacancies(params: VacanciesParams): Promise<ApiResponse> {
  const url = new URL(params.regionCode ? `${VAC_URL}/region/${params.regionCode}` : VAC_URL);
  
  const searchParams = new URLSearchParams();
  if (params.text) searchParams.append('text', params.text);
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.offset) searchParams.append('offset', params.offset.toString());

  url.search = searchParams.toString();

  const response = await fetch(url.toString());
  const data: ApiResponse = await response.json();
  
  if (data.status !== '200') {
    throw new Error(`API error: ${data.meta?.error || 'unknown error'}`);
  }

  return data;
}