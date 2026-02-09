import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IntellectFormSelectionProps {
  onFormSelected: (form: 'A' | 'B') => void;
  onBack?: () => void;
}

export function IntellectFormSelection({ onFormSelected, onBack }: IntellectFormSelectionProps) {
  const [selectedForm, setSelectedForm] = useState<'A' | 'B' | null>(null);
  const navigate = useNavigate();

  const handleSelectForm = (form: 'A' | 'B') => {
    setSelectedForm(form);
  };

  const handleSubmitForm = () => {
    if (selectedForm) {
      onFormSelected(selectedForm);
    }
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <h3>Тест интеллекта</h3>
            <p>Выберите форму теста</p>
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div onClick={() => handleSelectForm('A')}>
                <div>
                  <h4>Форма A</h4>
                </div>
              </div>

              <div onClick={() => handleSelectForm('B')}>
                <div>
                  <h4>Форма В</h4>
                </div>
              </div>
            </div>

            <div>
              <div>
                {selectedForm && (
                  <button onClick={handleSubmitForm}>
                    Начать тест {selectedForm}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}