import GameDoubleView from './view/game-double-view';

export default class GameDouble {
  constructor(question, callback) {
    this._question = question;
    this._callback = callback;
  }

  getView() {
    if (this._view) {
      return this._view;
    }

    this._view = new GameDoubleView(this.getData());
    this._view.onAnswer = (userAnswer) => this.handleAnswer(userAnswer);
    return this._view;
  }

  getData() {
    return {
      question: this._question.text,
      image1: this._question.images[0],
      image2: this._question.images[1],
    };
  }

  handleAnswer(userAnswer) {
    const rightAnswer1 = this._question.images[0].rightValue;
    const rightAnswer2 = this._question.images[1].rightValue;
    const userRight = userAnswer.option1 === rightAnswer1 && userAnswer.option2 === rightAnswer2;
    this._callback(userRight);
  }
}
