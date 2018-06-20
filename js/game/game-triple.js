import GameTripleView from './game-triple-view';

export default class GameDouble {
  constructor(question, callback) {
    this._question = question;
    this._callback = callback;
  }

  getView() {
    if (this._view) {
      return this._view;
    }

    this._view = new GameTripleView(this.getData());
    this._view.onAnswer = (userAnswer) => this.handleAnswer(userAnswer);
    return this._view;
  }

  getData() {
    return {
      question: this._question.text,
      image1: this._question.images[0],
      image2: this._question.images[1],
      image3: this._question.images[2],
    };
  }

  handleAnswer(userAnswer) {
    const rightAnswer = this._question.images.filter((item) => item.rightValue)[0].name;
    const userRight = userAnswer.option === rightAnswer;
    this._callback(userRight);
  }
}
