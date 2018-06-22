import initialState from './data/initial-state';

export default class GameModel {
  constructor(userName) {
    this.userName = userName;
    this.screen = initialState.screen;
    this.lives = initialState.lives;
    this.time = initialState.time;
    this.settings = initialState.settings;
    this.questions = initialState.questions;
    this.results = initialState.results;
    this.answers = initialState.answers;
  }
}
