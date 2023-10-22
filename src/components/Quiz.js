import React, { useEffect, useState } from 'react';
import { getQuizzes, getMoreQuizzes } from '../data/quizzes';
import { generateMarks, shuffleArray } from '../utils/utils';
import QuizSummaryList from './QuizSummary';
import { ActionButton,
  CorrectTag,
  IncorrectTag,
  ListContainerWrapper,
  QuizSummary,
  QuizWrapper,
} from './styled';

const Quiz = () => {
  // state variables
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [message, setMessage] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState([]);
  const [questionSet, setQuestionList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // Shuffle answers for the current question during initialization
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  // Extract the current quiz and question
  const currentQuiz = quizzes[currentQuizIndex];
  const currentQuestion = currentQuiz ? currentQuiz.questions[currentQuestionIndex] : null;
  const isLastQuestion = currentQuestionIndex === (currentQuiz ? currentQuiz.questions.length - 1 : 0);

  // Data fetching and setup
  useEffect(() => {
    // Fetch quizzes when the component mounts
    getQuizzes().then((data) => {
      setQuizzes(data);
    });
  }, []);

  useEffect(() => {
    if (quizzes.length > 0) {
      const currentQuestion = quizzes[currentQuizIndex].questions[currentQuestionIndex];
      const answers = shuffleArray(currentQuestion.incorrectAnswers.concat(currentQuestion.correctAnswer));
      setShuffledAnswers(answers);
    }
  }, [quizzes, currentQuizIndex, currentQuestionIndex]);

  // Load more quizzes when the user has completed both initial quizzes
 //  Once the user has taken both of the quizzes, use getMoreQuizzes to load in more quizzes that the user can take.
  const loadMoreQuizzes = async () => {
    setLoading(true);
    const moreQuizzes = await getMoreQuizzes();
    setQuizzes([...moreQuizzes]);
    setLoading(false);
    setCurrentQuizIndex(0);
    setQuizCompleted(false);
    clearPreviousQuizData();
  };

  // Handle user answer selection
  const handleAnswerClick = (answer) => {
    console.log(answer, 'handleAnswerClick')
    if (!selectedAnswer) {
      if (answer === currentQuestion.correctAnswer) {
        setCorrectAnswers(correctAnswers + 1);
      }
      setSelectedAnswer(answer);
      const questionList = [...questionSet, {
        text: currentQuestion.text,
        selectedAnswer: answer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: answer === currentQuestion.correctAnswer,
      }];
      setQuestionList(questionList);
    }
  };


  // Handle the "Next" button click
  const handleNextClick = () => {
    // Move to the next question within the same quiz
    if (currentQuestionIndex < (currentQuiz ? currentQuiz.questions.length - 1 : 0)) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      // calculate marks and show a message.
      const { marks, message } = generateMarks(currentQuiz, correctAnswers);
      const result = {
        title: currentQuiz.title,
        marks,
        questions: questionSet,
      };
      setQuizResult([...quizResult, result ]);
      setMessage(message);
      if (currentQuizIndex < quizzes.length - 1) {
        // Compute marks and Move to the next quiz
        setCurrentQuizIndex(currentQuizIndex + 1);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
      } else {
        // All quizzes completed;         
        setQuizCompleted(true);
      }
      setShowResult(true);
    }
  };

  console.log({quizResult, questionSet})

  // Conditional rendering based on the component's state
  if (quizzes.length === 0) {
    return <div>Loading quizzes...</div>
  }

  const clearPreviousQuizData = () => {
    setShowResult(false); // Reset the result view
    setCurrentQuestionIndex(0); // Start the next quiz
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setMessage('');
    setQuestionList([]);
  }

  if (showResult) {
    return (
      <QuizSummary>
        <h1>{quizResult[quizResult.length - 1].title}</h1>
        <p>You got {questionSet.filter(ques => ques.isCorrect).length} out of {questionSet.length} right</p>
        <p>{message}</p>
        <QuizSummaryList quizResult={quizResult} quizSummaryList={false} />
        {!quizCompleted ? (
          // move to next quiz
          <ActionButton onClick={clearPreviousQuizData}>Next Quiz</ActionButton>
        ) : (
          <div>
            <br/><br />
            {/* list the summary of the quiz taken by the user */}
            <QuizSummaryList quizResult={quizResult} quizSummaryList={true} />
            {/* load the next set of quizzes */}
            {quizResult.length !== 4 && (
              <ActionButton onClick={loadMoreQuizzes}>Load More Quizzes</ActionButton>
            )}
            {isLoading && (
              <p>Loading more quizzes...</p>
            )}
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
      {/* list containing the questions with multiple choice options */}
      <ListContainerWrapper>
        <ol type="a">
          {shuffledAnswers.map((answer) => (
            <li
              key={answer}
              onClick={() => handleAnswerClick(answer)}
              className={
                selectedAnswer ? (
                  answer === currentQuestion.correctAnswer ? 'correct' :
                  (selectedAnswer === answer ? 'incorrect': '')
                ) : ''
              }
            >
              {answer}
            </li>
          ))}
        </ol>
      </ListContainerWrapper>
      {/* display the user answer and whether it is correct or not */}
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
          {/* move to the next question */}
          {isLastQuestion ? (
              <ActionButton onClick={handleNextClick}>Finish</ActionButton>
          ) : (
            <ActionButton onClick={handleNextClick}>Next</ActionButton>
          )}
        </div>
        
      )}
    </QuizWrapper>
  );
}

export default Quiz;