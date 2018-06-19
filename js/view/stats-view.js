import AbstractView from './abstract-view';
import Answer from '../answer';

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

class StatusView extends AbstractView {
  constructor(answers, questionsNumber) {
    super();
    this.answers = answers;
    this.questionsNumber = questionsNumber;
  }

  /*
  for (let i = answers.length; i < questionsNumber; i++) {
    answersContainer.appendChild(renderTemplate(getAnswerTemplate(Answer.UNKONWN)));
  };
  */

  get template() {
    return `
    <ul class="stats">
      ${this.answers.reduce((acc, answer) => acc + getAnswerTemplate(answer), ``)}
      ${new Array(this.questionsNumber - this.answers.length)
        .fill(getAnswerTemplate(Answer.UNKONWN)).join(``)}
    </ul>
    `;
  }
}

export default StatusView;
