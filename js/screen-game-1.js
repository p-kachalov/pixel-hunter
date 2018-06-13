import renderTemplate from './render-template';
import AnswerSpeed from './answer-speed';

const questionData = {
  type: `double-choose`,
  text: `Угадайте для каждого изображения фото или рисунок?`,
  images: [
    {name: `question1`, rightValue: `paint`, src: `http://placehold.it/468x458`, alt: `Option 1`, width: `468`, height: `458`},
    {name: `question2`, rightValue: `photo`, src: `http://placehold.it/468x458`, alt: `Option 2`, width: `468`, height: `458`},
  ]
};

const getSpeed = () => {
  // here will be a function which calculate answer speed
  return AnswerSpeed.NORMAL;
};

const renderOption = (image) => {
  const gameOptionTemplate = `
  <div class="game__option">
    <img src="${image.src}" alt="${image.alt}" width="${image.width}" height="${image.height}">
    <label class="game__answer  game__answer--photo">
      <input name="${image.name}" type="radio" value="photo" required>
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input name="${image.name}" type="radio" value="paint" required>
      <span>Рисунок</span>
    </label>
  </div>
  `;

  const gameOption = renderTemplate(gameOptionTemplate);
  return gameOption;
};

const getResult = (questions, answers) => {
  let result = true;

  questions.forEach((question) => {
    const answer = answers[question.name];
    if (question.rightValue !== answer.value) {
      result = false;
    }
  });

  return result;
};

export default (callback) => {
  const screen = document.createElement(`template`);
  const questionTemplate = `
  <div class="game">
    <p class="game__task">${questionData.text}</p>
    <form class="game__content"></form>
  </div>
  `;

  const question = renderTemplate(questionTemplate);
  const gameContent = question.querySelector(`.game__content`);

  questionData.images.forEach((image) => {
    const option = renderOption(image);
    gameContent.appendChild(option);
  });

  gameContent.addEventListener(`change`, () => {
    if (!gameContent.reportValidity()) {
      return;
    }
    const result = getResult(questionData.images, gameContent.elements);
    callback({right: result, speed: getSpeed()});
  });

  screen.content.appendChild(question);
  return screen.content;
};
