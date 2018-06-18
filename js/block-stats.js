import renderTemplate from './render-template';
import Answer from './answer';

const AnswersClass = {
  [Answer.WRONG]: `stats__result--wrong`,
  [Answer.SLOW]: `stats__result--slow`,
  [Answer.FAST]: `stats__result--fast`,
  [Answer.CORRECT]: `stats__result--correct`,
  [Answer.UNKONWN]: `stats__result--unknown`,

};

const getAnswerTemplate = (answer) => {
  return `<li class="stats__result ${AnswersClass[answer]}"></li>`;
};

export default (answers, questionsNumber) => {
  const block = document.createElement(`template`);
  const statsTemplate = `<ul class="stats"></ul>`;
  const stats = renderTemplate(statsTemplate);
  const answersContainer = stats.querySelector(`ul.stats`);

  answers.forEach((answer) => {
    const answerTemplate = getAnswerTemplate(answer);
    answersContainer.appendChild(renderTemplate(answerTemplate));
  });

  for (let i = answers.length; i < questionsNumber; i++) {
    answersContainer.appendChild(renderTemplate(Answer.UNKONWN));
  }

  block.content.appendChild(stats);

  return block.content;
};
