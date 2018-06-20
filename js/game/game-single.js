import GameSingleView from './game-single-view';

export default class GameSingle {
  constructor(question, callback) {
    this._question = question;
    this._callback = callback;
  }

  getView() {
    if (this._view) {
      return this._view;
    }

    this._view = new GameSingleView(this.getData());
    this._view.onAnswer = (userAnswer) => this.handleAnswer(userAnswer);
    return this._view;
  }

  getData() {
    return {
      question: this._question.text,
      image: this._question.images[0]
    };
  }

  handleAnswer(userAnswer) {
    const rightAnswer = this._question.images[0].rightValue;
    const userRight = userAnswer.option === rightAnswer;
    this._callback(userRight);
  }
}
