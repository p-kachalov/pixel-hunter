
export default (answers, lives) => {
  if (answers.length < 10) {
    return -1;
  }

  return answers.reduce((acc, item) => {
    if (!item.right) {
      return acc;
    }
    return acc + 100 + (item.fast ? 50 : 0) - (item.slow ? 50 : 0);
  }, 0) + lives * 50;
};
