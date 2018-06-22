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
import Application from '../application';

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

const makeNewGame = (question) => {
  const Game = getGame[question.type];
  return new Game(question);
};

export default class GameSceen {
  constructor(model) {
    this.model = model;
    this.statusView = new StatusView(model);
    this.headerView = new HeaderView(this.statusView.element);
    this.headerView.onBackClick = () => Application.showGreeting();
    this.statsView = new StatsView(model.answers, model.settings.questionNumber);
    this.footerView = new FooterView();

    const question = this.model.getQuestion();
    this.game = makeNewGame(question);
    this.game.onAnswer = (result) => {
      const time = 15; // here will be a timer
      const answer = getAnswer(time, result, this.model.settings);
      const update = makeUpdate(this.model, answer);
      this.updateModel(update);
    };

    this.gameView = new GameView(this.headerView.element, this.footerView.element, this.statsView.element, this.game.element);
  }

  get element() {
    return this.gameView.element;
  }

  updateModel(update) {
    this.model.lives = update.lives;
    this.model.answers = update.answers;

    if (update.gameOver) {
      Application.showGreeting();
    } else {
      this.nextLevel();
    }
  }

  nextLevel() {
    const question = this.model.getQuestion();
    const game = makeNewGame(question);
    game.onAnswer = (result) => {
      const time = 15; // here will be a timer
      const answer = getAnswer(time, result, this.model.settings);
      const update = makeUpdate(this.model, answer);
      this.updateModel(update);
    };

    this.gameView.element.replaceChild(game.element, this.game.element);
    this.game = game;
  }
}
