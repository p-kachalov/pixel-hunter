
export default class Timer {
  constructor(time, callback) {
    this.currentTime = time >= 0 ? time : 0;
    this.callback = callback;
  }

  get time() {
    return this.currentTime;
  }

  tick() {
    if (this.currentTime > 0) {
      this.currentTime -= 1;
    }
    if (this.currentTime === 0) {
      this.callback();
    }
  }
}
