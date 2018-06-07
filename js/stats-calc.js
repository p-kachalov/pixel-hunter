
export default (answers, lives) => {
  return answers.length < 10 ? -1 :
    answers.reduce((acc, item) => {
      return item.right ? acc + 100 + (item.fast ? 50 : 0) - (item.slow ? 50 : 0) : acc;
    }, 0) + lives * 50;
};
