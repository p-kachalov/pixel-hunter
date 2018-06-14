import getFooter from './block-footer';
import getHeader from './block-header';
import getStatus from './block-status';
import getStats from './block-stats';
import controller from './controller';
import renderGame from './block-game';

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

  const game = renderGame(newQuestion, callback);

  header.appendChild(status);
  screen.content.appendChild(header);
  screen.content.appendChild(game);
  screen.content.appendChild(stats);
  screen.content.appendChild(footer);

  return screen.content;
};
