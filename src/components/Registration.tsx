import { useState } from 'react';
import { SimpleButton as Button } from './SimpleButton';
import { Input, Label, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './SimpleUI';
import { RealSelect } from './SimpleSelect';
import { GraduationCap, ArrowLeft } from './SimpleIcons';
import type { User, UserType } from '../App';

interface RegistrationProps {
  onRegister: (user: User) => void;
  onSwitchToLogin: () => void;
}

export function Registration({ onRegister, onSwitchToLogin }: RegistrationProps) {
  const [step, setStep] = useState<'type' | 'form'>('type');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [formStep, setFormStep] = useState(1); // Шаг формы для школьников
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    setFormStep(1); // Сброс на первый шаг формы
  };

  // Список регионов
  const regions = [
    { value: 'москва', label: 'Москва' },
    { value: 'санкт-петербург', label: 'Санкт-Петербург' },
    { value: 'московская область', label: 'Московская область' },
    { value: 'ленинградская область', label: 'Ленинградская область' },
    { value: 'краснодарский край', label: 'Краснодарский край' },
    { value: 'свердловская область', label: 'Свердловская область' },
    { value: 'новосибирская область', label: 'Новосибирская область' },
    { value: 'татарстан', label: 'Республика Татарстан' },
    { value: 'башкортостан', label: 'Республика Башкортостан' },
    { value: 'нижегородская область', label: 'Нижегородская область' },
    { value: 'челябинская область', label: 'Челябинская область' },
    { value: 'самарская область', label: 'Самарская область' },
    { value: 'ростовская область', label: 'Ростовская область' },
    { value: 'красноярский край', label: 'Красноярский край' },
  ];

  // Список городов в зависимости от региона
  const getCitiesByRegion = (regionValue: string) => {
    const citiesMap: { [key: string]: { value: string; label: string }[] } = {
      'москва': [{ value: 'москва', label: 'Москва' }],
      'санкт-петербург': [{ value: 'санкт-петербург', label: 'Санкт-Петербург' }],
      'московская область': [
        { value: 'балашиха', label: 'Балашиха' },
        { value: 'подольск', label: 'Подольск' },
        { value: 'химки', label: 'Химки' },
        { value: 'королёв', label: 'Королёв' },
        { value: 'мытищи', label: 'Мытищи' },
      ],
      'ленинградская область': [
        { value: 'гатчина', label: 'Гатчина' },
        { value: 'выборг', label: 'Выборг' },
        { value: 'всеволожск', label: 'Всеволожск' },
      ],
      'краснодарский край': [
        { value: 'краснодар', label: 'Краснодар' },
        { value: 'сочи', label: 'Сочи' },
        { value: 'новороссийск', label: 'Новороссийск' },
      ],
      'свердловская область': [
        { value: 'екатеринбург', label: 'Екатеринбург' },
        { value: 'нижний тагил', label: 'Нижний Тагил' },
      ],
      'новосибирская область': [
        { value: 'новосибирск', label: 'Новосибирск' },
        { value: 'бердск', label: 'Бердск' },
      ],
      'татарстан': [
        { value: 'казань', label: 'Казань' },
        { value: 'набережные челны', label: 'Набережные Челны' },
      ],
      'башкортостан': [
        { value: 'уфа', label: 'Уфа' },
        { value: 'стерлитамак', label: 'Стерлитамак' },
      ],
      'нижегородская область': [
        { value: 'нижний новгород', label: 'Нижний Новгород' },
        { value: 'дзержинск', label: 'Дзержинск' },
      ],
      'челябинская область': [
        { value: 'челябинск', label: 'Челябинск' },
        { value: 'магнитогорск', label: 'Магнитогорск' },
      ],
      'самарская область': [
        { value: 'самара', label: 'Самара' },
        { value: 'тольятти', label: 'Тольятти' },
      ],
      'ростовская область': [
        { value: 'ростов-на-дону', label: 'Ростов-на-Дону' },
        { value: 'таганрог', label: 'Таганрог' },
      ],
      'красноярский край': [
        { value: 'красноярск', label: 'Красноярск' },
        { value: 'норильск', label: 'Норильск' },
      ],
    };
    return citiesMap[regionValue] || [];
  };

  const validateStep1 = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!password) {
      newErrors.password = 'Пароль обязателен';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

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
      if (!schoolName) newErrors.schoolName = 'Название школы обязательно';
      if (!age) newErrors.age = 'Возраст обязателен';
      if (!grade) newErrors.grade = 'Класс обязателен';
      if (!gradeLetter) newErrors.gradeLetter = 'Буква класса обязательна';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!password) {
      newErrors.password = 'Пароль обязателен';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setFormStep(2);
      setErrors({}); // Очистка ошибок при переходе
    }
  };

  const handlePrevStep = () => {
    setFormStep(1);
    setErrors({}); // Очистка ошибок при возврате
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Для школьников проверяем второй шаг, для других - весь формат
    if (userType === 'школьник' && formStep === 2) {
      if (!validateStep2()) return;
    } else if (userType !== 'школьник') {
      if (!validateForm() || !userType) return;
    } else {
      return; // Не должны попасть сюда
    }

    const user: User = {
      email,
      password,
      type: userType,
    };

    if (userType === 'школьник') {
      user.lastName = lastName;
      user.firstName = firstName;
      user.middleName = middleName;
      user.gender = gender;
      user.region = region;
      user.city = city;
      user.schoolName = schoolName;
      user.address = address;
      user.age = parseInt(age);
      user.grade = parseInt(grade);
      user.gradeLetter = gradeLetter;
    }

    onRegister(user);
  };

  if (step === 'type') {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                <GraduationCap className="size-10 text-white" />
              </div>
            </div>
            <CardTitle>Добро пожаловать!</CardTitle>
            <CardDescription>
              Выберите, кем вы являетесь, чтобы начать регистрацию
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-auto py-6 hover:border-indigo-300 hover:bg-indigo-50 group"
              onClick={() => handleTypeSelect('школьник')}
            >
              <div className="text-left w-full">
                <p className="mb-1 text-gray-900 group-hover:text-indigo-700 transition-colors">Школьник</p>
                <p className="text-sm text-gray-500 group-hover:text-indigo-600 transition-colors">
                  Я учусь в школе
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="w-full h-auto py-6 hover:border-indigo-300 hover:bg-indigo-50 group"
              onClick={() => handleTypeSelect('студент')}
            >
              <div className="text-left w-full">
                <p className="mb-1 text-gray-900 group-hover:text-indigo-700 transition-colors">Студент</p>
                <p className="text-sm text-gray-500 group-hover:text-indigo-600 transition-colors">
                  Я обучаюсь в ВУЗе или колледже
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="w-full h-auto py-6 hover:border-indigo-300 hover:bg-indigo-50 group"
              onClick={() => handleTypeSelect('специалист')}
            >
              <div className="text-left w-full">
                <p className="mb-1 text-gray-900 group-hover:text-indigo-700 transition-colors">Специалист</p>
                <p className="text-sm text-gray-500 group-hover:text-indigo-600 transition-colors">
                  Я уже работаю
                </p>
              </div>
            </Button>
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              className="w-full"
              onClick={onSwitchToLogin}
            >
              <ArrowLeft className="size-4 mr-2" />
              Назад к входу
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md">
              <GraduationCap className="size-6 text-white" />
            </div>
            <div>
              <CardTitle>
                Регистрация - {userType}
              </CardTitle>
              <CardDescription>
                {userType === 'школьник' && formStep === 1 && 'Шаг 1 из 2: Учётные данные и личная информация'}
                {userType === 'школьник' && formStep === 2 && 'Шаг 2 из 2: Место проживания и образование'}
                {userType !== 'школьник' && 'Заполните все обязательные поля'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Поля для школьника - Шаг 1 */}
            {userType === 'школьник' && formStep === 1 && (
              <>
                <div className="space-y-4">
                  <div className="pb-2 border-b border-gray-100">
                    <h4 className="text-sm text-indigo-600">Учетные данные</h4>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Электронная почта *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@mail.ru"
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Пароль (минимум 6 символов) *</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••"
                      />
                      {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Подтверждение пароля *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••"
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
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия *</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Иванов"
                      />
                      {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя *</Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Иван"
                      />
                      {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="middleName">Отчество *</Label>
                      <Input
                        id="middleName"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                        placeholder="Иванович"
                      />
                      {errors.middleName && <p className="text-sm text-red-600">{errors.middleName}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Пол *</Label>
                    <RealSelect
                      value={gender}
                      onValueChange={setGender}
                      placeholder="Выберите пол"
                      options={[
                        { value: 'мужской', label: 'Мужской' },
                        { value: 'женский', label: 'Женский' },
                      ]}
                    />
                    {errors.gender && <p className="text-sm text-red-600">{errors.gender}</p>}
                  </div>
                </div>
              </>
            )}

            {/* Поля для школьника - Шаг 2 */}
            {userType === 'школьник' && formStep === 2 && (
              <>
                <div className="space-y-4">
                  <div className="pb-2 border-b border-gray-100">
                    <h4 className="text-sm text-indigo-600">Место проживания</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="region">Регион *</Label>
                      <RealSelect
                        value={region}
                        onValueChange={(value) => {
                          setRegion(value);
                          setCity(''); // Сброс города при смене региона
                        }}
                        placeholder="Выберите регион"
                        options={regions}
                      />
                      {errors.region && <p className="text-sm text-red-600">{errors.region}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Город *</Label>
                      <RealSelect
                        value={city}
                        onValueChange={setCity}
                        placeholder="Выберите город"
                        options={getCitiesByRegion(region)}
                        disabled={!region}
                      />
                      {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Адрес проживания *</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Укажите полный адрес"
                    />
                    {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="pb-2 border-b border-gray-100">
                    <h4 className="text-sm text-indigo-600">Образование</h4>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">Название школы *</Label>
                    <Input
                      id="schoolName"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="МБОУ СОШ №1"
                    />
                    {errors.schoolName && <p className="text-sm text-red-600">{errors.schoolName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Возраст *</Label>
                    <RealSelect
                      value={age}
                      onValueChange={setAge}
                      placeholder="Выберите возраст"
                      options={Array.from({ length: 14 }, (_, i) => ({
                        value: String(i + 6),
                        label: String(i + 6),
                      }))}
                    />
                    {errors.age && <p className="text-sm text-red-600">{errors.age}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="grade">Класс *</Label>
                      <RealSelect
                        value={grade}
                        onValueChange={setGrade}
                        placeholder="Выберите класс"
                        options={Array.from({ length: 11 }, (_, i) => ({
                          value: String(i + 1),
                          label: `${i + 1} класс`,
                        }))}
                      />
                      {errors.grade && <p className="text-sm text-red-600">{errors.grade}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gradeLetter">Буква класса *</Label>
                      <RealSelect
                        value={gradeLetter}
                        onValueChange={setGradeLetter}
                        placeholder="Выберите букву"
                        options={[
                          { value: 'а', label: 'А' },
                          { value: 'б', label: 'Б' },
                          { value: 'в', label: 'В' },
                          { value: 'г', label: 'Г' },
                          { value: 'д', label: 'Д' },
                        ]}
                      />
                      {errors.gradeLetter && <p className="text-sm text-red-600">{errors.gradeLetter}</p>}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Общие поля для студентов и специалистов */}
            {(userType === 'студент' || userType === 'специалист') && (
              <>
                <div className="space-y-4">
                  <div className="pb-2 border-b border-gray-100">
                    <h4 className="text-sm text-indigo-600">Учетные данные</h4>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Электронная почта *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@mail.ru"
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Пароль (минимум 6 символов) *</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••"
                      />
                      {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Подтверждение пароля *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••"
                      />
                      {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <svg className="size-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-amber-900 mb-1">В разработке</p>
                      <p className="text-sm text-amber-700">
                        Дополнительные поля для {userType}ов находятся в разработке.
                        Пока достаточно email и пароля для регистрации.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex gap-3">
            {userType === 'школьник' && formStep === 1 ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('type')}
                >
                  <ArrowLeft className="size-4 mr-2" />
                  Назад
                </Button>
                <Button 
                  type="button" 
                  className="flex-1"
                  onClick={handleNextStep}
                >
                  Далее
                </Button>
              </>
            ) : userType === 'школьник' && formStep === 2 ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                >
                  <ArrowLeft className="size-4 mr-2" />
                  Назад
                </Button>
                <Button type="submit" className="flex-1">
                  Зарегистрироваться
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('type')}
                >
                  <ArrowLeft className="size-4 mr-2" />
                  Назад
                </Button>
                <Button type="submit" className="flex-1">
                  Зарегистрироваться
                </Button>
              </>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}