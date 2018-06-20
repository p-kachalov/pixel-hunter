import {assert} from 'chai';
import createTimer from './timer';


describe(`Timer`, () => {
  describe(`when creating`, () => {
    it(`can't accept not number argument`, () => {
      const errorCall = () => createTimer(`hello`);
      assert.throws(errorCall, TypeError);
    });

    it(`can't accept not integer number argument`, () => {
      const errorCall = () => createTimer(5.7);
      assert.throws(errorCall, TypeError);
    });
    it(`can't accept negative number argument`, () => {
      const errorCall = () => createTimer(-5);
      assert.throws(errorCall, RangeError);
    });
  });

  describe(`return timer object which`, () => {
    it(`should be an object`, () => {
      assert.isObject(createTimer(0));
    });

    it(`should has time property`, () => {
      const timer = createTimer(5);
      assert.exists(timer.time);
      assert.isNumber(timer.time);
    });

    it(`should has tick function`, () => {
      const timer = createTimer(5);
      assert.exists(timer.tick);
      assert.isFunction(timer.tick);
    });
  });

  describe(`time property`, () => {
    it(`should content correct value`, () => {
      assert.equal(createTimer(5).time, 5);
    });
    it(`should throw error on try to change directly`, () => {
      const errorCall = () => {
        const timer = createTimer(5);
        timer.time = 2;
      };
      assert.throws(errorCall, TypeError);
    });
  });

  describe(`tick function`, () => {
    it(`should decrease time`, () => {
      assert.equal(createTimer(5).tick().tick().time, 3);
    });

    it(`should throw error on try to decrease time less than 0`, () => {
      const errorCall = () => createTimer(2).tick().tick().tick();
      assert.throws(errorCall, RangeError);
    });
  });
});
