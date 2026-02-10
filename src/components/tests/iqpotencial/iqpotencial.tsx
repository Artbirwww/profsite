import { useState } from 'react';
import { TestEngine } from '../testengine/TestEngineMain/TestEngine';
import { getIntellectualPotentialConfig } from '../testConfigs';
import { IntellectFormSelection } from './IntellectFormSelection';

interface IqPotentialTestProps {
  onBack?: () => void;
}

export function IqPotentialTest({ onBack }: IqPotentialTestProps) {
  const [selectedForm, setSelectedForm] = useState<'A' | 'B' | null>(null);

  const handleFormSelection = (form: 'A' | 'B') => {
    setSelectedForm(form);
  };

  if (!selectedForm) {
    return <IntellectFormSelection onFormSelected={handleFormSelection} onBack={onBack} />;
  }

  const intellectTestConfig = getIntellectualPotentialConfig(selectedForm);

  return (
    <TestEngine
      testConfig={intellectTestConfig}
      onBack={onBack}
    />
  );
}

export default IqPotentialTest;