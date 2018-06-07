import {assert} from 'chai';
import createTimer from './timer';


describe(`Timer`, () => {
  describe(`return timer object which`, () => {
    it(`should be an object`, () => {
      const timer = createTimer(0);
      assert.isObject(timer);
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
      const timer = createTimer(5);
      assert.equal(timer.time, 5);
    });

    it(`should not be negative`, () => {
      const timer = createTimer(-5);
      assert.equal(timer.time, 0);
    });
  });

  describe(`tick function`, () => {
    it(`should decrease time`, () => {
      const timer = createTimer(5);
      timer.tick();
      timer.tick();
      assert.equal(timer.time, 3);
    });

    it(`should not decrease time less than 0`, () => {
      const timer = createTimer(2);
      timer.tick();
      timer.tick();
      timer.tick();
      timer.tick();
      assert.equal(timer.time, 0);
    });
  });

  describe(`and multiple timers`, () => {
    it(`should be unrelated`, () => {
      const timer1 = createTimer(5);
      const timer2 = createTimer(5);
      timer1.tick();
      timer1.tick();
      assert.equal(timer1.time, 3);
      assert.equal(timer2.time, 5);
    });
  });
});
