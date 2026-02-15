import { useNavigate } from 'react-router-dom';
import { useTest } from '../../../contexts/TestContext';
import { useAuth } from '../../../contexts/AuthContext';
import { TestEngine } from '../testEngine/TestEngine';
import { professionalOrientationConfig } from '../testConfigs';

interface ProfessionalOrientationTestProps {
  onBack?: () => void;
}

export function ProfessionalOrientationTest({ onBack }: ProfessionalOrientationTestProps) {
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
        testType: 'professional-orientation',
        score: results.score,
        answers: results.answers,
        metadata: {
          ...results.metadata,
          categoryScores: results.details.categoryScores,
          dominantCategory: results.details.dominantCategory,
          professionRecommendations: results.details.professionRecommendations,
        },
      }, token);
    } catch (error) {
      console.error('Failed to save test results:', error);
      throw error;
    }
  };

  return (
    <TestEngine
      testConfig={professionalOrientationConfig}
      onComplete={handleComplete}
      onBack={onBack}
    />
  );
}

export default ProfessionalOrientationTest;