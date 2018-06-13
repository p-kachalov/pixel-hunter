import getFooter from './footer';
import getHeader from './header';
import getStatus from './game-status';
import getStats from './game-stats';
import controller from './controller';
import game1 from './screen-game-1';
import game2 from './screen-game-2';
import game3 from './screen-game-3';

const Game = {
  'double-choose': game1,
  'choose': game2,
  'finde': game3,
};

const calcLives = (answer, lives) => {
  return answer.right ? lives : lives - 1;
};

export default (state) => {
  const screen = document.createElement(`template`);
  const header = getHeader(state);
  const status = getStatus(state);
  const stats = getStats(state);
  const footer = getFooter();

  const callback = (userAnswer) => {
    const lives = calcLives(userAnswer, state.lives);
    const answers = [...state.answers, userAnswer];
    const gameOver = lives === 0 || answers.length === state.questions.length;

    const gameUpdate = {lives, answers, gameOver};
    controller(state, gameUpdate);
  };

  const newQuestion = state.questions[state.answers.length];
  const newGame = Game[newQuestion.type];

  const game = newGame(newQuestion, callback);

  header.appendChild(status);
  screen.content.appendChild(header);
  screen.content.appendChild(game);
  screen.content.appendChild(stats);
  screen.content.appendChild(footer);

  return screen.content;
};
