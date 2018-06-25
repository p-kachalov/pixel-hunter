import AbstractView from '../../abstract-view';
import Answer from '../../data/answer';

const getAnswerTemplate = (answer) => {
  return `<li class="stats__result stats__result--${answer}"></li>`;
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
