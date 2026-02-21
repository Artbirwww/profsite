import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../services/api/authApi';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Input, Label, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../SimpleUI';
import { BubbleBackground } from '../BubbleBackground';

type UserType = 'школьник' | 'студент' | 'специалист';

interface User {
  email: string;
  password: string;
  confirmPassword: string;
  type: UserType;
}

export function Registration() {
  const navigate = useNavigate();

  const [step, setStep] = useState<'type' | 'form'>('type');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    confirmPassword: '',
    type: 'школьник',
  });

  const handleTypeSelect = (type: UserType) => {
    setUserType(type);
    setUser(prev => ({ ...prev, type }));
    setStep('form');
  };

  const validateStep1 = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!user.email) newErrors.email = 'Email обязателен';
    else if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = 'Некорректный email';
    if (!user.password) newErrors.password = 'Пароль обязателен';
    else if (user.password.length < 6) newErrors.password = 'Минимум 6 символов';
    if (user.password !== user.confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep1()) return;

    try {
      setIsSubmitting(true);
      await authApi.register(user.email.trim(), user.password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Registration error:', err);
      const msg = err instanceof Error ? err.message : 'Неизвестная ошибка регистрации';
      setErrors({ submit: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof User, value: string) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  if (step === 'type') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <BubbleBackground />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 w-full max-w-2xl">
          <Card className="w-full bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                </div>
              </div>
              <CardTitle>Добро пожаловать!</CardTitle>
              <CardDescription>Выберите, кем вы являетесь</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {(['школьник', 'специалист', 'эксперт'] as UserType[]).map(type => (
                <Button
                  key={type}
                  variant="outline"
                  className="w-full h-auto py-6 hover:border-indigo-300 hover:bg-indigo-50 group"
                  onClick={() => handleTypeSelect(type)}
                  disabled={isSubmitting}
                >
                  <div className="text-left w-full">
                    <p className="mb-1 text-gray-900 group-hover:text-indigo-700">
                      {type === 'школьник' ? 'Школьник' : type === 'специалист' ? 'Специалист' : 'Эксперт'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {type === 'школьник'
                        ? 'Я учусь в школе'
                        : type === 'специалист'
                        ? '***здесь должны быть данные про специалиста'
                        : '***здесь должны быть данные про эксперта'}
                    </p>
                  </div>
                </Button>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full border-white/30 bg-white/60 hover:bg-white/80" onClick={() => navigate('/login')} disabled={isSubmitting}>
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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <BubbleBackground />
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative z-10 w-full max-w-2xl">
        <Card className="w-full bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md">
              </div>
              <div>
                <CardTitle>Регистрация — {userType}</CardTitle>
                <CardDescription>
                  Заполните email и пароль
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

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={e => updateField('email', e.target.value)}
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
                      value={user.password}
                      onChange={e => updateField('password', e.target.value)}
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
                      value={user.confirmPassword}
                      onChange={e => updateField('confirmPassword', e.target.value)}
                      placeholder="••••••"
                      disabled={isSubmitting}
                      className="bg-white/80"
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>
                </div>

                {userType === 'школьник' && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                    После регистрации вы сможете заполнить профиль (ФИО, школа, класс и т.д.) в личном кабинете.
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep('type')}
                disabled={isSubmitting}
                className="border-white/30 bg-white/60 hover:bg-white/80"
              >
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div> 
    </div>
  );
}