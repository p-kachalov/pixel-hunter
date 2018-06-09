import controller from './controller';

export default (screen, state) => {
  const backButton = screen.querySelector(`.back`);

  backButton.addEventListener(`click`, () => {
    controller(state, {back: true});
  });
};
