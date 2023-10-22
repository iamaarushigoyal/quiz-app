import styled from 'styled-components';

export const QuizWrapper = styled.div``;

export const ListContainerWrapper = styled.div`
  text-align: center;
  line-height: 2;
  ol {
    display: inline-block;
    min-width: 250px;
  }
  li {
    cursor: pointer;

    &:hover {
      background: lightgray;
    }
    
  }
  .incorrect {
    border: 2px solid red;
    text-decoration: line-through;
  }
  .correct {
    border: 2px solid green;
  }
`;

export const CorrectTag = styled.p`
  font-style: italic;
`;
export const IncorrectTag = styled.p`
  font-style:italic;
`;

export const ActionButton = styled.button`
  padding: 15px 30px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  &:hover {
    background: lightgrey;
  }
`;

export const QuizSummary = styled.div`
  h1 {
    margin-bottom: 60px;
  }
  p {
    font-size: 16px;
  }
`;

export const QuizSummaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  thead {
    background-color: #f2f2f2;
  }

  th, td {
    border: 1px solid #ddd;
    text-align: center;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #e5e5e5;
  }

  th {
    background-color: #4CAF50;
    color: white;
  }

  td {
    font-weight: bold;
  }

  td.result {
    font-weight: bold;
    background-color: #e6e6e6;
  }
`;

export const QuestionDescription = styled.div`
  h1 {
    font-size: 24px;
    font-weight: 500;
  }
  h3 {
    text-align: center;
    font-weight: 700;
    text-decoration:underline;
  }
  text-align:left;
  .correct-ans {
    font-weight: bold;
    color: green;
    padding-left: 10px;
  }
  .incorrect-ans {
    font-weight:bold;
    color: red;
    text-decoration: line-through;
    padding-left:10px;
  }
`;

