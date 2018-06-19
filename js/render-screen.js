import getIntro from './intro';
import getGreeting from './greeting';
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

const render = (state) => {
  const newScreen = getScreen[state.screen](state, (update) => {
    const newState = controller(state, update);
    render(newState);
  });
  clearContainer(container);
  container.appendChild(newScreen);
};

export default render;
