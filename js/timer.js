const createTimer = (time) => {
  if (typeof time !== `number`) {
    throw new TypeError(`Argument should be a number`);
  }

  if (!Number.isInteger(time)) {
    throw new TypeError(`Argument should be integer`);
  }

  if (time < 0) {
    throw new RangeError(`Argument should be more then 0`);
  }

  return Object.freeze(
      {
        time,
        tick() {
          return createTimer(time - 1);
        }
      }
  );
};

export default createTimer;
