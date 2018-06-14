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

const getQuestionTemplate = (questionText) => {
  const questionTemplate = `
  <div class="game">
    <p class="game__task">${questionText}</p>
  </div>
  `;
  return questionTemplate;
};

const getFormTemplate = (questionType) => {
  switch (questionType) {
    case `single`:
      return `<form class="game__content  game__content--wide"></form>`;
    case `double`:
      return `<form class="game__content"></form>`;
    case `triple`:
      return `<form class="game__content  game__content--triple"></form>`;
    default:
      return `<form class="game__content"></form>`;
  }
};

const getSingleOptrionTemplate = (image) => {
  return `
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
};

const getDoubleOptrionTemplate = (image) => {
  return `
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
};

const getTripleOptrionTemplate = (image) => {
  return `
  <div class="game__option" data-name="${image.name}">
    <img src="${image.src}" alt="${image.alt}" width="${image.width}" height="${image.height}">
  </div>
  `;
};

const getOptionTemplate = (image, questionType) => {
  switch (questionType) {
    case `single`:
      return getSingleOptrionTemplate(image);
    case `double`:
      return getDoubleOptrionTemplate(image);
    case `triple`:
      return getTripleOptrionTemplate(image);
    default:
      return getDoubleOptrionTemplate(image);
  }
};

export default (data, callback) => {
  const screen = document.createElement(`template`);

  const question = renderTemplate(getQuestionTemplate(data.text));
  const form = renderTemplate(getFormTemplate(data.type));
  question.appendChild(form);

  const gameContent = question.querySelector(`.game__content`);
  data.images.forEach((image) => {
    const option = renderTemplate(getOptionTemplate(image, data.type));
    gameContent.appendChild(option);
  });

  if (data.type === `triple`) {
    const options = gameContent.querySelectorAll(`.game__option`);
    for (const option of options) {
      option.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const questions = data.images;
        const answerName = evt.target.dataset.name;
        const result = questions.filter((item) => item.name === answerName)[0].rightValue;
        callback({right: result, speed: getSpeed()});
      });
    }
  } else {
    gameContent.addEventListener(`change`, () => {
      if (!gameContent.reportValidity()) {
        return;
      }
      const result = getResult(data.images, gameContent.elements);
      callback({right: result, speed: getSpeed()});
    });
  }

  screen.content.appendChild(question);
  return screen.content;
};
