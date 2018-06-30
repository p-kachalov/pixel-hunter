import Answer from './data/answer';
import Settings from './settings';

export default class GameModel {
  constructor(userName, data) {
    this._userName = userName;
    this._settings = Object.assign({}, Settings.GAME_SETTINGS, {questionNumber: data.length});
    this._lives = Settings.GAME_SETTINGS.maxLivesNumber;
    this._questions = data;
    this._answers = [];
    this._gameOver = false;
    this._result = null;
    this._time = 0;
  }

  get userName() {
    return this._userName;
  }

  get settings() {
    return this._settings;
  }

  get lives() {
    return this._lives;
  }

  get answers() {
    return this._answers;
  }

  get gameOver() {
    return this._gameOver;
  }

  get result() {
    return this._result;
  }

  get time() {
    return this._time;
  }

  set time(newTime) {
    this._time = newTime;
  }

  _getAnswer(result, time, settings) {
    if (!result) {
      return Answer.WRONG;
    }
    if (settings.timeOnAnswer - time < settings.fastTime) {
      return Answer.FAST;
    }
    if (settings.timeOnAnswer - time > settings.slowTime) {
      return Answer.SLOW;
    }

    return Answer.CORRECT;
  }

  getQuestion() {
    return this._questions[this._answers.length];
  }

  handleAnswer(result) {
    const answer = this._getAnswer(result, this._time, this._settings);
    this._lives = (answer === Answer.WRONG) ? this._lives - 1 : this._lives;
    this._answers = [...this._answers, answer];
    this._gameOver = this._lives < 0 || this._answers.length === this._settings.questionNumber;
  }

  saveResult() {
    const lives = this._lives;
    const answers = this._answers;
    this._result = {lives, answers};
  }
}
