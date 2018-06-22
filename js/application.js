import introScreen from './intro/intro';
import greetingScreen from './greeting/greeting';

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

}
