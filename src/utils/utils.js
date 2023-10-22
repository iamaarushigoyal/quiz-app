import { getMessage } from "../data/messages";

export const generateMarks = (currentQuiz, correctAnswers) => {
  const totalQuestions = currentQuiz.questions.length || 1;
  const marks = (correctAnswers / totalQuestions) * 100;
  // Determine the message based on marks
  let message = "";
  if (marks === 0) {
    message = "You can do better. Try again! 💔";
  } else {
    message = getMessage();
  }
  return { marks, message };
}

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}