import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Quiz from '../Quiz';

// Mock the asynchronous API call
jest.mock('../../data/quizzes', () => ({
  getQuizzes: async () => [
    {
      title: 'Sample Quiz',
      questions: [
        {
          text: 'Question 1',
          correctAnswer: 'Correct Answer 1',
          incorrectAnswers: ['Incorrect Answer 1', 'Incorrect Answer 2'],
        },
        // Add more questions as needed
      ],
    },
  ],
}));

describe('Quiz Component', () => {
  it('renders loading message when fetching quizzes', async () => {
    const { container } = render(<Quiz />);
    expect(container).toHaveTextContent('Loading quizzes...');
  });

  it('displays the current quiz and question', async () => {
    render(<Quiz />);
    await waitFor(() => {
      expect(screen.getByText('Quiz 1: Sample Quiz')).toBeInTheDocument();
      expect(screen.getByText('Question 1')).toBeInTheDocument();
    });
  });

  it('displays selected answer and handles correct/incorrect answers', async () => {
    render(<Quiz />);
    await waitFor(() => {
      const correctAnswerButton = screen.getByText('Correct Answer 1');
      fireEvent.click(correctAnswerButton);
      expect(correctAnswerButton).toHaveClass('correct');

      const incorrectAnswerButton = screen.getByText('Incorrect Answer 1');
      fireEvent.click(incorrectAnswerButton);
      expect(incorrectAnswerButton).toHaveClass('incorrect');
    });
  });

  it('advances to the next question and finishes quiz', async () => {
    render(<Quiz />);
    await waitFor(() => {
      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton);

      expect(screen.getByText('Question 2')).toBeInTheDocument();
      expect(screen.queryByText('Correct Answer 1')).toBeNull();

      const finishButton = screen.getByText('Finish');
      fireEvent.click(finishButton);
      expect(screen.getByText('Quiz Summary')).toBeInTheDocument();
    });
  });
});
