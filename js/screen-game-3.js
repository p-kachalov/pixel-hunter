import renderTemplate from './render-template';

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
</div>
`;

const question = {
  type: `finde`,
  image1: `http://placehold.it/304x455`,
  image2: `http://placehold.it/304x455`,
  image3: `http://placehold.it/304x455`,
};

export default (callback) => {
  const screen = document.createElement(`template`);
  const content = renderTemplate(contentTemplate);

  screen.content.appendChild(content);

  const options = screen.content.querySelectorAll(`.game__option`);

  for (const option of options) {
    option.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      callback({right: true});
    });
  }

  return screen.content;
};
