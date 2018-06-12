import renderScreen from './render-screen';

const introController = (state, update) => {
  if (!update) {
    renderScreen(state);
    return;
  }

  const newState = Object.assign({}, state, {screen: `greeting`});
  renderScreen(newState);
};

const greetingController = (state, update) => {
  if (!update) {
    return;
  }
  const newState = Object.assign({}, state, {screen: `rules`});
  renderScreen(newState);
};

const rulesController = (state, update) => {
  const newState = Object.assign({}, state, {screen: `game1`, userName: update.userName});
  renderScreen(newState);
};


const game1Controller = (state) => {
  const newState = Object.assign({}, state, {screen: `game2`});
  renderScreen(newState);
};

const game2Controller = (state) => {
  const newState = Object.assign({}, state, {screen: `game3`});
  renderScreen(newState);
};

const game3Controller = (state) => {
  const newState = Object.assign({}, state, {screen: `stats`});
  renderScreen(newState);
};

const statsController = () => {
};

const handleScreen = {
  'intro': introController,
  'greeting': greetingController,
  'rules': rulesController,
  'game1': game1Controller,
  'game2': game2Controller,
  'game3': game3Controller,
  'stats': statsController,
};

export default (state, update) => {
  handleScreen[state.screen](state, update);
};
