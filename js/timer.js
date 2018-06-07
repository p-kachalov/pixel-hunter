
export default (setTime) => {
  const timer = {
    time: setTime > 0 ? setTime : 0,
    tick: () => {
      if (timer.time > 0) {
        timer.time -= 1;
      }
    }
  };

  return timer;
};
