import renderScreen from './render-screen';


const questionData1 = {
  type: `double`,
  text: `Угадайте для каждого изображения фото или рисунок?`,
  images: [
    {name: `question1`, rightValue: `paint`, src: `http://placehold.it/468x458`, alt: `Option 1`, width: `468`, height: `458`},
    {name: `question2`, rightValue: `photo`, src: `http://placehold.it/468x458`, alt: `Option 2`, width: `468`, height: `458`},
  ]
};

const questionData2 = {
  type: `single`,
  text: `Угадай, фото или рисунок?`,
  images: [
    {name: `question1`, rightValue: `paint`, src: `http://placehold.it/705x455`, alt: `Option 1`, width: `705`, height: `455`},
  ]
};

const questionData3 = {
  type: `triple`,
  text: `Найдите рисунок среди изображений`,
  images: [
    {name: `question1`, rightValue: false, src: `http://placehold.it/304x455`, alt: `Option 1`, width: `304`, height: `455`},
    {name: `question2`, rightValue: true, src: `http://placehold.it/304x455`, alt: `Option 2`, width: `304`, height: `455`},
    {name: `question3`, rightValue: false, src: `http://placehold.it/304x455`, alt: `Option 3`, width: `304`, height: `455`},
  ]
};

const initialState = {
  screen: `intro`,
  lives: 3,
  time: 0,
  answers: [],
  questions: [questionData1, questionData2, questionData3, questionData1],
};

renderScreen(initialState);
