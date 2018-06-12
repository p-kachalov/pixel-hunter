import renderTemplate from './render-template';
import controller from './controller';
import getFooter from './footer';
import getHeader from './header';
import getStatus from './game-status';

const contentTemplate = `
<div class="game">
  <p class="game__task">Угадай, фото или рисунок?</p>
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--wide  game__answer--paint">
        <input name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
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
  const header = getHeader();
  const status = getStatus();
  const content = renderTemplate(contentTemplate);
  const footer = getFooter();

  header.appendChild(status);

  screen.content.appendChild(header);
  screen.content.appendChild(content);
  screen.content.appendChild(footer);

  const form = screen.content.querySelector(`.game__content`);
  const question1 = form.elements.question1;

  form.addEventListener(`change`, () => {
    if (question1.value) {
      controller(state, {});
    }
  });

  return screen.content;
};
