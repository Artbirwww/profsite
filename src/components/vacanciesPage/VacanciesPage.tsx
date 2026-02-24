import React, { useEffect, useState, useCallback } from 'react';
import { fetchVacancies, VacanciesParams } from '../../services/api/vacanciesApi';
import { Vacancy } from '../../types/Vacancies';

const VacanciesPage: React.FC = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [params, setParams] = useState<VacanciesParams>({
    text: '',
    regionCode: '',
  });

  const loadMore = useCallback(async () => {
    if (loading || allLoaded) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchVacancies({
        ...params,
        limit: 3, // менять количество вакансий в выдаче, они выдаются 3 ... 6 ... 12 ... 16 ... и так далее
        offset: vacancies.length,
      });
      const items = data.results?.vacancies || [];
      const newVacancies = items.map(item => item.vacancy).filter(v => v != null);
      setVacancies(prev => [...prev, ...newVacancies]);
      const totalFromApi = parseInt(data.meta.total, 10) || 0;
      setTotal(totalFromApi);
      if (newVacancies.length === 0 || vacancies.length + newVacancies.length >= totalFromApi) {
        setAllLoaded(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }, [params, vacancies.length, loading, allLoaded]);

  useEffect(() => {
    setVacancies([]);
    setAllLoaded(false);
    loadMore();
  }, [params.text, params.regionCode]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams(prev => ({ ...prev, text: e.target.value }));
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams(prev => ({ ...prev, regionCode: e.target.value }));
  };

  return (
    <div>
      <h1>Вакансии</h1>
      <div>
        <input
          type="text"
          placeholder="Поиск"
          value={params.text}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          placeholder="Код региона"
          value={params.regionCode}
          onChange={handleRegionChange}
        />
      </div>
      {loading && vacancies.length === 0 && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <p>Найдено вакансий: {total}</p>
          {vacancies.length === 0 ? (
            <p>Нет вакансий</p>
          ) : (
            <div>
              {vacancies.map(vacancy => (
                <div key={vacancy.id}>
                  <h3>{vacancy['job-name']}</h3>
                  <p>Компания: {vacancy.company?.name || '—'}</p>
                  <p>Зарплата: {vacancy.salary_min && vacancy.salary_max ? `${vacancy.salary_min} – ${vacancy.salary_max} ${vacancy.currency || ''}` : vacancy.salary || '—'}</p>
                  <p>Регион: {vacancy.region?.name || '—'}</p>
                </div>
              ))}
            </div>
          )}
          {!allLoaded && (
            <button onClick={loadMore} disabled={loading}>
              {loading ? 'Загрузка...' : 'Загрузить ещё'}
            </button>
          )}
          {allLoaded && <p>Все вакансии загружены</p>}
        </>
      )}
    </div>
  );
};

export default VacanciesPage;