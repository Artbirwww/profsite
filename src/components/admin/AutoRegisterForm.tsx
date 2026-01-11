import { useState } from 'react';
import { authApi } from '../../services/api/authApi';

export default function AutoRegisterForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    const account = {
      email: fd.get('email') as string,
      password: 'Password123!',
    };

    const pupil = {
      name: fd.get('name') as string,
      surname: fd.get('surname') as string,
      patronymic: fd.get('patronymic') as string,
      birthday: fd.get('birthday') as string,
      school: fd.get('school') as string,
      healthCondition: fd.get('healthCondition') as string,
      nationality: fd.get('nationality') as string,
      extraActivities: fd.get('extraActivities') as string,
      classNumber: parseInt(fd.get('classNumber') as string) || 0,
      classLabel: fd.get('classLabel') as string,
      gender: fd.get('gender') as 'MALE' | 'FEMALE',
    };

    try {
      setLoading(true);
      const res = await authApi.autoRegister(account, pupil);
      setResult(res);
      localStorage.setItem('pupilId', String(res.pupilDTO?.id || res.id));
      alert(`Ученик ${res.pupilDTO?.name || res.name} создан. ID: ${res.pupilDTO?.id || res.id}`);
    } catch (err) {
      alert('Ошибка: ' + (err instanceof Error ? err.message : 'неизвестно'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2>Авто-регистрация ученика</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <button type="submit" disabled={loading}>
          {loading ? 'Создание...' : 'Создать аккаунт'}
        </button>
        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      </form>
    </div>
  );
}