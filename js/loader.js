import {adaptServerData, adaptServerResults, adaptLocalData} from './data/data-adapter';

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const APP_ID = `235268235268`;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => res.json();

export default class Loader {
  static loadData() {
    return window.fetch(`${SERVER_URL}/questions`).then(checkStatus).then(toJSON).then(adaptServerData);
  }

  static loadResults(name) {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`).then(checkStatus).then(toJSON).then(adaptServerResults);
  }

  static saveResults(data, name) {
    data = Object.assign({name}, adaptLocalData(data));
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings).then(checkStatus);
  }
}
