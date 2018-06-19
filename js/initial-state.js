import GameType from './game-type';
import images from './mock-data';

const questionData1 = {
  type: GameType.DOUBLE,
  text: `Угадайте для каждого изображения фото или рисунок?`,
  images: [
    {name: `question1`, rightValue: `paint`, src: images.paintings[0], alt: `Option 1`, width: `468`, height: `458`},
    {name: `question2`, rightValue: `photo`, src: images.photos[0], alt: `Option 2`, width: `468`, height: `458`},
  ]
};

const questionData2 = {
  type: GameType.SINGLE,
  text: `Угадай, фото или рисунок?`,
  images: [
    {name: `question1`, rightValue: `paint`, src: images.paintings[1], alt: `Option 1`, width: `705`, height: `455`},
  ]
};

const questionData3 = {
  type: GameType.TRIPLE,
  text: `Найдите рисунок среди изображений`,
  images: [
    {name: `question1`, rightValue: false, src: images.photos[1], alt: `Option 1`, width: `304`, height: `455`},
    {name: `question2`, rightValue: true, src: images.paintings[2], alt: `Option 2`, width: `304`, height: `455`},
    {name: `question3`, rightValue: false, src: images.photos[2], alt: `Option 3`, width: `304`, height: `455`},
  ]
};

export default Object.freeze({
  screen: `intro`,
  lives: 3,
  time: 0,
  answers: [],
  questions: [
    questionData1,
    questionData2,
    questionData3,
    questionData1,
    questionData2,
    questionData3,
    questionData1,
    questionData2,
    questionData3,
    questionData1
  ],
  results: [],
  settings: {
    maxLivesNumber: 3,
    questionNumber: 10,
    answerCost: 100,
    fastCost: 50,
    slowCost: 50,
    liveCost: 50,
    slowTime: 20,
    fastTime: 10,
  }
});
