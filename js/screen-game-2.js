import renderTemplate from './render-template';
import AnswerSpeed from './answer-speed';

const getSpeed = () => {
  // here will be a function which calculate answer speed
  return AnswerSpeed.NORMAL;
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

const renderOption = (image) => {
  const gameOptionTemplate = `
  <div class="game__option">
    <img src="${image.src}" alt="${image.alt}" width="${image.width}" height="${image.height}">
    <label class="game__answer  game__answer--photo">
      <input name="${image.name}" type="radio" value="photo" required>
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint game__answer--wide">
      <input name="${image.name}" type="radio" value="paint" required>
      <span>Рисунок</span>
    </label>
  </div>
  `;

  const gameOption = renderTemplate(gameOptionTemplate);
  return gameOption;
};

export default (data, callback) => {
  const screen = document.createElement(`template`);
  const questionTemplate = `
  <div class="game">
    <p class="game__task">${data.text}</p>
    <form class="game__content  game__content--wide"></form>
  </div>
  `;

  const question = renderTemplate(questionTemplate);
  const gameContent = question.querySelector(`.game__content`);

  data.images.forEach((image) => {
    const option = renderOption(image);
    gameContent.appendChild(option);
  });

  gameContent.addEventListener(`change`, () => {
    if (!gameContent.reportValidity()) {
      return;
    }
    const result = getResult(data.images, gameContent.elements);
    callback({right: result, speed: getSpeed()});
  });

  screen.content.appendChild(question);
  return screen.content;
};
