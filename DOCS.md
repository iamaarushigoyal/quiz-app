# Documentation

Certainly, here's a high-level summary of the technical decisions made in the `Quiz` component:

1. **Data Fetching:** We use the `useEffect` hook to fetch the quizzes from the `getQuizzes` asynchronous API function when the component mounts. This ensures that we have the quiz data available for the user. We're showing `Loading quizzes` until the quizzes are loaded

2. **Component State:** We utilize the `useState` hook to manage component state. Key state variables include `quizzes` (for storing quiz data), `currentQuizIndex` (to track the index of the current quiz), `currentQuestionIndex` (to track the index of the current question), `selectedAnswer` (to store the user's selected answer), `correctAnswers` (to keep track of the number of correct answers), `marks` (to store the user's score), `message` (to display a message based on the user's performance), and most importantly `quizResult` to display quiz summary at the end of each quiz.

3. **User Interaction:** We handle user interactions through various functions, such as `handleAnswerClick` (to handle answer selection), `loadMoreQuizzes` (to load more quizzes) and `handleNextClick` (to navigate to the next question or quiz). The component responds to user choices and progresses accordingly.

4. **Quiz Completion:** When the user has answered all questions in all quizzes, we calculate their marks as a percentage based on the total number of correct answers and the total number of questions. We also provide a message based on the data from the api `getMessage` randomly, such as "Sweet!" for high scores or "Try again!" for lower scores.

5. **Conditional Rendering:** We employ conditional rendering to display loading messages while data is being fetched and to switch between displaying the quiz questions and showing the marks and message upon quiz completion.

6. **Shuffle Array:** The requirement was to display randomly ordered answers – starting with the first question. For this I created a `shuffleArray` method which first combines the array of incorrect answers and correct answer of a particular question and shuffle them to display during the quiz.

7. **Modularization:** We keep the data fetching and the core logic of the quiz component separate from the presentation logic. This makes the code more maintainable and easier to understand.

8. **Delighters1:** As per requirement, displayed a list of the quiz’s questions with the user’s selected answer and whether it was correct beside each question. The UI is created considering the mockup designs

9. **Delighters2:** Once the user has taken both of the quizzes, uses `getMoreQuizzes` api to load in more quizzes that the user can takea and calculated quizwise marks in the end of quiz

These technical decisions have produced a quiz component that is both functional and user-friendly. It is capable of managing multiple quizzes, keeping track of user performance, and providing feedback based on the user's scores. In addition, the component is both succinct and simple to maintain thanks to the utilisation of react hooks.
