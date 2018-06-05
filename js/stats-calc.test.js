import {assert} from 'chai';
import statsCalc from './stats-calc';

const generateAnswers = (answer, len) => {
  const answers = [];
  for (let i = 0; i < len; i++) {
    answers.push(Object.assign({}, answer));
  }
  return answers;
};

const defaultAnswer = {right: false, fast: false, slow: false};

describe(`statistics`, () => {
  describe(`with valid input`, () => {
    it(`should return -1 when user lost`, () => {
      const answer = Object.assign({}, defaultAnswer);
      const answers = generateAnswers(answer, 4);
      assert.equal(-1, statsCalc(answers, 0));
    });

    it(`should return 1150 when user won with 3 live, without penalties and bonuses`, () => {
      const answer = Object.assign({}, defaultAnswer, {right: true});
      const answers = generateAnswers(answer, 10);
      assert.equal(1150, statsCalc(answers, 3));
    });

    it(`should return 1250 when user won with 3 live, without penalties and with 2 bonuses`, () => {
      const answer = Object.assign({}, defaultAnswer, {right: true});
      const answers = generateAnswers(answer, 10);
      answers[0].fast = true;
      answers[3].fast = true;
      assert.equal(1250, statsCalc(answers, 3));
    });

    it(`should return 1050 when user won with 3 live, 2 penalties and without bonuses`, () => {
      const answer = Object.assign({}, defaultAnswer, {right: true});
      const answers = generateAnswers(answer, 10);
      answers[0].slow = true;
      answers[3].slow = true;
      assert.equal(1050, statsCalc(answers, 3));
    });

    it(`should return 1150 when user won with 3 live, 2 penalties and 2 bonuses`, () => {
      const answer = Object.assign({}, defaultAnswer, {right: true});
      const answers = generateAnswers(answer, 10);
      answers[0].slow = true;
      answers[3].slow = true;
      answers[1].fast = true;
      answers[2].fast = true;
      assert.equal(1150, statsCalc(answers, 3));
    });

    it(`should return 1050 when user won with 1 live, 2 penalties and 2 bonuses`, () => {
      const answer = Object.assign({}, defaultAnswer, {right: true});
      const answers = generateAnswers(answer, 10);
      answers[0].slow = true;
      answers[3].slow = true;
      answers[1].fast = true;
      answers[2].fast = true;
      assert.equal(1050, statsCalc(answers, 1));
    });
  });
});
