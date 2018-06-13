import renderTemplate from './render-template';

const contentTemplate = `
<div class="game">
  <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
  <form class="game__content">
    <div class="game__option">
      <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
    <div class="game__option">
      <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
      <label class="game__answer  game__answer--photo">
        <input name="question2" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input name="question2" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
</div>
`;

export default (callback) => {
  const screen = document.createElement(`template`);
  const content = renderTemplate(contentTemplate);

  screen.content.appendChild(content);

  const form = screen.content.querySelector(`.game__content`);
  const question1 = form.elements.question1;
  const question2 = form.elements.question2;

  form.addEventListener(`change`, () => {
    if (question1.value && question2.value) {
      callback({});
    }
  });

  return screen.content;
};
