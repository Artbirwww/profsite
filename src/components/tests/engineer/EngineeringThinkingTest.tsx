import { useNavigate } from 'react-router-dom';
import { useTest } from '../../../contexts/TestContext';
import { useAuth } from '../../../contexts/AuthContext';
import { TestEngine } from '../testEngine/TestEngine';
import { engineeringThinkingConfig } from '../testConfigs';

interface EngineeringThinkingTestProps {
  onBack?: () => void;
}

export function EngineeringThinkingTest({ onBack }: EngineeringThinkingTestProps) {
  const navigate = useNavigate();
  const { saveTestResult } = useTest();
  const { getToken } = useAuth();

  const handleComplete = async (results: any) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      await saveTestResult({
        testType: 'engineering-thinking',
        score: results.score,
        answers: results.answers,
        metadata: {
          ...results.metadata,
        },
      }, token);
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