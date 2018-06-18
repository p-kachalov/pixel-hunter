import renderTemplate from './render-template';
import Answer from './answer';

const getResult = (questions, answers) => {
  let result = true;

  questions.forEach((question) => {
    const answer = answers[question.name];
    if (question.rightValue !== answer.value) {
      result = false;
    }
  });

  return result ? Answer.CORRECT : Answer.WRONG;
};

const getQuestionTemplate = (questionText) => {
  const questionTemplate = `
  <div class="game">
    <p class="game__task">${questionText}</p>
  </div>
  `;
  return questionTemplate;
};

const getOptionTemplate = (image) => {
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

export default (data, callback) => {
  const screen = document.createElement(`template`);

  const question = renderTemplate(getQuestionTemplate(data.text));
  const form = renderTemplate(`<form class="game__content  game__content--wide"></form>`);
  question.appendChild(form);

  const gameContent = question.querySelector(`.game__content`);
  data.images.forEach((image) => {
    const option = renderTemplate(getOptionTemplate(image, data.type));
    gameContent.appendChild(option);
  });

  gameContent.addEventListener(`change`, () => {
    if (!gameContent.reportValidity()) {
      return;
    }
    const result = getResult(data.images, gameContent.elements);
    callback(result);
  });

  screen.content.appendChild(question);
  return screen.content;
};
