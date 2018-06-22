import Answer from '../data/answer';
import GameType from '../data/game-type';
import HeaderView from '../blocks/header-view';
import StatusView from '../blocks/status-view';
import StatsView from '../blocks/stats/stats-view';
import FooterView from '../blocks/footer-view';
import GameView from './game-view';
import GameSingleView from './game-single-view';
import GameDoubleView from './game-double-view';
import GameTripleView from './game-triple-view';

const getAnswer = (time, result, settings) => {
  if (!result) {
    return Answer.WRONG;
  }
  if (time < settings.fastTime) {
    return Answer.FAST;
  }
  if (time > settings.slowTime) {
    return Answer.SLOW;
  }

  return Answer.CORRECT;
};

const makeUpdate = (state, answer) => {
  const lives = (answer === Answer.WRONG) ? state.lives - 1 : state.lives;
  const answers = [...state.answers, answer];
  const gameOver = lives === 0 || answers.length === state.settings.questionNumber;

  return {lives, answers, gameOver};
};

const getGame = {
  [GameType.SINGLE]: GameSingleView,
  [GameType.DOUBLE]: GameDoubleView,
  [GameType.TRIPLE]: GameTripleView,
};

export default (state, callback) => {
  const statusView = new StatusView(state);
  const headerView = new HeaderView(statusView.element);
  headerView.onBackClick = () => callback({back: true});

  const statsView = new StatsView(state.answers, state.settings.questionNumber);
  const footerView = new FooterView();


  const question = state.questions[state.answers.length];
  const Game = getGame[question.type];

  const game = new Game(question);
  game.onAnswer = (result) => {
    const time = 15; // here will be a timer
    const answer = getAnswer(time, result, state.settings);
    const update = makeUpdate(state, answer);
    callback(update);
  };

  const gameView = new GameView(headerView.element, footerView.element, statsView.element, game.element);

  return gameView.element;
};
