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

  return Object.freeze(
      {
        time: setTime,
        tick() {
          return createTimer(setTime - 1);
        }
      }
  );
};

export default createTimer;
