import AbstractView from '../../abstract-view';
import Answer from '../../data/answer';

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

class StatsView extends AbstractView {
  constructor(answers, questionsNumber) {
    super();
    this.answers = answers;
    this.questionsNumber = questionsNumber;
  }

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

export default StatsView;
