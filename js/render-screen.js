import getIntro from './intro/intro';
import getGreeting from './greeting/greeting';
import getRuls from './rules/rules';
import getGame from './game/game';
import getStats from './results/results';
import controller from './controller';

const container = document.querySelector(`.central`);

const clearContainer = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const getScreen = {
  'intro': getIntro,
  'greeting': getGreeting,
  'rules': getRuls,
  'game': getGame,
  'stats': getStats,
};

const render = (state) => {
  const newScreen = getScreen[state.screen](state, (update) => {
    const newState = controller(state, update);
    render(newState);
  });
  clearContainer(container);
  container.appendChild(newScreen);
};

export default render;
