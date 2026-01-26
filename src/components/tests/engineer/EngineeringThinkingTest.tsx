import { useNavigate } from 'react-router-dom';
import { useTest } from '../../../contexts/TestContext';
import { TestEngine } from '../testengine/TestEngine';
import { engineeringThinkingConfig } from '../testConfigs';

interface EngineeringThinkingTestProps {
  onBack?: () => void;
}

export function EngineeringThinkingTest({ onBack }: EngineeringThinkingTestProps) {
  const navigate = useNavigate();
  const { saveTestResult } = useTest();

  const handleComplete = async (results: any) => {
    try {
      await saveTestResult({
        testType: 'engineering-thinking',
        score: results.score,
        answers: results.answers,
        metadata: {
          ...results.metadata,
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