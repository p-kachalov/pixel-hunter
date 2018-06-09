import renderScreen from './render-screen';
import getIntro from './screen-intro';
import getGreeting from './screen-greeting';
import getRuls from './screen-rules';


const introController = (state, update) => {
  if (!update) {
    renderScreen(getIntro(state));
    return;
  }

  const newState = Object.assign({}, state, {screen: `greeting`});
  renderScreen(getGreeting(newState));
};

const greetingController = (state, update) => {
  if (!update) {
    return;
  }
  const newState = Object.assign({}, state, {screen: `rules`});
  renderScreen(getRuls(newState));
};

const rulesController = (state, update) => {
  const newState = Object.assign({}, state, {screen: `rules`, userName: update.userName});
  renderScreen(getRuls(newState));
};

const handleScreen = {
  'intro': introController,
  'greeting': greetingController,
  'rules': rulesController,
};

export default (state, update) => {
  handleScreen[state.screen](state, update);
};
