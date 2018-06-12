import getIntro from './screen-intro';
import getGreeting from './screen-greeting';
import getRuls from './screen-rules';
import getGame1 from './screen-game-1';
import getGame2 from './screen-game-2';
import getGame3 from './screen-game-3';
import getStats from './screen-stats';

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
  'game1': getGame1,
  'game2': getGame2,
  'game3': getGame3,
  'stats': getStats,
};

export default (state) => {
  const newScreen = getScreen[state.screen](state);
  clearContainer(container);
  container.appendChild(newScreen);
};
