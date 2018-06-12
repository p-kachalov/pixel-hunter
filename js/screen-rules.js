import renderTemplate from './render-template';
import controller from './controller';
import getFooter from './footer';
import getHeader from './header';


const contentTemplate = `
<div class="rules">
  <h1 class="rules__title">Правила</h1>
  <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
    src="img/photo_icon.png" width="16" height="16"> или рисунок <img
    src="img/paint_icon.png" width="16" height="16" alt="">.<br>
    Фотографиями или рисунками могут быть оба изображения.<br>
    На каждую попытку отводится 30 секунд.<br>
    Ошибиться можно не более 3 раз.<br>
    <br>
    Готовы?
  </p>
  <form class="rules__form">
    <input class="rules__input" type="text" placeholder="Ваше Имя">
    <button class="rules__button  continue" type="submit" disabled>Go!</button>
  </form>
</div>
`;

export default (state) => {
  const screen = document.createElement(`template`);
  const header = getHeader();
  const content = renderTemplate(contentTemplate);
  const footer = getFooter();

  screen.content.appendChild(header);
  screen.content.appendChild(content);
  screen.content.appendChild(footer);

  const form = screen.content.querySelector(`.rules__form`);
  const input = screen.content.querySelector(`.rules__input`);
  const button = screen.content.querySelector(`.rules__button`);

  input.addEventListener(`input`, (evt) => {
    button.disabled = evt.target.value.length === 0;
  });

  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    controller(state, {back: false, userName: input.value});
  });

  return screen.content;
};
