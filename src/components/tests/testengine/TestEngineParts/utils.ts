export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function isAnswerValid(answer: any): boolean {
  if (answer === null) return false;
  if (Array.isArray(answer)) {
    return answer.some(v => v > 0);
  }
  return true;
}
