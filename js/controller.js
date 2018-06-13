import renderScreen from './render-screen';

const introController = (state) => {
  const newState = Object.assign({}, state, {screen: `greeting`});
  return newState;
};

const greetingController = (state, update) => {
  if (!update) {
    return state;
  }
  const newState = Object.assign({}, state, {screen: `rules`});
  return newState;
};

const rulesController = (state, update) => {
  const newState = Object.assign({}, state, {screen: `game1`, userName: update.userName});
  return newState;
};


const game1Controller = (state) => {
  const newState = Object.assign({}, state, {screen: `game2`});
  return newState;
};

const game2Controller = (state) => {
  const newState = Object.assign({}, state, {screen: `game3`});
  return newState;
};

const game3Controller = (state) => {
  const newState = Object.assign({}, state, {screen: `stats`});
  return newState;
};

const statsController = (state) => {
  return state;
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
  if (update && update.back) {
    renderScreen(Object.assign({}, state, {screen: `greeting`}));
    return;
  }

  const newState = handleScreen[state.screen](state, update);
  renderScreen(newState);
};
