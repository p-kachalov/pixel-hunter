import {assert} from 'chai';
import statsCalc from './stats-calc';

const replicateObject = (obj, count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(Object.assign({}, obj));
  }
  return result;
};

describe(`statistics`, () => {
  describe(`with valid input`, () => {
    it(`should return -1 when user lost`, () => {
      const answers = replicateObject({right: false, fast: false, slow: false}, 4);
      const lives = 0;
      assert.equal(-1, statsCalc(answers, lives));
    });

    it(`should return 1150 when user won with 3 live, without penalties and bonuses`, () => {
      const answers = replicateObject({right: true, fast: false, slow: false}, 10);
      const lives = 3;
      assert.equal(1150, statsCalc(answers, lives));
    });

    it(`should return 1200 when user won with 3 live, 2 penalties and 3 bonuses`, () => {
      const answers = replicateObject({right: true, fast: false, slow: false}, 5)
        .concat(replicateObject({right: true, fast: true, slow: false}, 3))
        .concat(replicateObject({right: true, fast: false, slow: true}, 2));
      const lives = 3;
      assert.equal(1200, statsCalc(answers, lives));
    });

    it(`should return 1000 when user won with 1 live, 3 penalties and 2 bonuses`, () => {
      const answers = replicateObject({right: true, fast: false, slow: false}, 5)
        .concat(replicateObject({right: true, fast: true, slow: false}, 2))
        .concat(replicateObject({right: true, fast: false, slow: true}, 3));
      const lives = 1;
      assert.equal(1000, statsCalc(answers, lives));
    });
  });
});
