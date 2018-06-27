import GameType from '../data/game-type';
import HeaderView from '../blocks/header-view';
import StatusView from '../blocks/status-view';
import ConfirmView from '../blocks/confirm-view';
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
  return new Game(question, true);
};

export default class GameSceen {
  constructor(model, transitionBack, transitionForward) {
    this.model = model;
    this.transitionBack = transitionBack;
    this.transitionForward = transitionForward;

    const status = new StatusView(model);
    this.header = new HeaderView(status.element);
    this.header.onBackClick = () => this.showConfirm();
    this.stats = new StatsView(model.answers, model.settings.questionNumber);
    this.footer = new FooterView();
    this.confirm = new ConfirmView();
    this.confirm.onCancelClick = () => this.hideConfirm();
    this.confirm.onCloseClick = () => this.hideConfirm();
    this.confirm.onOkClick = () => {
      this.stopGame();
      this.transitionBack();
    };

    const question = this.model.getQuestion();
    this.game = makeNewGame(question);
    this.game.onAnswer = (result) => this.onAnswer(result);

    this.gameView = new GameView(this.header.element, this.footer.element, this.stats.element, this.game.element);
  }

  get element() {
    return this.gameView.element;
  }

  showConfirm() {
    this.header.element.parentNode.appendChild(this.confirm.element);
  }

  hideConfirm() {
    this.confirm.element.parentNode.removeChild(this.confirm.element);
  }

  startGame() {
    const ticker = (timer) => {
      this.model.time = timer.time;
      this.updateStatus();
      if (timer.time === 0) {
        this.onAnswer(false);
        return;
      }
      this.timeout = window.setTimeout(() => {
        ticker(timer.tick());
      }, 1000);
    };

    ticker(getTimer(this.model.settings.timeOnAnswer));
  }

  stopGame() {
    window.clearTimeout(this.timeout);
  }

  onAnswer(result) {
    this.stopGame();
    this.model.handleAnswer(result);
    if (this.model.gameOver) {
      this.model.saveResult();
      this.transitionForward(this.model);
    } else {
      this.nextLevel();
      this.updateStatus();
      this.updateStats();
    }
  }

  nextLevel() {
    const question = this.model.getQuestion();
    const newGame = makeNewGame(question);
    newGame.onAnswer = (result) => this.onAnswer(result);

    this.game.element.parentNode.replaceChild(newGame.element, this.game.element);
    this.game = newGame;
    this.startGame();
  }

  updateStatus() {
    const newStatus = new StatusView(this.model);
    const newHeader = new HeaderView(newStatus.element);

    this.header.element.parentNode.replaceChild(newHeader.element, this.header.element);
    this.header = newHeader;
    this.header.onBackClick = () => this.showConfirm();
  }

  updateStats() {
    const newStats = new StatsView(this.model.answers, this.model.settings.questionNumber);
    this.stats.element.parentNode.replaceChild(newStats.element, this.stats.element);
    this.stats = newStats;
  }
}
