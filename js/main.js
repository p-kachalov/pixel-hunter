'use strict';

const SCREEN_SEQUENCE = [
  `greeting`,
  `rules`,
  `game-1`,
  `game-2`,
  `game-3`,
  `stats`,
  `modal-error`,
  `modal-confirm`,
];

const ARROW_BUTTONS_TEMPLATE = `
<div class="arrows__wrap">
<style>
  .arrows__wrap {
    position: absolute;
    top: 95px;
    left: 50%;
    margin-left: -56px;
  }
  .arrows__btn {
    background: none;
    border: 2px solid black;
    padding: 5px 20px;
  }
</style>
<button class="arrows__btn"><-</button>
<button class="arrows__btn">-></button>
</div>
`;

const KeyCode = {
  LEFT: 37,
  RIGHT: 39
};

const clearContainer = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const generateScreensFromTemplate = () => {
  const templates = document.querySelectorAll(`template`);
  const screens = [];
  for (let template of templates) {
    screens[SCREEN_SEQUENCE.indexOf(template.id)] = template.content;
  }
  return screens;
};

const screens = generateScreensFromTemplate();
const container = document.querySelector(`.central`);

const renderScreen = (number) => {
  if (number < 0 || number > screens.length - 1) {
    return;
  }

  currentScreen = number;
  clearContainer(container);
  container.appendChild(screens[currentScreen].cloneNode(true));
};

const prevScreen = () => {
  renderScreen(currentScreen - 1);
};

const nextScreen = () => {
  renderScreen(currentScreen + 1);
};

const addArrowKeyHandlers = () => {
  document.addEventListener(`keydown`, (evt) => {
    switch (evt.keyCode) {
      case KeyCode.LEFT:
        prevScreen();
        break;
      case KeyCode.RIGHT:
        nextScreen();
        break;
      default:
        break;
    }
  });
};

const addArrowsButtons = () => {
  const arrawButtons = document.createElement(`template`);
  arrawButtons.innerHTML = ARROW_BUTTONS_TEMPLATE;
  document.querySelector(`body`).appendChild(arrawButtons.content);

  const buttons = document.querySelectorAll(`.arrows__btn`);
  for (let btn of buttons) {
    btn.addEventListener(`click`, (evt) => {
      switch (evt.target.textContent) {
        case `<-`:
          prevScreen();
          break;
        case `->`:
          nextScreen();
          break;
        default:
          break;
      }
    });
  }
};

let currentScreen = 0;

const init = () => {
  renderScreen(currentScreen);
  addArrowKeyHandlers();
  addArrowsButtons();
};

init();
