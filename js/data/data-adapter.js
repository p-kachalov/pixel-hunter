import GameType from './game-type';

const MapGameType = {
  'two-of-two': GameType.DOUBLE,
  'tinder-like': GameType.SINGLE,
  'one-of-three': GameType.TRIPLE
};

const MapValue = {
  'painting': `paint`,
  'photo': `photo`
};

const getRightAnswerForTriple = (answers) => {
  const answerTypes = answers.map((answer) => answer.type);
  return answerTypes.reduce((accumulator, currentValue) => {
    return (answerTypes.indexOf(currentValue) === answerTypes.lastIndexOf(currentValue)) ? currentValue : accumulator;
  }, null);
};

const isTripleGame = (question) => MapGameType[question.type] === GameType.TRIPLE;

const adaptServerData = (data) => {
  return data.map((question) => {
    const rightAnswerForTriple = isTripleGame(question) ? getRightAnswerForTriple(question.answers) : null;
    return Object.assign({}, {
      type: MapGameType[question.type],
      text: question.question,
      images: question.answers.map((answer, index) => {
        return {
          name: `question${index + 1}`,
          rightValue: isTripleGame(question) ? rightAnswerForTriple === answer.type : MapValue[answer.type],
          src: answer.image.url,
          alt: `Option ${index + 1}`,
          width: `${answer.image.width}`,
          height: `${answer.image.height}`
        };
      })
    });
  });
};

export default adaptServerData;
