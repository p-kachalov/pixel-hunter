import initialState from './data/initial-state';

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

const finishGame = (state) => {
  const newState = Object.assign({}, initialState, {
    screen: `stats`,
    results: [...state.results, {
      lives: state.lives,
      answers: state.answers,
      settings: state.settings
    }],
  });

  return newState;
};

const gameController = (state, update) => {
  const newState = Object.assign({}, state, {
    screen: `game`,
    lives: update.lives,
    answers: update.answers,
  });

  return update.gameOver ? finishGame(newState) : newState;
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
    return Object.assign({}, initialState, {screen: `greeting`, results: state.results});
  }

  return handleScreen[state.screen](state, update);
};
