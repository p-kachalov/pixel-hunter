import GameType from '../data/game-type';
import HeaderView from '../blocks/header-view';
import StatusView from '../blocks/status-view';
import StatsView from '../blocks/stats/stats-view';
import FooterView from '../blocks/footer-view';
import GameView from './game-view';
import GameSingleView from './game-single-view';
import GameDoubleView from './game-double-view';
import GameTripleView from './game-triple-view';
import getTimer from '../timer/timer';


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
  constructor(model, transitionBack, transitionForward) {
    this._model = model;
    this._transitionBack = transitionBack;
    this._transitionForward = transitionForward;

    const status = new StatusView(model);
    this._header = new HeaderView(status.element);
    this._header.onBackClick = () => this._transitionBack();
    this._stats = new StatsView(model.answers, model.settings.questionNumber);
    this._footer = new FooterView();

    const question = this._model.getQuestion();
    this._game = makeNewGame(question);
    this._game.onAnswer = (result) => this.onAnswer(result);

    this._gameView = new GameView(this._header.element, this._footer.element, this._stats.element, this._game.element);
  }

  get element() {
    return this._gameView.element;
  }

  startGame() {
    const ticker = (timer) => {
      this._model.time = timer.time;
      this.updateStatus();
      if (timer.time === 0) {
        this.onAnswer(false);
        return;
      }
      this.timeout = window.setTimeout(() => {
        ticker(timer.tick());
      }, 1000);
    };

    ticker(getTimer(this._model.settings.timeOnAnswer));
  }

  stopGame() {
    window.clearTimeout(this.timeout);
  }

  onAnswer(result) {
    this.stopGame();
    this._model.handleAnswer(result);
    if (this._model.gameOver) {
      this._model.saveResult();
      this._transitionForward(this._model);
    } else {
      this.nextLevel();
      this.updateStatus();
      this.updateStats();
    }
  }

  nextLevel() {
    const question = this._model.getQuestion();
    const newGame = makeNewGame(question);
    newGame.onAnswer = (result) => this.onAnswer(result);

    this._game.element.parentNode.replaceChild(newGame.element, this._game.element);
    this._game = newGame;
    this.startGame();
  }

  updateStatus() {
    const newStatus = new StatusView(this._model);
    const newHeader = new HeaderView(newStatus.element);

    this._header.element.parentNode.replaceChild(newHeader.element, this._header.element);
    this._header = newHeader;
    this._header.onBackClick = () => this._transitionBack();
  }

  updateStats() {
    const newStats = new StatsView(this._model.answers, this._model.settings.questionNumber);
    this._stats.element.parentNode.replaceChild(newStats.element, this._stats.element);
    this._stats = newStats;
  }
}
