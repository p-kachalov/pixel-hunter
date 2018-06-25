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

const getRightValue = (questionType, answerType) => {
  if (MapGameType[questionType] !== GameType.TRIPLE) {
    return MapValue[answerType];
  }
  return MapValue[answerType] === `paint`;
};


const adaptServerData = (data) => {
  return data.map((question) => {
    return Object.assign({}, {
      type: MapGameType[question.type],
      text: question.question,
      images: question.answers.map((answer, index) => {
        return {
          name: `question${index + 1}`,
          rightValue: getRightValue(question.type, answer.type),
          src: `${answer.image.url}`,
          alt: `Option ${index + 1}`,
          width: `${answer.image.width}`,
          height: `${answer.image.height}`
        };
      })
    });
  });
};

export default adaptServerData;
