import adaptServerData from './data/data-adapter';

const SERVER_URL = `https://es.dump.academy/pixel-hunter/questions`;

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
    return window.fetch(SERVER_URL).then(checkStatus).then(toJSON).then(adaptServerData);
  }
}
