import getIntro from './screen-intro';
import getGreeting from './screen-greeting';
import getRuls from './screen-rules';
import getGame from './screen-game';
import getStats from './screen-results';
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

export default (state) => {
  const newScreen = getScreen[state.screen](state, (update) => {
    controller(state, update);
  });
  clearContainer(container);
  container.appendChild(newScreen);
};
