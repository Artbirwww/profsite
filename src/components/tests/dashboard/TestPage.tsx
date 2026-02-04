// Данный файл раньше выступал заместо дашборда, скоро я солью 3 этих файла в единый файл
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../../contexts/AppContext';
import { SimpleButton as Button } from '../../ui/buttons/SimpleButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../SimpleUI';
import { SimpleProgress as Progress } from '../../ui/feedback/SimpleProgress';
import { ArrowLeft } from '../../ui/display/SimpleIcons';
import { TemperamentTest } from '../temperament/TemperamentTest';
import { GroupRolesTest } from '../grouproles/GroupRolesTest';
import { ProfessionalOrientationTest } from '../profsphere/ProfessionalOrientationTest';
import { EngineeringThinkingTest } from '../engineer/EngineeringThinkingTest';
import IQTest from '../iqpotencial/iqpotencial';


export function TestPage() {
  const { group } = useParams<{ group: string }>();
  const { currentUser, handleTestGroupComplete } = useApp();
  const navigate = useNavigate();

  // ✅ Состояния вынесены на уровень компонента — критически важно!
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!currentUser || !group) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUser, group, navigate]);

  if (!currentUser || !group) {
    return null;
  }

  // Специальные тесты — рендерим как есть
  if (group === 'temperament') {
    return <TemperamentTest />;
  }
  if (group === 'groupRoles') {
    return <GroupRolesTest />;
  }
  if (group === 'professionalOrientation') {
    return <ProfessionalOrientationTest />;
  }
  if (group === 'engineeringThinking') {
    return <EngineeringThinkingTest />;
  }

  // Специальный тест: intellectualPotential
  if (group === 'intellectualPotential') {
    return <IQTest />;
  }

  // Неизвестная группа — перенаправляем
  navigate('/dashboard', { replace: true });
  return null;
}