
import AnswerSpeed from './answer-speed';

export default (answers, lives, settings) => {
  if (answers.length < settings.questionNumber) {
    return -1;
  }

  const SPEED_RATE = {
    [AnswerSpeed.NORMAL]: 0,
    [AnswerSpeed.FAST]: settings.fastCost,
    [AnswerSpeed.SLOW]: -(settings.slowCost),
  };

  return answers.reduce((acc, item) => {
    if (!item.right) {
      return acc;
    }

    return acc + settings.answerCost + SPEED_RATE[item.speed];
  }, lives * settings.liveCost);
};
