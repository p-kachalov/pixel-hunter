import Answer from '../data/answer';
import GameType from '../data/game-type';
import HeaderView from '../blocks/header-view';
import StatusView from '../blocks/status-view';
import StatsView from '../blocks/stats/stats-view';
import FooterView from '../blocks/footer-view';
import GameView from './game-view';
import GameSingleController from './game-single';
import GameDoubleController from './game-double';
import GameTripleController from './game-triple';

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

const GameController = {
  [GameType.SINGLE]: GameSingleController,
  [GameType.DOUBLE]: GameDoubleController,
  [GameType.TRIPLE]: GameTripleController,
};

export default (state, callback) => {
  const statusView = new StatusView(state);
  const headerView = new HeaderView(statusView.element);
  headerView.onBackClick = () => callback({back: true});

  const statsView = new StatsView(state.answers, state.settings.questionNumber);
  const footerView = new FooterView();


  const question = state.questions[state.answers.length];
  const Game = GameController[question.type];

  const game = new Game(question, (result) => {
    const time = 15; // here will be a timer
    const answer = getAnswer(time, result, state.settings);
    const update = makeUpdate(state, answer);
    callback(update);
  });

  const gameView = new GameView(headerView.element, footerView.element, statsView.element, game.getView().element);

  return gameView.element;
};
