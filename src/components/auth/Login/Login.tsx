// src/components/auth/Login/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext'; // Импортируем useAuth вместо useApp
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Input, Label, Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../../SimpleUI';
import { GraduationCap } from '../../ui/display/SimpleIcons';
import unlimitedBg from '../../../res/img/unnamed.png';

export function Login() {
  const { login } = useAuth(); // Используем login из AuthContext
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => { // Делаем асинхронным
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password); // Теперь login - это асинхронная функция
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неверный email или пароль');
    } finally {
      setIsLoading(false);
    }
  };

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
      
      <div className="relative z-10 w-full max-w-md">
        <Card className="w-full bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                <GraduationCap className="size-10 text-white" />
              </div>
            </div>
            <CardTitle>Вход в систему</CardTitle>
            <CardDescription>
              Система профориентации для школьников, студентов и специалистов
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Электронная почта</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="bg-white/80"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="bg-white/80"
                  disabled={isLoading}
                />
              </div>
              {error && (
                <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
                  <p className="text-red-700">{error}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Вход...' : 'Войти'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full border-white/30 bg-white/60 hover:bg-white/80"
                onClick={() => navigate('/register')}
                disabled={isLoading}
              >
                Зарегистрироваться
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}