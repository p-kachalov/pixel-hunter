import {assert} from 'chai';
import GameType from './game-type';
import images from './mock-data';
import {adaptServerData, adaptServerResults, adaptLocalData} from './data-adapter';

const localData = [
  {
    type: GameType.DOUBLE,
    text: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      {name: `question1`, rightValue: `paint`, src: images.paintings[0], alt: `Option 1`, width: `468`, height: `458`},
      {name: `question2`, rightValue: `photo`, src: images.photos[0], alt: `Option 2`, width: `468`, height: `458`},
    ]
  },
  {
    type: GameType.SINGLE,
    text: `Угадай, фото или рисунок?`,
    images: [
      {name: `question1`, rightValue: `paint`, src: images.paintings[1], alt: `Option 1`, width: `705`, height: `455`},
    ]
  },
  {
    type: GameType.TRIPLE,
    text: `Найдите рисунок среди изображений`,
    images: [
      {name: `question1`, rightValue: false, src: images.photos[1], alt: `Option 1`, width: `304`, height: `455`},
      {name: `question2`, rightValue: true, src: images.paintings[2], alt: `Option 2`, width: `304`, height: `455`},
      {name: `question3`, rightValue: false, src: images.photos[2], alt: `Option 3`, width: `304`, height: `455`},
    ]
  },
  {
    type: GameType.TRIPLE,
    text: `Найдите фото среди изображений`,
    images: [
      {name: `question1`, rightValue: false, src: images.paintings[1], alt: `Option 1`, width: `304`, height: `455`},
      {name: `question2`, rightValue: true, src: images.photos[2], alt: `Option 2`, width: `304`, height: `455`},
      {name: `question3`, rightValue: false, src: images.paintings[2], alt: `Option 3`, width: `304`, height: `455`},
    ]
  }
];

const serverData = [
  {
    type: `two-of-two`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        image: {
          url: images.paintings[0],
          width: 468,
          height: 458
        },
        type: `painting`
      },
      {
        image: {
          url: images.photos[0],
          width: 468,
          height: 458
        },
        type: `photo`
      }
    ]
  },
  {
    type: `tinder-like`,
    question: `Угадай, фото или рисунок?`,
    answers: [
      {
        image: {
          url: images.paintings[1],
          width: 705,
          height: 455
        },
        type: `painting`
      },
    ]
  },
  {
    type: `one-of-three`,
    question: `Найдите рисунок среди изображений`,
    answers: [
      {
        image: {
          url: images.photos[1],
          width: 304,
          height: 455
        },
        type: `photo`
      },
      {
        image: {
          url: images.paintings[2],
          width: 304,
          height: 455
        },
        type: `painting`
      },
      {
        image: {
          url: images.photos[2],
          width: 304,
          height: 455
        },
        type: `photo`
      },
    ]
  },
  {
    type: `one-of-three`,
    question: `Найдите фото среди изображений`,
    answers: [
      {
        image: {
          url: images.paintings[1],
          width: 304,
          height: 455
        },
        type: `painting`
      },
      {
        image: {
          url: images.photos[2],
          width: 304,
          height: 455
        },
        type: `photo`
      },
      {
        image: {
          url: images.paintings[2],
          width: 304,
          height: 455
        },
        type: `painting`
      },
    ]
  }
];

const serverResult = {
  stats: [`correct`, `wrong`, `fast`, `slow`, `correct`, `wrong`, `fast`, `slow`],
  lives: 0
};

const localResult = {
  answers: [`correct`, `wrong`, `fast`, `slow`, `correct`, `wrong`, `fast`, `slow`],
  lives: 0
};


const serverResults = [
  {
    date: 1234567567898,
    stats: [`correct`, `wrong`, `fast`, `slow`, `correct`, `wrong`, `fast`, `slow`],
    lives: 0
  },
  {
    date: 1234567567898,
    stats: [`correct`, `wrong`, `fast`, `fast`, `slow`, `correct`, `slow`, `correct`, `fast`, `slow`],
    lives: 0
  }
];

const localResults = [
  {
    answers: [`correct`, `wrong`, `fast`, `slow`, `correct`, `wrong`, `fast`, `slow`],
    lives: 0
  },
  {
    answers: [`correct`, `wrong`, `fast`, `fast`, `slow`, `correct`, `slow`, `correct`, `fast`, `slow`],
    lives: 0
  }
];

describe(`Adapt server data`, () => {
  it(`should have several format remote and local question data`, () => {
    assert.deepEqual(adaptServerData(serverData), localData);
  });
  it(`should have several format remote and local result data`, () => {
    assert.deepEqual(adaptLocalData(localResult), serverResult);
  });
  it(`should have several format remote and local results data`, () => {
    assert.deepEqual(adaptServerResults(serverResults), localResults);
  });
});

