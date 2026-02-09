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
    <div className="min-h-screen p-4 py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onBack || (() => navigate('/dashboard'))}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="size-4" />
                </Button>
                <div>
                  <CardTitle className="text-xl md:text-2xl">Тест интеллектуального потенциала</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                      {currentQuestionData.category}
                    </span>
                    <span>Оценка логико-математических способностей</span>
                  </CardDescription>
                </div>
              </div>
              
              <div className="flex flex-col md:items-end gap-2">
                <div className="flex items-center gap-2">
                  <Clock className={`size-5 ${timeWarning ? 'text-red-500 animate-pulse' : 'text-gray-600'}`} />
                  <span className={`text-xl md:text-2xl font-mono ${timeWarning ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
                    {formatTime(timer)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {timeWarning ? 'Осталось менее 5 минут!' : 'До завершения теста'}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{answeredCount}</div>
                <div className="text-sm text-gray-600">Отвечено вопросов</div>
                <Progress value={completionPercentage} className="mt-2 h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-600">Правильных ответов</div>
                <Progress value={(score / 30) * 100} className="mt-2 h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {currentQuestion + 1}
                </div>
                <div className="text-sm text-gray-600">Текущий вопрос</div>
                <div className="text-xs text-gray-500 mt-1 capitalize">{currentQuestionData.difficulty}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Card */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg md:text-xl">
                Вопрос {currentQuestion + 1} из 30
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {currentQuestionData.category}
                </span>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  currentQuestionData.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  currentQuestionData.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {currentQuestionData.difficulty === 'easy' ? 'Легкий' :
                   currentQuestionData.difficulty === 'medium' ? 'Средний' : 'Сложный'}
                </span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            {/* Question Text */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                {currentQuestionData.q}
              </h3>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Answer options */}
            <div className="space-y-3">
              {currentQuestionData.a.map((answer, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  disabled={isSubmitting}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedAnswers[currentQuestion] === idx
                      ? 'border-blue-500 bg-blue-50 shadow-sm scale-[1.02]'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`size-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedAnswers[currentQuestion] === idx
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-400'
                    }`}>
                      {selectedAnswers[currentQuestion] === idx && (
                        <div className="size-2.5 rounded-full bg-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`font-medium ${
                        selectedAnswers[currentQuestion] === idx
                          ? 'text-blue-700'
                          : 'text-gray-700'
                      }`}>
                        {String.fromCharCode(65 + idx)}) {answer}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-4 md:flex-1">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0 || isSubmitting}
              className="flex-1 h-12"
            >
              Назад
            </Button>
            
            {currentQuestion < 29 ? (
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex-1 h-12 bg-blue-600 hover:bg-blue-700"
              >
                Далее
              </Button>
            ) : (
              <Button
                onClick={completeTest}
                disabled={isSubmitting}
                className="flex-1 h-12 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? 'Сохранение...' : 'Завершить тест'}
              </Button>
            )}
          </div>
          
          <Button
            variant="outline"
            onClick={() => setShowConfirmDialog(true)}
            disabled={isSubmitting}
            className="h-12 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Завершить досрочно
          </Button>
        </div>

        {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full animate-scale-in">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertCircle className="size-5" />
                Завершить тест досрочно?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Вы ответили на {answeredCount} из 30 вопросов. 
                {answeredCount < 30 && ` Неотвеченные ${30 - answeredCount} вопросов будут засчитаны как неправильные.`}
              </p>
              <p className="text-sm text-gray-500">
                Текущий счет: {score} из {answeredCount} отвеченных
              </p>
              <p className="text-sm text-gray-500">
                Оставшееся время: {formatTime(timer)}
              </p>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmDialog(false)}
                  className="flex-1"
                >
                  Продолжить тест
                </Button>
                <Button
                  onClick={() => {
                    setShowConfirmDialog(false);
                    saveResultsToServer();
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Сохранение...' : 'Завершить'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

        {/* Question Navigation Dots */}
<Card>
  <CardContent className="pt-6">
    <div className="text-sm font-medium text-gray-700 mb-3">
      Быстрая навигация по вопросам:
    </div>
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 30 }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentQuestion(idx)}
          disabled={isSubmitting}
          className={`size-8 md:size-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
            selectedAnswers[idx] !== -1
              ? idx === currentQuestion
                ? 'bg-green-500 text-white scale-110 ring-2 ring-offset-1 ring-green-300'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
              : idx === currentQuestion
              ? 'bg-purple-500 text-white scale-110 ring-2 ring-offset-1 ring-purple-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={`Вопрос ${idx + 1}${
            selectedAnswers[idx] !== -1 ? ' (отвечен)' : ''
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  </CardContent>
</Card>

      </div>
    </div>
  );
}

export default IqPotentialTest;