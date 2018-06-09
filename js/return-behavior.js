import changeScreen from './render-screen';
import renderBack from './screen-greeting';

export default (screen) => {
  const backButton = screen.querySelector(`.back`);

  backButton.addEventListener(`click`, () => {
    changeScreen(renderBack());
  });
};
