import renderTemplate from './render-template';
import Answer from './answer';

const getResult = (questions, userChoice) => {
  const answer = questions.filter((item) => item.name === userChoice.dataset.name)[0];
  return answer.rightValue ? Answer.CORRECT : Answer.WRONG;
};

const getOptionTemplate = (image) => {
  return `
  <div class="game__option" data-name="${image.name}">
    <img src="${image.src}" alt="${image.alt}" width="${image.width}" height="${image.height}">
  </div>
  `;
};

export default (data, callback) => {
  const container = document.createElement(`template`);
  const form = renderTemplate(`<form class="game__content  game__content--triple"></form>`);
  container.content.appendChild(form);

  const gameContent = container.content.querySelector(`.game__content`);
  data.images.forEach((image) => {
    const option = renderTemplate(getOptionTemplate(image));
    gameContent.appendChild(option);
  });

  const options = gameContent.querySelectorAll(`.game__option`);
  for (const option of options) {
    option.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const questions = data.images;
      const userChoice = evt.target;
      const result = getResult(questions, userChoice);
      callback(result);
    });
  }

  return container.content;
};
