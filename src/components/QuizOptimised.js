import React, { useEffect, useState } from 'react';
import { getQuizzes } from '../data/quizzes';
import { ActionButton, CorrectTag, IncorrectTag, ListContainerWrapper, QuizSummary, QuizWrapper, QuizSummaryTable } from './styled';

const QuizOptimised = () => {
  // State variables
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [scoreMessage, setScoreMessage] = useState('');

  // Computed values
  const currentQuiz = quizzes[currentQuizIndex];
  const currentQuestion = currentQuiz ? currentQuiz.questions[currentQuestionIndex] : null;
  const isLastQuestion = currentQuestionIndex === (currentQuiz ? currentQuiz.questions.length - 1 : 0);
  const isLastQuiz = currentQuizIndex === quizzes.length - 1;

  // Data fetching and setup
  useEffect(() => {
    getQuizzes().then((data) => {
      setQuizzes(data);
    });
  }, []);

  // Handle user answer selection
  const handleAnswerClick = (answer) => {
    const isCorrect = answer === currentQuestion.correctAnswer;
    setSelectedAnswer(answer);
    if (isCorrect) {
      setQuizResult([...quizResult, { title: currentQuiz.title, marks: 1 }]);
    }
  };

  // Handle the "Next" button click
  const handleNextClick = () => {
    if (currentQuestionIndex < (currentQuiz ? currentQuiz.questions.length - 1 : 0)) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      if (currentQuizIndex < quizzes.length - 1) {
        const totalQuestions = currentQuiz.questions.length || 1;
        const marks = (quizResult.length - quizResult.findIndex((result) => result.title === currentQuiz.title)) / totalQuestions * 100;

        let message = '';
        if (marks >= 90) {
          message = "Congratulations! You did great! 🎉";
        } else if (marks >= 60) {
          message = "Way to go! 🍭";
        } else {
          message = "You can do better. Try again! 💔";
        }

        const scoreMessage = `You got ${marks}%`;
        setScoreMessage(scoreMessage);
        setQuizTitle(currentQuiz.title);
        setCurrentQuizIndex(currentQuizIndex + 1);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
      } else {
        const totalQuestions = quizzes.reduce((total, quiz) => total + quiz.questions.length, 0);
        const marks = (quizResult.length / totalQuestions) * 100;

        let message = '';
        if (marks >= 90) {
          message = "Congratulations! You did great! 🎉";
        } else if (marks >= 60) {
          message = "Way to go! 🍭";
        } else {
          message = "You can do better. Try again! 💔";
        }

        const scoreMessage = `You got ${marks}%`;
        setScoreMessage(scoreMessage);
        setQuizTitle(currentQuiz.title);
        setQuizCompleted(true);
      }
      setShowResult(true);
    }
  };

  const handleNextQuiz = () => {
    setShowResult(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScoreMessage('');
  };

  if (quizzes.length === 0) {
    return <div>Loading quizzes...</div>
  }

  if (showResult) {
    return (
      <QuizSummary>
        <h1>{quizTitle}</h1>
        <p>{scoreMessage}</p>
        {!quizCompleted ? (
          <ActionButton onClick={handleNextQuiz}>Next Quiz</ActionButton>
        ) : (
          <div>
            <ActionButton>Finish</ActionButton>
            <br/><br />
            <h1>Quiz Summary</h1>
            <QuizSummaryTable>
              <thead>
                <tr>
                  <th>Quiz</th>
                  <th>Title</th>
                  <th>Marks Obtained(%)</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {quizResult.map((quiz, index) => (
                  <tr key={index}>
                    <td>Quiz {index + 1}</td>
                    <td>{quiz.title}</td>
                    <td>{quiz.marks}%</td>
                    <td className='result'>{quiz.marks >= 50 ? 'Pass' : 'Fail'}</td>
                  </tr>
                ))}
              </tbody>
            </QuizSummaryTable>
          </div>
        )}
      </QuizSummary>
    );
  }

  return (
    <QuizWrapper>
      <h1>Quiz {currentQuizIndex + 1}: {currentQuiz.title}</h1>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{currentQuestion.text}</p>
      <ListContainerWrapper>
        <ol type="a">
          {currentQuestion.incorrectAnswers.concat(currentQuestion.correctAnswer).sort().map((answer) => (
            <li
              key={answer}
              onClick={() => handleAnswerClick(answer)}
              className={selectedAnswer === answer ? (answer === currentQuestion.correctAnswer ? "correct" : "incorrect") : ""}
            >
              {answer}
            </li>
          ))}
        </ol>
      </ListContainerWrapper>
      {selectedAnswer && (
        <div className="feedback">
          {selectedAnswer === currentQuestion.correctAnswer ? (
            <CorrectTag>Correct!</CorrectTag>
          ) : (
            <IncorrectTag>
              Incorrect...
            </IncorrectTag>
          )}
          <br />
          {isLastQuestion ? (
            isLastQuiz ? (
              <ActionButton onClick={handleNextClick}>Finish</ActionButton>
            ) : (
              <>
                <ActionButton onClick={handleNextClick}>Finish</ActionButton>
              </>
            )
          ) : (
            <ActionButton onClick={handleNextClick}>Next</ActionButton>
          )}
        </div>
      )}
    </QuizWrapper>
  );
}

export default QuizOptimised;
