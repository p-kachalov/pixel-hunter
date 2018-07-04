import {adaptServerData, adaptServerResults, adaptLocalData} from './data/data-adapter';

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const APP_ID = `235268`;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

const toJSON = (res) => res.json();

const getSources = (data) => {
  return data.reduce((accumulator, question) => {
    return [...accumulator, ...question.images.map((image) => image.src)];
  }, []);
};

const loadImage = (imageSrc) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener(`load`, () => {
      resolve();
    });
    image.addEventListener(`error`, (error) => {
      reject(error);
    });

    image.src = imageSrc;
  });
};

export default class Loader {
  static loadData() {
    return window.fetch(`${SERVER_URL}/questions`).then(checkStatus).then(toJSON).then(adaptServerData);
  }

  static loadImages(data) {
    const imageSources = getSources(data);
    return Promise.all(imageSources.map(loadImage));
  }

  static loadResults(name) {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`).then(checkStatus).then(toJSON).then(adaptServerResults);
  }

  static saveResults(data, name) {
    const savedData = Object.assign({name}, adaptLocalData(data));
    const requestSettings = {
      body: JSON.stringify(savedData),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings).then(checkStatus);
  }
}
