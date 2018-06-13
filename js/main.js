
import renderScreen from './render-screen';

const QUESTION_NUMBER = 10;

const initialState = {
  screen: `intro`,
  lives: 2,
  time: 0,
  answers: [],
  questionNumber: QUESTION_NUMBER,
};

renderScreen(initialState);
