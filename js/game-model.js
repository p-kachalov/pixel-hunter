import initialState from './data/initial-state';
import Answer from './data/answer';

const getAnswer = (result, time, settings) => {
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
};

export default class GameModel {
  constructor(userName, results) {
    this.userName = userName;
    this.gameOver = false;
    this.screen = initialState.screen;
    this.lives = initialState.lives;
    this.time = initialState.time;
    this.settings = initialState.settings;
    this.questions = initialState.questions;
    this.answers = initialState.answers;
    if (results) {
      this.results = results;
    } else {
      this.results = initialState.results;
    }
  }

  getQuestion() {
    return this.questions[this.answers.length];
  }

  handleAnswer(result) {
    const answer = getAnswer(result, this.time, this.settings);
    this.lives = (answer === Answer.WRONG) ? this.lives - 1 : this.lives;
    this.answers = [...this.answers, answer];
    this.gameOver = this.lives === 0 || this.answers.length === this.settings.questionNumber;
  }

  saveResult() {
    const lives = this.lives;
    const answers = this.answers;

    this.results = [...this.results, {lives, answers}];
  }
}
