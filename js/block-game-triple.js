import renderTemplate from './render-template';
import Answer from './answer';

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
  <div class="game__option" data-name="${image.name}">
    <img src="${image.src}" alt="${image.alt}" width="${image.width}" height="${image.height}">
  </div>
  `;
};

export default (data, callback) => {
  const screen = document.createElement(`template`);

  const question = renderTemplate(getQuestionTemplate(data.text));
  const form = renderTemplate(`<form class="game__content  game__content--triple"></form>`);
  question.appendChild(form);

  const gameContent = question.querySelector(`.game__content`);
  data.images.forEach((image) => {
    const option = renderTemplate(getOptionTemplate(image));
    gameContent.appendChild(option);
  });

  const options = gameContent.querySelectorAll(`.game__option`);
  for (const option of options) {
    option.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const questions = data.images;
      const answerName = evt.target.dataset.name;

      const result = questions.filter((item) => item.name === answerName)[0].rightValue ? Answer.CORRECT : Answer.WRONG;
      callback(result);
    });
  }

  screen.content.appendChild(question);
  return screen.content;
};
