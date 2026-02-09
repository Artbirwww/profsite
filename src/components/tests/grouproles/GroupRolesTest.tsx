import { useTest } from '../../../contexts/TestContext';
import { useAuth } from '../../../contexts/AuthContext';
import { TestEngine } from '../testengine/TestEngineMain/TestEngine';
import { groupRolesConfig } from '../testConfigs';

interface GroupRolesTestProps {
  onBack?: () => void;
}

export function GroupRolesTest({ onBack }: GroupRolesTestProps) {
  const { saveTestResult } = useTest();
  const { getToken } = useAuth();

  const handleComplete = async (results: any) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      await saveTestResult({
        testType: 'group-roles',
        score: results.score,
        answers: results.answers,
        metadata: {
          ...results.metadata,
          dominantRole: results.details?.dominantRole,
          roles: results.details?.roles,
        },
      }, token);
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
