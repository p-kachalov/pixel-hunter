import {assert} from 'chai';
import Answer from '../../data/answer';
import statsCalc from './stats-calc';

const replicateAnswer = (answer, count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(answer);
  }
  return result;
};

const settings = {
  questionNumber: 10,
  answerCost: 100,
  fastCost: 50,
  slowCost: 50,
  liveCost: 50,
};

describe(`statistics`, () => {
  describe(`with valid input`, () => {
    it(`should return -1 when user lost`, () => {
      const answers = replicateAnswer(Answer.WRONG, 4);
      const lives = 0;
      assert.equal(-1, statsCalc(answers, lives, settings));
    });

    it(`should return 1150 when user won with 3 live, without penalties and bonuses`, () => {
      const answers = replicateAnswer(Answer.CORRECT, 10);
      const lives = 3;
      assert.equal(1150, statsCalc(answers, lives, settings));
    });

    it(`should return 1200 when user won with 3 live, 2 penalties and 3 bonuses`, () => {
      const answers = replicateAnswer(Answer.CORRECT, 5)
        .concat(replicateAnswer(Answer.FAST, 3))
        .concat(replicateAnswer(Answer.SLOW, 2));
      const lives = 3;
      assert.equal(1200, statsCalc(answers, lives, settings));
    });

    it(`should return 1000 when user won with 1 live, 3 penalties and 2 bonuses`, () => {
      const answers = replicateAnswer(Answer.CORRECT, 3)
        .concat(replicateAnswer(Answer.FAST, 2))
        .concat(replicateAnswer(Answer.SLOW, 3))
        .concat(replicateAnswer(Answer.WRONG, 2));
      const lives = 1;
      assert.equal(800, statsCalc(answers, lives, settings));
    });
  });
});
