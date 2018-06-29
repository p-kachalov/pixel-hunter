import introScreen from './intro/intro';
import greetingScreen from './greeting/greeting';
import rulesScreen from './rules/rules';
import GameScreen from './game/game';
import GameModel from './game-model';
import ErrorView from './error/error-view';
import ResultsScreen from './results/results';
import Loader from './loader';
import ConfirmView from './blocks/confirm-view';

const container = document.querySelector(`.central`);

const clearContainer = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const changeView = (element) => {
  clearContainer(container);
  container.appendChild(element);
};

let gameData = null;

export default class Application {
  static showIntro() {
    const intro = introScreen();
    changeView(intro);
    Loader.loadData().
      then((data) => {
        gameData = data;
        Application.showGreeting();
      }).
      catch((error) => Application.showError(error));
  }

  static showGreeting() {
    const greeting = greetingScreen(Application.showRules);
    changeView(greeting);
  }

  static showRules() {
    const rules = rulesScreen(Application.showGreeting, Application.showGame);
    changeView(rules);
  }

  static showGame(userName) {
    const model = new GameModel(userName, gameData);
    const game = new GameScreen(model, () => Application.showConfirm(game), Application.showResults);
    changeView(game.element);
    game.startGame();
  }

  static showResults(model) {
    const results = new ResultsScreen(model, Application.showGreeting);
    changeView(results.element);
    Loader.saveResults(model.result, model.userName).
      then(() => Loader.loadResults(model.userName)).
      then((data) => results.renderResultTable(data)).
      catch(Application.showError);
  }

  static showConfirm(game) {
    const confirm = new ConfirmView();
    confirm.onCancelClick = () => Application.hideConfirm(confirm);
    confirm.onCloseClick = () => Application.hideConfirm(confirm);
    confirm.onOkClick = () => {
      game.stopGame();
      Application.hideConfirm(confirm);
      Application.showGreeting();
    };

    container.parentNode.appendChild(confirm.element);
  }

  static hideConfirm(confirm) {
    container.parentNode.removeChild(confirm.element);
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    changeView(errorView.element);
  }
}
