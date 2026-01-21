import { useNavigate } from 'react-router-dom';
import { useTest } from '../../../contexts/TestContext';
import { TestEngine } from '../TestEngine';
import { engineeringThinkingConfig } from '../testConfigs';
import { useAuth } from '../../../contexts/AuthContext';

interface EngineeringThinkingTestProps {
  onBack?: () => void;
}

export function EngineeringThinkingTest({ onBack }: EngineeringThinkingTestProps) {
  const navigate = useNavigate();
  const { saveTestResult } = useTest();
  const { user } = useAuth();

  const handleComplete = async (results: any) => {
    try {
      await saveTestResult({
        testType: 'engineering-thinking',
        score: results.score,
        answers: results.answers,
        metadata: {
          ...results.metadata,
          userEmail: user?.email,
          userName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
        },
      });
    } catch (error) {
      console.error('Failed to save test results:', error);
      throw error;
    }
  };

  return (
    <TestEngine
      testConfig={engineeringThinkingConfig}
      onComplete={handleComplete}
      onBack={onBack}
    />
  );
}

export default EngineeringThinkingTest;