
import controller from './controller';

const initialState = {
  screen: `intro`,
  gameStatus: {
    lives: 2,
    time: 0
  },
};

controller(initialState, null);
