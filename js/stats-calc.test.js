import {assert} from 'chai';
import AnswerSpeed from './answer-speed';
import statsCalc from './stats-calc';

const replicateObject = (obj, count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(Object.assign({}, obj));
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
      const answers = replicateObject({right: false, speed: AnswerSpeed.NORMAL}, 4);
      const lives = 0;
      assert.equal(-1, statsCalc(answers, lives, settings));
    });

    it(`should return 1150 when user won with 3 live, without penalties and bonuses`, () => {
      const answers = replicateObject({right: true, speed: AnswerSpeed.NORMAL}, 10);
      const lives = 3;
      assert.equal(1150, statsCalc(answers, lives, settings));
    });

    it(`should return 1200 when user won with 3 live, 2 penalties and 3 bonuses`, () => {
      const answers = replicateObject({right: true, speed: AnswerSpeed.NORMAL}, 5)
        .concat(replicateObject({right: true, speed: AnswerSpeed.FAST}, 3))
        .concat(replicateObject({right: true, speed: AnswerSpeed.SLOW}, 2));
      const lives = 3;
      assert.equal(1200, statsCalc(answers, lives, settings));
    });

    it(`should return 1000 when user won with 1 live, 3 penalties and 2 bonuses`, () => {
      const answers = replicateObject({right: true, speed: AnswerSpeed.NORMAL}, 3)
        .concat(replicateObject({right: true, speed: AnswerSpeed.FAST}, 2))
        .concat(replicateObject({right: true, speed: AnswerSpeed.SLOW}, 3))
        .concat(replicateObject({right: false, speed: null}, 2));
      const lives = 1;
      assert.equal(800, statsCalc(answers, lives, settings));
    });
  });
});
