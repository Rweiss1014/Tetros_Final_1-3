import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { FileText, Trophy, CheckCircle2, XCircle } from 'lucide-react';
import { getQuestionsForLevel, calculateQuizBonus, type Question } from './questionService';
import { soundEffects } from './soundEffects';

interface LevelUpQuizDialogProps {
  open: boolean;
  level: number;
  onComplete: (bonus: number) => void;
}

export function LevelUpQuizDialog({ open, level, onComplete }: LevelUpQuizDialogProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [bonusPoints, setBonusPoints] = useState(0);

  // Initialize quiz when dialog opens
  useEffect(() => {
    if (open) {
      const load = async () => {
        const newQuestions = await getQuestionsForLevel(level, 3);
        setQuestions(newQuestions);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setCorrectAnswers(0);
        setIsComplete(false);
        setBonusPoints(0);
      };
      load();
    }
  }, [open, level]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return; // Prevent changing answer after submission
    soundEffects.click();
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    // Check if answer is correct
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      soundEffects.correct();
      setCorrectAnswers(prev => prev + 1);
    } else {
      soundEffects.wrong();
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Calculate final bonus - updated service returns a constant bonus
      const bonus = calculateQuizBonus();
      setBonusPoints(bonus);
      setIsComplete(true);
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleFinish = () => {
    onComplete(bonusPoints);
  };

  if (!currentQuestion && !isComplete) {
    return null;
  }

  // Completion screen
  if (isComplete) {
    const totalQuestions = questions.length;
    const finalCorrect = correctAnswers;
    const accuracy = Math.round((finalCorrect / totalQuestions) * 100);
    
    return (
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent 
          className="sm:max-w-xl bg-white border-gray-200"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="sr-only">
              Level {level - 1} Quiz Complete
            </DialogTitle>
            <DialogDescription className="sr-only">
              Quiz completion results for level {level - 1}. You scored {correctAnswers} out of {questions.length} questions correct and earned {bonusPoints} bonus points.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl text-gray-800">
                Level {level - 1} Complete!
              </h2>
              <p className="text-gray-600 text-sm">Great work! Here are your results.</p>
            </div>

            {/* Results Card */}
            <div className="bg-gradient-to-br from-gray-50 to-teal-50 border border-gray-200 rounded-lg p-6">
              <div className="text-center space-y-4">
                <div>
                  <div className="text-5xl text-teal-600">
                    {finalCorrect}/{totalQuestions}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">Questions Correct</div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-2xl text-gray-700">
                      {accuracy}%
                    </div>
                    <div className="text-gray-500 text-xs">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl text-teal-600">
                      +{bonusPoints.toLocaleString()}
                    </div>
                    <div className="text-gray-500 text-xs">Bonus Points</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Message */}
            <div className="text-center">
              {accuracy >= 100 && (
                <p className="text-teal-600">
                  🎯 Perfect score! Outstanding work!
                </p>
              )}
              {accuracy >= 66 && accuracy < 100 && (
                <p className="text-teal-600">
                  ⭐ Great job! Keep up the excellent work!
                </p>
              )}
              {accuracy >= 33 && accuracy < 66 && (
                <p className="text-gray-600">
                  👍 Good effort! Keep learning and improving.
                </p>
              )}
              {accuracy < 33 && (
                <p className="text-gray-600">
                  💪 Keep practicing! You'll do better next time.
                </p>
              )}
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleFinish}
              className="w-full h-12 bg-teal-500 hover:bg-teal-600 text-white text-base"
            >
              Continue Game
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Question screen
  const options = currentQuestion ? [currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4] : [];
  const isAnswerCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent 
        className="sm:max-w-3xl bg-gray-50 border-gray-200 max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="sr-only">
            Tetris Training Quiz - Question {currentQuestionIndex + 1} of {questions.length}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Tetris Training Quiz - Question {currentQuestionIndex + 1} of {questions.length}. Current score: {correctAnswers} correct.
          </DialogDescription>
        </DialogHeader>
        {/* Header */}
        <div className="space-y-3 pb-4 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl text-teal-700">
                Tetris Training Quiz
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Choose the best response for each question
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              <div className="text-sm text-gray-800">
                Score: {correctAnswers}/{currentQuestionIndex + (showExplanation ? 1 : 0)}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <Progress value={progress} className="h-2 bg-gray-200" />
        </div>

        {/* Question Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4">
          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-600" />
            <span className="inline-block border border-teal-200 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs">
              {currentQuestion.category}
            </span>
          </div>

          {/* Question Text */}
          <div>
            <h3 className="text-base text-gray-800 mb-3">
              {currentQuestion.question}
            </h3>
            {/* CSV-based questions do not include a scenario field */}
          </div>

            {/* Answer Options */}
          <div className="space-y-3 pt-2">
            {options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === currentQuestion?.correctAnswer;
              
              let cardStyle = "bg-white border-2 border-gray-200 hover:border-teal-300 hover:bg-teal-50/30";
              
              if (showExplanation) {
                if (isCorrectOption) {
                  cardStyle = "bg-green-50 border-2 border-green-400";
                } else if (isSelected && !isCorrectOption) {
                  cardStyle = "bg-red-50 border-2 border-red-400";
                } else {
                  cardStyle = "bg-gray-50 border-2 border-gray-200 opacity-60";
                }
              } else if (isSelected) {
                cardStyle = "bg-teal-50 border-2 border-teal-400";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-lg text-left transition-all ${cardStyle} flex items-center justify-between group`}
                >
                  <span className="text-sm text-gray-700 leading-relaxed">{option}</span>
                  {showExplanation && (
                    <>
                      {isCorrectOption && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
                      {isSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && currentQuestion.explanation && (
          <div className={`border-2 rounded-lg p-4 ${
            isAnswerCorrect 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start gap-3">
              {isAnswerCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <div className={`text-sm mb-1 ${
                  isAnswerCorrect ? 'text-green-700' : 'text-red-700'
                }`}>
                  {isAnswerCorrect ? 'Correct!' : 'Incorrect'}
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  {currentQuestion.explanation}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          {!showExplanation ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="w-full h-12 bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-40 disabled:cursor-not-allowed text-base"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="w-full h-12 bg-teal-500 hover:bg-teal-600 text-white text-base"
            >
              {isLastQuestion ? 'View Results' : 'Next Question'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
