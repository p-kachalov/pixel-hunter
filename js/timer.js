const createTimer = (setTime) => {
  if (typeof setTime !== `number`) {
    throw new TypeError(`Argument should be a number`);
  }

  if (!Number.isInteger(setTime)) {
    throw new TypeError(`Argument should be integer`);
  }

  if (setTime < 0) {
    throw new RangeError(`Argument should be more then 0`);
  }

  const currentTime = setTime;

  return {
    get time() {
      return currentTime;
    },
    tick() {
      return createTimer(currentTime - 1);
    }
  };
};

export default createTimer;
