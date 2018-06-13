import renderTemplate from './render-template';
import AnswerSpeed from './answer-speed';

const getSpeed = () => {
  // here will be a function which calculate answer speed
  return AnswerSpeed.NORMAL;
};

const getResult = (questions, answerName) => {
  const result = questions.filter((question) => question.name === answerName)[0].rightValue;
  return result;
};

const renderOption = (image) => {
  const gameOptionTemplate = `
  <div class="game__option" data-name="${image.name}">
    <img src="${image.src}" alt="${image.alt}" width="${image.width}" height="${image.height}">
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
    <form class="game__content  game__content--triple"></form>
  </div>
  `;

  const question = renderTemplate(questionTemplate);
  const gameContent = question.querySelector(`.game__content`);

  data.images.forEach((image) => {
    const option = renderOption(image);
    gameContent.appendChild(option);
  });

  const options = gameContent.querySelectorAll(`.game__option`);

  for (const option of options) {
    option.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const result = getResult(data.images, evt.target.dataset.name);
      callback({right: result, speed: getSpeed()});
    });
  }

  screen.content.appendChild(question);
  return screen.content;
};
