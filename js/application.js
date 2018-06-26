import introScreen from './intro/intro';
import greetingScreen from './greeting/greeting';
import rulesScreen from './rules/rules';
import GameScreen from './game/game';
import GameModel from './game-model';
import ErrorView from './error/error-view';
import resultsScreen from './results/results';
import Loader from './loader';

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
let pastResults = null;

export default class Router {
  static showIntro() {
    const intro = introScreen();
    changeView(intro);
    Loader.loadData()
      .then((data) => {
        gameData = data;
        Router.showGreeting();
      })
      .catch((error) => {
        Router.showError(error);
      });
  }

  static showGreeting(results) {
    pastResults = results;
    const greeting = greetingScreen();
    changeView(greeting);
  }

  static showRules() {
    const rules = rulesScreen();
    changeView(rules);
  }

  static showGame(userName) {
    const model = new GameModel(userName, gameData, pastResults);
    const game = new GameScreen(model);
    changeView(game.element);
  }

  static showResults(model) {
    const results = resultsScreen(model);
    changeView(results);
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    changeView(errorView.element);
  }


}
