
import renderScreen from './render-screen';
import AnswerSpeed from './answer-speed';

const initialState = {
  screen: `intro`,
  gameStatus: {
    lives: 2,
    time: 0
  },
  answers: [
    {right: true, speed: AnswerSpeed.NORMAL},
    {right: true, speed: AnswerSpeed.FAST},
    {right: true, speed: AnswerSpeed.SLOW},
    {right: false, speed: null},
    {right: true, speed: AnswerSpeed.NORMAL},
    {right: true, speed: AnswerSpeed.NORMAL},
    null,
    null,
    null,
    null
  ]
};

renderScreen(initialState);
