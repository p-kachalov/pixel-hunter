import AbstractView from '../../abstract-view';
import Answer from '../../data/answer';

const getAnswerTemplate = (answer) => {
  return `<li class="stats__result stats__result--${answer}"></li>`;
};

class StatsView extends AbstractView {
  constructor(answers, questionsNumber) {
    super();
    this._answers = answers;
    this._questionsNumber = questionsNumber;
  }

  get template() {
    return `
    <ul class="stats">
      ${this._answers.reduce((acc, answer) => acc + getAnswerTemplate(answer), ``)}
      ${new Array(this._questionsNumber - this._answers.length)
        .fill(getAnswerTemplate(Answer.UNKONWN)).join(``)}
    </ul>
    `;
  }
}

export default StatsView;
