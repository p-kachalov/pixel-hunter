import introScreen from './intro/intro';
import greetingScreen from './greeting/greeting';
import rulesScreen from './rules/rules';
import GameScreen from './game/game';
import GameModel from './game-model';
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

export default class Router {

  static showIntro() {
    const intro = introScreen();
    changeView(intro);
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


}
