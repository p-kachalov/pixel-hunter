import renderScreen from './render-screen';
import initialState from './initial-state';

const introController = (state) => {
  const newState = Object.assign({}, state, {screen: `greeting`});
  return newState;
};

const greetingController = (state) => {
  const newState = Object.assign({}, state, {screen: `rules`});
  return newState;
};

const rulesController = (state, update) => {
  const newState = Object.assign({}, state, {screen: `game`, userName: update.userName});
  return newState;
};

const gameController = (state, update) => {
  const newScreen = update.gameOver ? `stats` : `game`;
  const newState = Object.assign({}, state, {
    screen: newScreen,
    lives: update.lives,
    answers: update.answers,
  });

  return newState;
};

const statsController = (state) => {
  return state;
};

const handleScreen = {
  'intro': introController,
  'greeting': greetingController,
  'rules': rulesController,
  'game': gameController,
  'stats': statsController,
};

export default (state, update) => {
  if (update && update.back) {
    renderScreen(Object.assign({}, initialState, {screen: `greeting`}));
    return;
  }

  const newState = handleScreen[state.screen](state, update);
  renderScreen(newState);
};
