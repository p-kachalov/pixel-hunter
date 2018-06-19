import renderTemplate from './render-template';
import getFooter from './block-footer';

const contentTemplate = `
<div id="main" class="central__content">
  <div id="intro" class="intro">
    <h1 class="intro__asterisk">*</h1>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </div>
</div>
`;

export default (state, callback) => {
  const screen = document.createElement(`template`);

  const content = renderTemplate(contentTemplate);
  const footer = getFooter();

  screen.content.appendChild(content);
  screen.content.appendChild(footer);

  const link = screen.content.querySelector(`.intro__asterisk`);
  link.addEventListener(`click`, () => {
    callback(true);
  });
  return screen.content;
};
