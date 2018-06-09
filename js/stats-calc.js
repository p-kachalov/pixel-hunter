
import AnswerSpeed from './answer-speed';

const LIVE_BONUS = 50;
const RIGHT_ANSWER_SCORE = 100;
const ANSWERS_COUNT = 10;
const SPEED_RATE = {
  [AnswerSpeed.NORMAL]: 0,
  [AnswerSpeed.FAST]: 50,
  [AnswerSpeed.SLOW]: -50,
};

export default (answers, lives) => {
  if (answers.length < ANSWERS_COUNT) {
    return -1;
  }

  return answers.reduce((acc, item) => {
    if (!item.right) {
      return acc;
    }

    return acc + RIGHT_ANSWER_SCORE + SPEED_RATE[item.speed];
  }, lives * LIVE_BONUS);
};
