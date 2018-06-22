import introScreen from './intro/intro';
import greetingScreen from './greeting/greeting';
import rulesScreen from './rules/rules';
import gameScreen from './game/game';
import GameModel from './game-model';

import initialState from './data/initial-state'; // temp

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

  static showGreeting() {
    const greeting = greetingScreen();
    changeView(greeting);
  }

  static showRules() {
    const rules = rulesScreen();
    changeView(rules);
  }

  static showGame(userName) {
    const model = new GameModel(userName);
    model.state = initialState; // temp
    const game = gameScreen(model);
    changeView(game);
  }

}
