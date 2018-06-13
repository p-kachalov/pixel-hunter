import renderTemplate from './render-template';
import AnswerSpeed from './answer-speed';

const statsTemplate = `
<div class="stats">
  <ul class="stats">
  </ul>
</div>
`;

const wrongTemplate = `<li class="stats__result stats__result--wrong"></li>`;
const slowTemplate = `<li class="stats__result stats__result--slow"></li>`;
const fastTemplate = `<li class="stats__result stats__result--fast"></li>`;
const correctTemplate = `<li class="stats__result stats__result--correct"></li>`;
const unknownTemplate = `<li class="stats__result stats__result--unknown"></li>`;

const chooseAnswerTemplate = (answer) => {
  if (!answer) {
    return unknownTemplate;
  }

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

export default (state) => {
  const screen = document.createElement(`template`);
  const stats = renderTemplate(statsTemplate);

  const answers = stats.querySelector(`ul.stats`);

  state.answers.forEach((answer) => {
    const answerTemplate = chooseAnswerTemplate(answer);
    answers.appendChild(renderTemplate(answerTemplate));
  });

  screen.content.appendChild(stats);

  return screen.content;
};
