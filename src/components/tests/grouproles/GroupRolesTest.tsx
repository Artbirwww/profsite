import { useNavigate } from 'react-router-dom';
import { useTest } from '../../../contexts/TestContext';
import { TestEngine } from '../testengine/TestEngine';
import { groupRolesConfig } from '../testConfigs';

interface GroupRolesTestProps {
  onBack?: () => void;
}

export function GroupRolesTest({ onBack }: GroupRolesTestProps) {
  const navigate = useNavigate();
  const { saveTestResult } = useTest();

  const handleComplete = async (results: any) => {
    try {
      await saveTestResult({
        testType: 'group-roles',
        score: results.score,
        answers: results.answers,
        metadata: {
          ...results.metadata,
          dominantRole: results.details.dominantRole,
        },
      });
    } catch (error) {
      console.error('Failed to save test results:', error);
      throw error;
    }
  };

  return (
    <TestEngine
      testConfig={groupRolesConfig}
      onComplete={handleComplete}
      onBack={onBack}
    />
  );
}

export default GroupRolesTest;