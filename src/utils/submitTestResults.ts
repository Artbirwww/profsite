import { testService } from '../services/api/testApi';
import { PsychTestRequest } from '../types/TestResult';

// Example function that would be called when the "Finish Test" button is clicked
export const finishTestAndSubmit = async (
  token: string,
  testTypeName: string,
  completionTimeSeconds: number,
  psychParams: Array<{param: number; name: string}>
) => {
  try {
    // Prepare the test data to send to the server
    const testData: PsychTestRequest = {
      completionTimeSeconds,
      testTypeName,
      psychParams
    };

    // Send the test data to the server
    const result = await testService.createTest(token, testData);

    console.log('Test submitted successfully:', result);
    // Handle successful submission (e.g., show success message, navigate to results page)
    return { success: true, data: result };
  } catch (error) {
    console.error('Error submitting test:', error);
    return { success: false, message: 'An error occurred while submitting the test' };
  }
};