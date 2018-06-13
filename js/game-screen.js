import getFooter from './footer';
import getHeader from './header';
import getStatus from './game-status';
import getStats from './game-stats';
import controller from './controller';

const calcLives = (answer, lives) => {
  return answer.right ? lives : lives - 1;
};

export default (state) => {
  const screen = document.createElement(`template`);
  const header = getHeader(state);
  const status = getStatus(state);
  const stats = getStats(state);
  const footer = getFooter();

  const newGame = state.questions[state.answers.length];

  const game = newGame((userAnswer) => {
    const lives = calcLives(userAnswer, state.lives);
    const answers = [...state.answers, userAnswer];
    const gameOver = lives === 0 || answers.length === state.questions.length;

    const gameUpdate = {lives, answers, gameOver};
    controller(state, gameUpdate);
  });

  header.appendChild(status);

  screen.content.appendChild(header);
  screen.content.appendChild(game);
  screen.content.appendChild(stats);
  screen.content.appendChild(footer);

  return screen.content;
};
