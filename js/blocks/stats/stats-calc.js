
import Answer from '../../data/answer';

export default (answers, lives, settings) => {
  if (answers.length < settings.questionNumber) {
    return -1;
  }

  const SCORE = {
    [Answer.WRONG]: 0,
    [Answer.UNKONWN]: 0,
    [Answer.CORRECT]: settings.answerCost,
    [Answer.FAST]: settings.answerCost + settings.fastCost,
    [Answer.SLOW]: settings.answerCost - settings.slowCost,
  };

  return answers.reduce((acc, answer) => {
    return acc + SCORE[answer];
  }, lives * settings.liveCost);
};
