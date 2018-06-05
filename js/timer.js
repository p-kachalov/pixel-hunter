
export default class Timer {
  constructor(time, callback) {
    this._currentTime = time >= 0 ? time : 0;
    this.callback = callback;
  }

  get time() {
    return this._currentTime;
  }

  tick() {
    if (this._currentTime > 0) {
      this._currentTime -= 1;
    }
    if (this._currentTime === 0) {
      this.callback();
    }
  }
}
