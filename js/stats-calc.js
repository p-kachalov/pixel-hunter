
const LIVE_BONUS = 50;
const SPEED_BONUS = 50;
const SPEED_PENALTY = 50;
const RIGHT_ANSWER_SCORE = 100;
const ANSWERS_COUNT = 10;

export default (answers, lives) => {
  if (answers.length < ANSWERS_COUNT) {
    return -1;
  }

  return answers.reduce((acc, item) => {
    if (!item.right) {
      return acc;
    }

    const bonus = item.fast ? SPEED_BONUS : 0;
    const penalty = item.slow ? SPEED_PENALTY : 0;

    return acc + RIGHT_ANSWER_SCORE + bonus - penalty;
  }, lives * LIVE_BONUS);
};
