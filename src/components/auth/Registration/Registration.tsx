// src/components/auth/Registration/Registration.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Input, Label, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../SimpleUI';
import { RealSelect } from '../../ui/inputs/SimpleSelect';
import { GraduationCap, ArrowLeft } from '../../ui/display/SimpleIcons';
// Импортируем изображение
import unlimitedBg from '../../../res/img/unnamed.png';

type UserType = 'школьник' | 'студент' | 'специалист';

interface User {
  email: string;
  password: string;
  type: UserType;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  gender?: string;
  region?: string;
  city?: string;
  schoolName?: string;
  address?: string;
  age?: number;
  grade?: number;
  gradeLetter?: string;
}

export function Registration() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<'type' | 'form'>('type');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [formStep, setFormStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Общие поля
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Поля для школьника
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [gradeLetter, setGradeLetter] = useState('');

  const handleTypeSelect = (type: UserType) => {
    setUserType(type);
    setStep('form');
    setFormStep(1);
  };

  const regions = [
    { value: 'тыва', label: 'Республика Тыва' },
    { value: 'хакасия', label: 'Республика Хакасия' },
    { value: 'красноярский край', label: 'Красноярский край' },
    { value: 'новосибирская область', label: 'Новосибирская область' },
    { value: 'томская область', label: 'Томская область' },
  ];

  const getCitiesByRegion = (regionValue: string) => {
    const citiesMap: { [key: string]: { value: string; label: string }[] } = {
      'тыва': [{ value: 'кызыл', label: 'Кызыл' }, { value: 'ак-довурак', label: 'Ак-Довурак' }, { value: 'туран', label: 'Туран' }, { value: 'чадан', label: 'Чадан' }],
      'хакасия': [{ value: 'абакан', label: 'Абакан' }, { value: 'черногорск', label: 'Черногорск' }, { value: 'саяногорск', label: 'Саяногорск' }, { value: 'усть-абакан', label: 'Усть-Абакан' }, { value: 'абаза', label: 'Абаза' }],
      'красноярский край': [{ value: 'красноярск', label: 'Красноярск' }, { value: 'норильск', label: 'Норильск' }, { value: 'ачинск', label: 'Ачинск' }, { value: 'минусинск', label: 'Минусинск' }, { value: 'канск', label: 'Канск' }, { value: 'железногорск', label: 'Железногорск' }, { value: 'лесосибирск', label: 'Лесосибирск' }],
      'новосибирская область': [{ value: 'новосибирск', label: 'Новосибирск' }, { value: 'бердск', label: 'Бердск' }, { value: 'искитим', label: 'Искитим' }, { value: 'обь', label: 'Обь' }],
      'томская область': [{ value: 'томск', label: 'Томск' }, { value: 'северск', label: 'Северск' }, { value: 'асино', label: 'Асино' }, { value: 'колпашево', label: 'Колпашево' }],
    };
    return citiesMap[regionValue] || [];
  };

  const validateStep1 = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!email) newErrors.email = 'Email обязателен';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Некорректный email';
    if (!password) newErrors.password = 'Пароль обязателен';
    else if (password.length < 6) newErrors.password = 'Минимум 6 символов';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';
    if (userType === 'школьник') {
      if (!lastName) newErrors.lastName = 'Фамилия обязательна';
      if (!firstName) newErrors.firstName = 'Имя обязательно';
      if (!middleName) newErrors.middleName = 'Отчество обязательно';
      if (!gender) newErrors.gender = 'Пол обязателен';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (userType === 'школьник') {
      if (!region) newErrors.region = 'Регион обязателен';
      if (!city) newErrors.city = 'Город обязателен';
      if (!address) newErrors.address = 'Адрес обязателен';
      if (!schoolName) newErrors.schoolName = 'Школа обязательна';
      if (!age) newErrors.age = 'Возраст обязателен';
      if (!grade) newErrors.grade = 'Класс обязателен';
      if (!gradeLetter) newErrors.gradeLetter = 'Буква обязательна';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (userType === 'школьник') {
    if (formStep === 1) {
      if (validateStep1()) setFormStep(2);
      return;
    } else if (formStep === 2) {
      if (!validateStep2()) return;
    }
  } else {
    if (!validateStep1()) return;
  }

  // ✅ Формируем данные ДО вызова
  const emailVal = email.trim();
  const passwordVal = password;
  const firstNameVal = userType === 'школьник' ? firstName.trim() : '';
  const lastNameVal = userType === 'школьник' ? lastName.trim() : '';

  try {
    setIsSubmitting(true);

    // ✅ Передаём только строки — никаких undefined
    await register(emailVal, passwordVal, firstNameVal, lastNameVal);

    // ✅ После успешной регистрации — редирект
    navigate('/dashboard', { replace: true });

  } catch (err) {
    console.error('Registration error:', err);
    const msg = err instanceof Error ? err.message : 'Неизвестная ошибка регистрации';
    setErrors({ submit: msg });
  } finally {
    setIsSubmitting(false);
  }
};

  if (step === 'type') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage: `url(${unlimitedBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 w-full max-w-2xl">
          <Card className="w-full bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                  <GraduationCap className="size-10 text-white" />
                </div>
              </div>
              <CardTitle>Добро пожаловать!</CardTitle>
              <CardDescription>Выберите, кем вы являетесь</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {(['школьник', 'студент', 'специалист'] as UserType[]).map(type => (
                <Button
                  key={type}
                  variant="outline"
                  className="w-full h-auto py-6 hover:border-indigo-300 hover:bg-indigo-50 group"
                  onClick={() => handleTypeSelect(type)}
                  disabled={isSubmitting}
                >
                  <div className="text-left w-full">
                    <p className="mb-1 text-gray-900 group-hover:text-indigo-700">
                      {type === 'школьник' ? 'Школьник' : type === 'студент' ? 'Студент' : 'Специалист'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {type === 'школьник'
                        ? 'Я учусь в школе'
                        : type === 'студент'
                        ? 'Я обучаюсь в ВУЗе или колледже'
                        : 'Я уже работаю'}
                    </p>
                  </div>
                </Button>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full border-white/30 bg-white/60 hover:bg-white/80" onClick={() => navigate('/login')} disabled={isSubmitting}>
                <ArrowLeft className="size-4 mr-2" /> Назад к входу
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 py-8"
      style={{
        backgroundImage: `url(${unlimitedBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative z-10 w-full max-w-2xl">
        <Card className="w-full bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md">
                <GraduationCap className="size-6 text-white" />
              </div>
              <div>
                <CardTitle>Регистрация — {userType}</CardTitle>
                <CardDescription>
                  {userType === 'школьник'
                    ? `Шаг ${formStep} из 2: ${formStep === 1 ? 'Учётные данные' : 'Место проживания'}`
                    : 'Заполните email и пароль'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {errors.submit && (
                <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm">
                  {errors.submit}
                </div>
              )}

              {userType === 'школьник' && formStep === 1 && (
                <>
                  <div className="space-y-4">
                    <div className="pb-2 border-b border-gray-100">
                      <h4 className="text-sm text-indigo-600">Учётные данные</h4>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="example@mail.ru"
                        disabled={isSubmitting}
                        className="bg-white/80"
                      />
                      {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Пароль *</Label>
                        <Input
                          type="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="••••••"
                          disabled={isSubmitting}
                          className="bg-white/80"
                        />
                        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>Подтвердите пароль *</Label>
                        <Input
                          type="password"
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          placeholder="••••••"
                          disabled={isSubmitting}
                          className="bg-white/80"
                        />
                        {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="pb-2 border-b border-gray-100">
                      <h4 className="text-sm text-indigo-600">Личная информация</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {(['lastName', 'firstName', 'middleName'] as const).map(field => (
                        <div key={field} className="space-y-2">
                          <Label>{field === 'lastName' ? 'Фамилия' : field === 'firstName' ? 'Имя' : 'Отчество'} *</Label>
                          <Input
                            value={field === 'lastName' ? lastName : field === 'firstName' ? firstName : middleName}
                            onChange={e =>
                              field === 'lastName'
                                ? setLastName(e.target.value)
                                : field === 'firstName'
                                ? setFirstName(e.target.value)
                                : setMiddleName(e.target.value)
                            }
                            placeholder={field === 'lastName' ? 'Иванов' : field === 'firstName' ? 'Иван' : 'Иванович'}
                            disabled={isSubmitting}
                            className="bg-white/80"
                          />
                          {errors[field] && <p className="text-sm text-red-600">{errors[field]}</p>}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label>Пол *</Label>
                      <RealSelect
                        value={gender}
                        onValueChange={setGender}
                        placeholder="Выберите пол"
                        options={[
                          { value: 'мужской', label: 'Мужской' },
                          { value: 'женский', label: 'Женский' },
                        ]}
                        disabled={isSubmitting}
                      />
                      {errors.gender && <p className="text-sm text-red-600">{errors.gender}</p>}
                    </div>
                  </div>
                </>
              )}

              {userType === 'школьник' && formStep === 2 && (
                <>
                  <div className="space-y-4">
                    <div className="pb-2 border-b border-gray-100">
                      <h4 className="text-sm text-indigo-600">Место проживания</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Регион *</Label>
                        <RealSelect
                          value={region}
                          onValueChange={v => {
                            setRegion(v);
                            setCity('');
                          }}
                          placeholder="Выберите регион"
                          options={regions}
                          disabled={isSubmitting}
                        />
                        {errors.region && <p className="text-sm text-red-600">{errors.region}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>Город *</Label>
                        <RealSelect
                          value={city}
                          onValueChange={setCity}
                          placeholder="Выберите город"
                          options={getCitiesByRegion(region)}
                          disabled={!region || isSubmitting}
                        />
                        {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Адрес *</Label>
                      <Input
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Улица, дом, квартира"
                        disabled={isSubmitting}
                        className="bg-white/80"
                      />
                      {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="pb-2 border-b border-gray-100">
                      <h4 className="text-sm text-indigo-600">Образование</h4>
                    </div>
                    <div className="space-y-2">
                      <Label>Школа *</Label>
                      <Input
                        value={schoolName}
                        onChange={e => setSchoolName(e.target.value)}
                        placeholder="МБОУ СОШ №1"
                        disabled={isSubmitting}
                        className="bg-white/80"
                      />
                      {errors.schoolName && <p className="text-sm text-red-600">{errors.schoolName}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Возраст *</Label>
                        <RealSelect
                          value={age}
                          onValueChange={setAge}
                          placeholder="Возраст"
                          options={Array.from({ length: 14 }, (_, i) => ({
                            value: String(i + 6),
                            label: `${i + 6}`,
                          }))}
                          disabled={isSubmitting}
                        />
                        {errors.age && <p className="text-sm text-red-600">{errors.age}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>Класс *</Label>
                        <RealSelect
                          value={grade}
                          onValueChange={setGrade}
                          placeholder="Класс"
                          options={Array.from({ length: 11 }, (_, i) => ({
                            value: String(i + 1),
                            label: `${i + 1}`,
                          }))}
                          disabled={isSubmitting}
                        />
                        {errors.grade && <p className="text-sm text-red-600">{errors.grade}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>Буква *</Label>
                        <RealSelect
                          value={gradeLetter}
                          onValueChange={setGradeLetter}
                          placeholder="Буква"
                          options={[
                            { value: 'а', label: 'А' },
                            { value: 'б', label: 'Б' },
                            { value: 'в', label: 'В' },
                          ]}
                          disabled={isSubmitting}
                        />
                        {errors.gradeLetter && <p className="text-sm text-red-600">{errors.gradeLetter}</p>}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {(userType === 'студент' || userType === 'специалист') && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="example@mail.ru"
                      disabled={isSubmitting}
                      className="bg-white/80"
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Пароль *</Label>
                      <Input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••"
                        disabled={isSubmitting}
                        className="bg-white/80"
                      />
                      {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label>Подтвердите пароль *</Label>
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="••••••"
                        disabled={isSubmitting}
                        className="bg-white/80"
                      />
                      {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                    Дополнительные поля для {userType === 'студент' ? 'студентов' : 'специалистов'} будут добавлены в будущем.
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex gap-3">
              {userType === 'школьник' && formStep === 1 ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('type')}
                    disabled={isSubmitting}
                    className="border-white/30 bg-white/60 hover:bg-white/80"
                  >
                    <ArrowLeft className="size-4 mr-1" /> Назад
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? 'Регистрация...' : 'Далее'}
                  </Button>
                </>
              ) : userType === 'школьник' && formStep === 2 ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormStep(1)}
                    disabled={isSubmitting}
                    className="border-white/30 bg-white/60 hover:bg-white/80"
                  >
                    <ArrowLeft className="size-4 mr-1" /> Назад
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('type')}
                    disabled={isSubmitting}
                    className="border-white/30 bg-white/60 hover:bg-white/80"
                  >
                    <ArrowLeft className="size-4 mr-1" /> Назад
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                  </Button>
                </>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}