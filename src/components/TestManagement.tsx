import React, { useState } from 'react';
import { testApi } from '../services/api/testApi';
import { PsychTestResponse } from '../types/TestResult';
import { TEST_TYPES, PSYCH_PARAM_NAMES } from '../constants/testConstants';

const TestManagementComponent: React.FC = () => {
  const [tests, setTests] = useState<PsychTestResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for form inputs
  const [token, setToken] = useState<string>(''); // In a real app, this would come from auth context
  const [completionTime, setCompletionTime] = useState<number>(0);
  const [testType, setTestType] = useState<string>(TEST_TYPES.TEMPERAMENT);
  const [params, setParams] = useState<Array<{name: string, param: number}>>([
    { name: PSYCH_PARAM_NAMES.WORKING_BEE_SCORE, param: 0 },
    { name: PSYCH_PARAM_NAMES.SUPERVISION_SCORE, param: 0 },
    { name: PSYCH_PARAM_NAMES.MOTIVATION_SCORE, param: 0 },
    { name: PSYCH_PARAM_NAMES.SUPPLIER_SCORE, param: 0 },
    { name: PSYCH_PARAM_NAMES.CONTROLLER_SCORE, param: 0 },
  ]);

  // Handle saving a new test
  const handleSaveTest = async () => {
    if (!token) {
      alert('Please provide a valid token');
      return;
    }

    const testData = {
      completionTimeSeconds: completionTime,
      testTypeName: testType,
      psychParams: params,
    };

    try {
      setLoading(true);
      setError(null);
      await testApi.createTest(token, testData);
      alert('Test saved successfully!');
    } catch (err: any) {
      setError(err.message || 'Error saving test');
      console.error('Error saving test:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle fetching student tests
  const handleFetchTests = async () => {
    if (!token) {
      alert('Please provide a valid token');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const fetchedTests = await testApi.getTestsByPupil(token);
      setTests(fetchedTests);
    } catch (err: any) {
      setError(err.message || 'Error fetching tests');
      console.error('Error fetching tests:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle parameter change
  const handleParamChange = (index: number, value: number) => {
    const updatedParams = [...params];
    updatedParams[index].param = value;
    setParams(updatedParams);
  };

  return (
    <div className="test-management">
      <h2>Test Management</h2>
      
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={() => setError(null)}>Clear Error</button>
        </div>
      )}
      
      <div className="form-section">
        <h3>Save New Test</h3>
        
        <div>
          <label htmlFor="token">Authorization Token:</label>
          <input
            id="token"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter your auth token"
          />
        </div>
        
        <div>
          <label htmlFor="completionTime">Completion Time (seconds):</label>
          <input
            id="completionTime"
            type="number"
            value={completionTime}
            onChange={(e) => setCompletionTime(parseFloat(e.target.value) || 0)}
            min="0"
            step="0.1"
          />
        </div>
        
        <div>
          <label htmlFor="testType">Test Type:</label>
          <select
            id="testType"
            value={testType}
            onChange={(e) => setTestType(e.target.value)}
          >
            <option value={TEST_TYPES.TEMPERAMENT}>{TEST_TYPES.TEMPERAMENT}</option>
            <option value={TEST_TYPES.GROUP_ROLES}>{TEST_TYPES.GROUP_ROLES}</option>
            <option value={TEST_TYPES.PROFESSIONAL_ORIENTATION}>{TEST_TYPES.PROFESSIONAL_ORIENTATION}</option>
            <option value={TEST_TYPES.ENGINEERING_THINKING}>{TEST_TYPES.ENGINEERING_THINKING}</option>
            <option value={TEST_TYPES.INTELLECTUAL_POTENTIAL}>{TEST_TYPES.INTELLECTUAL_POTENTIAL}</option>
          </select>
        </div>
        
        <div>
          <h4>Psychological Parameters:</h4>
          {params.map((param, index) => (
            <div key={index}>
              <label>{param.name}:</label>
              <input
                type="number"
                value={param.param}
                onChange={(e) => handleParamChange(index, parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
          ))}
        </div>
        
        <button onClick={handleSaveTest} disabled={loading}>
          {loading ? 'Saving...' : 'Save Test'}
        </button>
      </div>
      
      <div className="fetch-section">
        <h3>Get Student Tests</h3>
        <button onClick={handleFetchTests} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Tests'}
        </button>
      </div>
      
      <div className="results-section">
        <h3>Test Results</h3>
        {tests.length === 0 ? (
          <p>No tests found.</p>
        ) : (
          <ul>
            {tests.map((test, index) => (
              <li key={index}>
                <h4>{test.testTypeName} - {test.completionTimeSeconds}s</h4>
                <ul>
                  {test.psychParams.map((param, idx) => (
                    <li key={idx}>
                      {param.name}: {param.param}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TestManagementComponent;