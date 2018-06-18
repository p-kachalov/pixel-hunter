import Answer from './answer';
import GameType from './game-type';
import getFooter from './block-footer';
import getHeader from './block-header';
import getStatus from './block-status';
import getStats from './block-stats';
import gameSingle from './block-game-single';
import gameDouble from './block-game-double';
import gameTriple from './block-game-triple';
import renderTemplate from './render-template';

const Game = {
  [GameType.SINGLE]: gameSingle,
  [GameType.DOUBLE]: gameDouble,
  [GameType.TRIPLE]: gameTriple,
};

const getGameTemplate = (questionText) => {
  return `
  <div class="game">
    <p class="game__task">${questionText}</p>
  </div>
  `;
};

const getGame = (state, callback) => {
  // render game content
  const cb = (userAnswer) => {
    const lives = (userAnswer === Answer.WRONG) ? state.lives - 1 : state.lives;
    const answers = [...state.answers, userAnswer];
    const gameOver = lives === 0 || answers.length === state.settings.questionNumber;

    const gameUpdate = {lives, answers, gameOver};
    callback(gameUpdate);
  };

  const newQuestion = state.questions[state.answers.length];
  const game = renderTemplate(getGameTemplate(newQuestion.text));
  const gameContent = Game[newQuestion.type](newQuestion, cb);
  game.appendChild(gameContent);
  return game;
};

export default (state, callback) => {
  const screen = document.createElement(`template`);

  const header = getHeader(state, callback);
  const status = getStatus(state);
  header.appendChild(status);

  const game = getGame(state, callback);

  const stats = getStats(state.answers, state.questions.length);
  const statsContainer = renderTemplate(`<div class="stats"></div>`);
  statsContainer.appendChild(stats);

  const footer = getFooter();

  screen.content.appendChild(header);
  screen.content.appendChild(game);
  screen.content.appendChild(statsContainer);
  screen.content.appendChild(footer);
  return screen.content;
};
