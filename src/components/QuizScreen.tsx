import { useState, useEffect } from 'react';
import { SUBJECTS } from '../data/subjects';
import type { ChapterData } from './ChapterList';
import { getQuestionsForChapter, type QuizQuestion } from '../services/quizService';
import './QuizScreen.css';

type Subject = typeof SUBJECTS[number];

interface QuizScreenProps {
  subject: Subject;
  chapter: ChapterData;
  onBack: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ subject, chapter, onBack }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadQuestions = async () => {
      setIsLoading(true);
      setHasError(false);
      setCurrentIndex(0);
      setAnswers({});

      try {
        const data = await getQuestionsForChapter(
          subject.folder,
          subject.file,
          chapter.chapter_id
        );
        if (isMounted) {
          setQuestions(data);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    loadQuestions();

    return () => {
      isMounted = false;
    };
  }, [subject, chapter]);

  const currentQuestion = questions[currentIndex];
  const currentQuestionKey = currentQuestion ? String(currentQuestion.questionId) : '';
  const selectedOptionId = answers[currentQuestionKey];
  const isAnswered = selectedOptionId !== undefined;
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectOption = (optionId: string) => {
    if (isAnswered || !currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestionKey]: optionId }));
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onBack();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  return (
    <div className="quiz-screen-container">
      <div className="quiz-screen-header">
        <button className="back-button" onClick={onBack}>
          ← Quay lại
        </button>
        <h2>{chapter.chapter_name}</h2>
        <p className="quiz-subtitle">{subject.name}</p>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Đang tải câu hỏi...</p>
        </div>
      ) : hasError ? (
        <div className="error-notice">
          <p>⚠ Không thể tải câu hỏi. Vui lòng thử lại.</p>
        </div>
      ) : questions.length === 0 ? (
        <div className="error-notice">
          <p>⚠ Chương này chưa có câu hỏi.</p>
        </div>
      ) : (
        <>
          <p className="question-progress">
            Câu {currentIndex + 1} / {questions.length}
          </p>

          <div className="question-card">
            <p className="question-text">{currentQuestion.questionText}</p>

            <div className="options-list">
              {currentQuestion.options.map((option) => {
                const isSelected = option.optionId === selectedOptionId;
                let stateClass = '';

                if (isAnswered) {
                  if (option.isCorrect) {
                    stateClass = 'correct';
                  } else if (isSelected) {
                    stateClass = 'incorrect';
                  }
                }

                return (
                  <button
                    key={option.optionId}
                    className={`quiz-option ${stateClass}`}
                    onClick={() => handleSelectOption(option.optionId)}
                    disabled={isAnswered}
                  >
                    <span className="option-id">{option.optionId}</span>
                    <span className="option-text">{option.optionText}</span>
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div
                className={`feedback-notice ${
                  currentQuestion.options.find((o) => o.optionId === selectedOptionId)?.isCorrect
                    ? 'feedback-correct'
                    : 'feedback-incorrect'
                }`}
              >
                {currentQuestion.options.find((o) => o.optionId === selectedOptionId)?.isCorrect
                  ? '✓ Chính xác!'
                  : (() => {
                      const correctOption = currentQuestion.options.find((o) => o.isCorrect);
                      return correctOption
                        ? `✗ Chưa đúng. Đáp án đúng: ${correctOption.optionId}. ${correctOption.optionText}`
                        : '✗ Chưa đúng.';
                    })()}
              </div>
            )}
          </div>

          <div className="quiz-nav">
            <button
              className="nav-button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              ← Trước
            </button>
            <button
              className="nav-button primary"
              onClick={handleNext}
              disabled={!isAnswered}
            >
              {isLastQuestion ? 'Hoàn thành' : 'Tiếp →'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
