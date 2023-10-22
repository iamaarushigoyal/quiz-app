# Multiple Choice Quizzes

## The Situation

Its is an embeddable multiple choice quiz widget to help learners evaluate their skills.

`./mockups/*.png` contains for rough descriptions of what it should look like.

### Basic COde Structure

The application code lives in the `src/` directory. 

In the `data/quizzes.js` file, a set of `quizzes` have been exported, each of which contains the following data:

- `title`: A human-readable display text title for the quiz

- `questions` An ordered list of questions to be asked, each of which consists of:
  - `text`
  - `correctAnswer`
  - `incorrectAnswers`

### Feature Requirements

This code will allow the user to take each of those `quizzes` in order.

1. For the current quiz, display its title on top of the page, along with a single question’s text and randomly ordered answers -- starting with the first question

2. When a question’s answer is clicked, it should show:

   - A 'Next' button at the bottom of the component
   - Either _'Correct!'_ or _'Incorrect...'_ above that button, with the correct answer outlined in green, and the incorrect answer (if any) outlined in red with a ~~strikethrough~~ over its text

3. After all questions have been answered, display a friendly summary screen that lists:

   - How many questions were in the quiz
   - How many of those questions were answered correctly
   - A button to move to the next quiz (or the first quiz, if they just took the last)
   - A random encouragement message if any question was answered correctly _(use `getMessage` from `data/messages.js`)_. If all questions were answered incorrectly, don't display an encouragement message.

### Delighters

In addition to the base requirements, added some delighters as well

- A: Once the user has taken both of the quizzes, use `getMoreQuizzes` to load in more quizzes that the user can take.
- B: In addition to the summary showing the number of questions correct after taking a quiz, display a list of the quiz's questions with the user's selected answer and whether it was correct beside each question.

`./mockups/delighters/*.png` contains rough descriptions of what B would look like.

### Documentation

The high-level summary of the technical decisions are added in `DOCS.md`.
This documentation explains the code's overall architecture.

