
import renderScreen from './render-screen';

const initialState = {
  screen: `intro`,
  gameStatus: {
    lives: 2,
    time: 0
  },
};

renderScreen(initialState);
