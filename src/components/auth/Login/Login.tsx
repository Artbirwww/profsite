// src/components/auth/Login/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../contexts/AppContext'; // ← путь обновлён
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Input, Label, Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../../SimpleUI';
import { GraduationCap } from '../../SimpleIcons';

export function Login() {
  const { handleLogin } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    const success = handleLogin(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Неверный email или пароль');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
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
              />
            </div>
            {error && (
              <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button type="submit" className="w-full">
              Войти
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate('/register')}
            >
              Зарегистрироваться
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}