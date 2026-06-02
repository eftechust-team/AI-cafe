import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './QuestionFlow.module.css';

interface Question {
  id: string;
  question: string;
  type: 'single' | 'multiple';
  options: Array<{
    value: string;
    label: string;
  }>;
}

interface QuestionFlowProps {
  title: string;
  subtitle: string;
  questions: Question[];
  onSubmit: (answers: Record<string, string | string[]>) => void;
  onBack: () => void;
}

const QuestionFlow: React.FC<QuestionFlowProps> = ({
  title,
  subtitle,
  questions,
  onSubmit,
  onBack
}) => {
  const { t } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (value: string) => {
    if (currentQuestion.type === 'single') {
      setAnswers({
        ...answers,
        [currentQuestion.id]: value
      });
      
      if (isLastQuestion) {
        handleSubmit(value);
      } else {
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }, 300);
      }
    }
  };

  const handleMultipleSelect = (value: string) => {
    const currentAnswers = (answers[currentQuestion.id] as string[]) || [];
    const newAnswers = currentAnswers.includes(value)
      ? currentAnswers.filter(a => a !== value)
      : [...currentAnswers, value];

    setAnswers({
      ...answers,
      [currentQuestion.id]: newAnswers
    });
  };

  const handleSubmit = (lastValue?: string) => {
    const finalAnswers = lastValue
      ? { ...answers, [currentQuestion.id]: lastValue }
      : answers;
    onSubmit(finalAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          {t.common.back}
        </button>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>{title}</h1>
          <p style={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      <div style={styles.progressBar}>
        <div style={{...styles.progressFill, width: `${progress}%`}}></div>
      </div>

      <div style={styles.counter}>
        {t.common.question} {currentQuestionIndex + 1} {t.common.of} {questions.length}
      </div>

      <div style={styles.questionContainer}>
        <div style={styles.questionContent}>
          <h2 style={styles.questionText}>{currentQuestion.question}</h2>

          <div style={styles.optionsGrid}>
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                style={{
                  ...styles.option,
                  ...(currentQuestion.type === 'single'
                    ? answers[currentQuestion.id] === option.value ? styles.selectedSingle : {}
                    : (answers[currentQuestion.id] as string[])?.includes(option.value) ? styles.selectedMultiple : {}
                  )
                }}
                onClick={() =>
                  currentQuestion.type === 'single'
                    ? handleOptionSelect(option.value)
                    : handleMultipleSelect(option.value)
                }
              >
                <span style={styles.optionLabel}>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.navigation}>
        <button
          style={{...styles.navButton, opacity: currentQuestionIndex === 0 ? 0.3 : 1}}
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          {t.common.previous}
        </button>

        {currentQuestion.type === 'multiple' && (
          <button
            style={{...styles.nextButton, opacity: !answers[currentQuestion.id] || (answers[currentQuestion.id] as string[]).length === 0 ? 0.3 : 1}}
            onClick={handleNext}
            disabled={!answers[currentQuestion.id] || (answers[currentQuestion.id] as string[]).length === 0}
          >
            {isLastQuestion ? t.common.getRecommendation : t.common.next}
          </button>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#fafbfc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
  },
  header: {
    padding: '30px 40px',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#e8ecf1',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px',
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#7a8fa6',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    fontWeight: 500,
    flexShrink: 0,
    marginTop: '2px',
  },
  headerContent: {
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 600,
    color: '#1a2332',
    margin: '0 0 8px 0',
    letterSpacing: '0.3px',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: '#7a8fa6',
    margin: 0,
    fontWeight: 300,
    lineHeight: 1.5,
  },
  progressBar: {
    height: '4px',
    background: '#e8ecf1',
    position: 'relative',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #5b9bd5, #4a90e2)',
    transition: 'width 0.3s ease',
  },
  counter: {
    padding: '15px 40px',
    fontSize: '0.85rem',
    color: '#7a8fa6',
    textAlign: 'right',
    letterSpacing: '0.5px',
    fontWeight: 500,
  },
  questionContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 40px',
  },
  questionContent: {
    width: '100%',
    maxWidth: '700px',
  },
  questionText: {
    fontSize: '1.6rem',
    fontWeight: 400,
    color: '#1a2332',
    margin: '0 0 50px 0',
    lineHeight: 1.6,
    letterSpacing: '0.2px',
  },
  optionsGrid: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: '12px',
    justifyContent: 'center',
    overflowX: 'auto',
    paddingBottom: '10px',
  },
  option: {
    background: 'white',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#e8ecf1',
    borderRadius: '12px',
    padding: '12px 18px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#7a8fa6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  selectedSingle: {
    background: 'rgba(91, 155, 213, 0.1)',
    borderColor: '#5b9bd5',
    color: '#2c5aa0',
    fontWeight: 600,
  },
  selectedMultiple: {
    background: 'rgba(91, 155, 213, 0.1)',
    borderColor: '#5b9bd5',
    color: '#2c5aa0',
    fontWeight: 600,
  },
  optionLabel: {
    display: 'block',
    lineHeight: 1.4,
  },
  navigation: {
    padding: '30px 40px',
    display: 'flex',
    gap: '20px',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: '#e8ecf1',
    background: 'white',
  },
  navButton: {
    padding: '12px 32px',
    borderRadius: '8px',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e8ecf1',
    background: 'white',
    color: '#7a8fa6',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    letterSpacing: '0.3px',
  },
  nextButton: {
    padding: '12px 32px',
    borderRadius: '8px',
    borderWidth: 0,
    borderStyle: 'solid',
    background: 'linear-gradient(135deg, #5b9bd5, #4a90e2)',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    letterSpacing: '0.3px',
    marginLeft: 'auto',
  },
};

export default QuestionFlow;
