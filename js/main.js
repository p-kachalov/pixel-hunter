
import renderScreen from './render-screen';
import getGame1 from './screen-game-1';
import getGame2 from './screen-game-2';
import getGame3 from './screen-game-3';

const initialState = {
  screen: `intro`,
  lives: 3,
  time: 0,
  answers: [],
  questions: [getGame1, getGame2, getGame3, getGame1, getGame2, getGame3, getGame1, getGame2, getGame3, getGame2],
};

renderScreen(initialState);
