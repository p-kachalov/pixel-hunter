import renderTemplate from './render-template';
import AnswerSpeed from './answer-speed';

const statsTemplate = `<ul class="stats"></ul>`;

const wrongTemplate = `<li class="stats__result stats__result--wrong"></li>`;
const slowTemplate = `<li class="stats__result stats__result--slow"></li>`;
const fastTemplate = `<li class="stats__result stats__result--fast"></li>`;
const correctTemplate = `<li class="stats__result stats__result--correct"></li>`;
const unknownTemplate = `<li class="stats__result stats__result--unknown"></li>`;

const chooseAnswerTemplate = (answer) => {
  if (!answer.right) {
    return wrongTemplate;
  }

  if (answer.speed === AnswerSpeed.FAST) {
    return fastTemplate;
  }

  if (answer.speed === AnswerSpeed.SLOW) {
    return slowTemplate;
  }

  return correctTemplate;
};

export default (answers, questionsNumber) => {
  const screen = document.createElement(`template`);
  const stats = renderTemplate(statsTemplate);

  const answersContainer = stats.querySelector(`ul.stats`);

  answers.forEach((answer) => {
    const answerTemplate = chooseAnswerTemplate(answer);
    answersContainer.appendChild(renderTemplate(answerTemplate));
  });

  for (let i = answers.length; i < questionsNumber; i++) {
    answersContainer.appendChild(renderTemplate(unknownTemplate));
  }

  screen.content.appendChild(stats);

  return screen.content;
};
