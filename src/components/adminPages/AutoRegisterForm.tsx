// Простая форма для админа (можно в /admin/auto-register)
import { useState } from 'react';
import { autoRegister } from '../../services/api/pupilApi';

export default function AutoRegisterForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    const data = {
      accountRegisterRequestDTO: {
        email: fd.get('email') as string,
        password: 'Password123!', // дефолтный пароль
      },
      pupilDTO: {
        name: fd.get('name') as string,
        surname: fd.get('surname') as string,
        patronymic: fd.get('patronymic') as string,
        birthday: fd.get('birthday') as string,
        school: fd.get('school') as string,
        healthCondition: fd.get('healthCondition') as string,
        nationality: fd.get('nationality') as string,
        extraActivities: fd.get('extraActivities') as string,
        gender: fd.get('gender') as 'MALE' | 'FEMALE',
        className: fd.get('className') as string,
      }
    };

    try {
      setLoading(true);
      const res = await autoRegister(data);
      setResult(res);
      localStorage.setItem('pupilId', String(res.id)); // ✅ сохраняем ID для тестов
      alert(`✅ Ученик ${res.name} создан. ID: ${res.id}`);
    } catch (err) {
      alert('❌ Ошибка: ' + (err instanceof Error ? err.message : 'неизвестно'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2>Авто-регистрация ученика</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Поля: email, name, surname, birthday (type="date"), className, gender (select), school... */}
        <button type="submit" disabled={loading}>
          {loading ? 'Создание...' : 'Создать аккаунт'}
        </button>
        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      </form>
    </div>
  );
}