
export default class GameModel {
  constructor(userName) {
    this._userName = userName;
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    this._state = newState;
  }
}
