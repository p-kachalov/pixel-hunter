import renderTemplate from './render-template';
import Answer from './answer';

const getResult = (questions, answers) => {
  let userRight = true;

  questions.forEach((question) => {
    const answer = answers[question.name];
    if (question.rightValue !== answer.value) {
      userRight = false;
    }
  });

  return userRight ? Answer.SLOW : Answer.WRONG;
};

const getOptionTemplate = (image) => {
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

const getGameTemplate = (questionText, containerClass) => {
  return `
  <div class="game">
    <p class="game__task">${questionText}</p>
    <form class="game__content  ${containerClass}"></form>
  </div>
  `;
};

export default (data, callback) => {
  const container = document.createElement(`template`);
  const containerClass = ``;
  const form = renderTemplate(getGameTemplate(data.text, containerClass));
  container.content.appendChild(form);

  const gameContent = container.content.querySelector(`.game__content`);
  data.images.forEach((image) => {
    const option = renderTemplate(getOptionTemplate(image));
    gameContent.appendChild(option);
  });

  gameContent.addEventListener(`change`, () => {
    if (!gameContent.reportValidity()) {
      return;
    }

    const result = getResult(data.images, gameContent.elements);
    callback(result);
  });

  return container.content;
};
