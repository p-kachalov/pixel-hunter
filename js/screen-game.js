import getFooter from './block-footer';
import getHeader from './block-header';
import getStatus from './block-status';
import getStats from './block-stats';
import gameSingle from './block-game-single';
import gameDouble from './block-game-double';
import gameTriple from './block-game-triple';
import renderTemplate from './render-template';
import Answer from './answer';

const calcLives = (answer, lives) => {
  return (answer === Answer.WRONG) ? lives - 1 : lives;
};

const getGame = (questionType) => {
  if (questionType === `single`) {
    return gameSingle;
  } else if (questionType === `double`) {
    return gameDouble;
  } else if (questionType === `triple`) {
    return gameTriple;
  }
  return null;
};

export default (state, callback) => {
  const screen = document.createElement(`template`);
  const header = getHeader(state, callback);
  const status = getStatus(state);
  const footer = getFooter();

  const cb = (userAnswer) => {
    const lives = calcLives(userAnswer, state.lives);
    const answers = [...state.answers, userAnswer];
    const gameOver = lives === 0 || answers.length === state.questions.length;

    const gameUpdate = {lives, answers, gameOver};
    callback(gameUpdate);
  };

  const newQuestion = state.questions[state.answers.length];

  const game = getGame(newQuestion.type)(newQuestion, cb);

  const stats = getStats(state.answers, state.questions.length);
  const statsContainer = renderTemplate(`<div class="stats"></div>`);

  statsContainer.appendChild(stats);
  header.appendChild(status);
  screen.content.appendChild(header);
  screen.content.appendChild(game);
  screen.content.appendChild(statsContainer);
  screen.content.appendChild(footer);

  return screen.content;
};
