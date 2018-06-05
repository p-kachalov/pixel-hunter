
export default (answers, lives) => {
  if (answers.length < 10) {
    return -1;
  }

  let result = answers.reduce((acc, item) => {
    if (!item.right) {
      return acc;
    }
    acc += 100;
    acc += item.fast ? 50 : 0;
    acc -= item.slow ? 50 : 0;
    return acc;
  }, 0);

  result += lives * 50;


  return result;
};
