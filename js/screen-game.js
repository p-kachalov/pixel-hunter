import Answer from './answer';
import GameType from './game-type';
import HeaderView from './view/header-view';
import StatusView from './view/status-view';
import StatsView from './view/stats-view';
import FooterView from './view/footer-view';
import GameView from './view/game-view';
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
  const status = new StatusView(state);
  const header = new HeaderView(status.element);
  header.onBackClick = () => callback({back: true});
  const stats = new StatsView(state.answers, state.settings.questionNumber);
  const footer = new FooterView();


  const question = state.questions[state.answers.length];
  const Game = GameController[question.type];

  const game = new Game(question, (result) => {
    const time = 15; // here will be a timer
    const answer = getAnswer(time, result, state.settings);
    const update = makeUpdate(state, answer);
    callback(update);
  });

  const gameScreen = new GameView(header.element, footer.element, stats.element, game.getView().element);

  return gameScreen.element;
};
