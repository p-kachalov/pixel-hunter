import renderTemplate from './render-template';
import controller from './controller';
import getFooter from './footer';
import getHeader from './header';
import getStatus from './game-status';

const contentTemplate = `
<div class="game">
  <p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
    <div class="game__option">
      <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option  game__option--selected">
      <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option">
      <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
    </div>
  </form>
  <div class="stats">
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </div>
</div>
`;

export default (state) => {
  const screen = document.createElement(`template`);
  const header = getHeader(state);
  const status = getStatus();
  const content = renderTemplate(contentTemplate);
  const footer = getFooter();

  header.appendChild(status);

  screen.content.appendChild(header);
  screen.content.appendChild(content);
  screen.content.appendChild(footer);

  const options = screen.content.querySelectorAll(`.game__option`);

  for (const option of options) {
    option.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      controller(state, {});
    });
  }

  return screen.content;
};
