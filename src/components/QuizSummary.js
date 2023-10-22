import React from 'react';
import {
  QuizSummaryTable,
  QuestionDescription,
} from './styled';

// list the summary of the quiz attempted by user,
// showing the description of quiz and how the user has performed in the quiz
const QuizSummaryList = ({ quizResult, quizSummaryList }) => {
  return (
    <>
      {/* list of the quiz’s questions with the user’s selected answer and whether it's correct beside each question */}
      {quizSummaryList ? (
        <div>
          <h1>You had:</h1>
          <QuestionDescription>
            {quizResult.map((quiz, index) => (
              <div key={index}>
                <h3>Quiz {index+1}: {quiz.title}</h3>
                <ol>
                  {quiz.questions.map((question, i) => (
                    <li key={i} style={{ margin: '20px 5px'}}>
                        <div>{question.text}
                          <span className={question.isCorrect ? 'correct-ans' : 'incorrect-ans'}>{question.selectedAnswer}</span>
                        </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </QuestionDescription>
        </div>
      ) : (
        <div>       {/* summary showing the number of questions correct after taking a quiz */}
          <h1>Quiz Summary</h1>
          <QuizSummaryTable>
            <thead>
              <tr>
                <th>Quiz</th>
                <th>Title</th>
                <th>Total questions</th>
                <th>Correct answers</th>
                <th>Marks Obtained(%)</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {quizResult.map((quiz, index) => (
                <tr key={index}>
                  <td>Quiz {index + 1}</td>
                  <td>{quiz.title}</td>
                  <td>{quiz.questions.length}</td>
                  <td>{quiz.questions.filter(ques => ques.isCorrect).length}</td>
                  <td>{quiz.marks}%</td>
                  <td className='result'>{quiz.marks >= 50 ? 'Pass' : 'Fail'}</td>
                </tr>
              ))}
            </tbody>
          </QuizSummaryTable>
        </div>
      )}
    </>
  )
}

export default QuizSummaryList;