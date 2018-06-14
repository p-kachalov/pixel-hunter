import renderTemplate from './render-template';

const headerTemplate = `
<header class="header">
  <div class="header__back">
    <button class="back">
      <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
      <img src="img/logo_small.svg" width="101" height="44">
    </button>
  </div>
</header>
`;

export default (state, callback) => {
  const screen = document.createElement(`template`);
  const header = renderTemplate(headerTemplate);

  screen.content.appendChild(header);

  const backButton = screen.content.querySelector(`.back`);

  backButton.addEventListener(`click`, () => {
    callback({back: true});
  });

  return screen.content;
};
