import renderTemplate from './render-template';

export default (state) => {
  const screen = document.createElement(`template`);
  const timer = renderTemplate(`<h1 class="game__timer">${state.gameStatus.time}</h1>`);
  const lives = renderTemplate(`
  <div class="game__lives">
    ${new Array(3 - state.gameStatus.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
    ${new Array(state.gameStatus.lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
  </div>
  `);

  screen.content.appendChild(timer);
  screen.content.appendChild(lives);

  return screen.content;
};
