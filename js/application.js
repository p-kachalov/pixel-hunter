import introScreen from './intro/intro';
import greetingScreen from './greeting/greeting';
import rulesScreen from './rules/rules';
import GameScreen from './game/game';
import GameModel from './game-model';
import ErrorView from './error/error-view';
import resultsScreen from './results/results';

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

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Router {

  static showIntro() {
    const intro = introScreen();
    changeView(intro);
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`).
      then(checkStatus).
      then((response) => {
        // console.log(response);
        Router.showGreeting(response);
      })
      .catch((error) => {
        Router.showError(error);
      });
  }

  static showGreeting(results) {
    const greeting = greetingScreen(results);
    changeView(greeting);
  }

  static showRules(results) {
    const rules = rulesScreen(results);
    changeView(rules);
  }

  static showGame(userName, results) {
    const model = new GameModel(userName, results);
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
