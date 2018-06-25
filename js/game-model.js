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

const Settings = Object.freeze({
  maxLivesNumber: 3,
  questionNumber: 10,
  answerCost: 100,
  fastCost: 50,
  slowCost: 50,
  liveCost: 50,
  slowTime: 20,
  fastTime: 10,
  timeOnAnswer: 30,
});

export default class GameModel {
  constructor(userName, data, results) {
    this.userName = userName;
    this.data = data;
    this.gameOver = false;
    this.lives = Settings.maxLivesNumber;
    this.time = 0;
    this.settings = Object.assign({}, Settings, {questionNumber: data.length});
    this.questions = initialState.questions;
    this.answers = [];
    this.results = results ? results : [];
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
