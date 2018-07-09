(function () {
'use strict';

class AbstractView {
  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind();
    return this._element;
  }

  render() {
    const container = document.createElement(`div`);
    container.innerHTML = this.template;
    return container;
  }

  bind() {}
}

class IntroView extends AbstractView {
  get template() {
    return `
    <div id="main" class="central__content">
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </div>
    </div>
    `;
  }
}

var introScreen = () => {
  const introView = new IntroView();

  return introView.element;
};

class GreetingView extends AbstractView {
  constructor(footer) {
    super();
    this._footer = footer;
  }

  get template() {
    return `
    <div class="greeting central--blur">
      <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
      <h1 class="greeting__asterisk">*</h1>
      <div class="greeting__challenge">
        <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
        <p>Правила игры просты.<br>
          Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
          Задача кажется тривиальной, но не думай, что все так просто.<br>
          Фотореализм обманчив и коварен.<br>
          Помни, главное — смотреть очень внимательно.</p>
      </div>
      <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
    </div>
    `;
  }

  render() {
    const content = super.render();
    const container = document.createElement(`template`);
    container.content.appendChild(content);
    container.content.appendChild(this._footer);

    return container.content;
  }

  bind() {
    const link = this.element.querySelector(`.greeting__continue`);
    link.addEventListener(`click`, () => {
      this.onContinue();
    });
  }

  onContinue() {}
}

class FooterView extends AbstractView {
  get template() {
    return `
    <footer class="footer">
      <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
      <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
      <div class="footer__social-links">
        <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
        <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
        <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
        <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
      </div>
    </footer>
    `;
  }
}

var greetingScreen = (transition) => {
  const footerView = new FooterView();
  const greetingView = new GreetingView(footerView.element);
  greetingView.onContinue = () => transition();

  return greetingView.element;
};

class RulesView extends AbstractView {
  constructor(header, footer) {
    super();
    this._header = header;
    this._footer = footer;
  }

  get template() {
    return `
    <div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>
    `;
  }

  render() {
    const content = super.render();
    const container = document.createElement(`template`);
    container.content.appendChild(this._header);
    container.content.appendChild(content);
    container.content.appendChild(this._footer);

    return container.content;
  }

  bind() {
    const form = this.element.querySelector(`.rules__form`);
    const input = this.element.querySelector(`.rules__input`);
    const button = this.element.querySelector(`.rules__button`);

    input.addEventListener(`input`, (evt) => {
      button.disabled = evt.target.value.length === 0;
    });

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this.onSubmit(input.value);
    });
  }

  onSubmit() {}
}

class HeaderView extends AbstractView {
  constructor(status) {
    super();
    this._status = status;
  }

  get template() {
    return `
    <header class="header">
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
    </header>
    `;
  }

  render() {
    const content = super.render();
    if (this._status) {
      content.appendChild(this._status);
    }
    return content;
  }

  bind() {
    const backButton = this.element.querySelector(`.back`);
    backButton.addEventListener(`click`, () => {
      this.onBackClick();
    });
  }

  onBackClick() {}
}

var rulesScreen = (transitionBack, transitionForward) => {
  const headerView = new HeaderView();
  headerView.onBackClick = () => transitionBack();
  const footerView = new FooterView();
  const rulesView = new RulesView(headerView.element, footerView.element);
  rulesView.onSubmit = (userName) => transitionForward(userName);

  return rulesView.element;
};

var GameType = Object.freeze({
  SINGLE: `single`,
  DOUBLE: `douvle`,
  TRIPLE: `triple`,
});

const HURRY_TIME = 5;

class StatusView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
  }

  get template() {
    return `
    <h1 class="game__timer" ${this._state.time <= HURRY_TIME ? `style="animation: blink-animation 1s steps(5, start) infinite"` : ``}>${this._state.time}</h1>
    <div class="game__lives">
      ${new Array(this._state.settings.maxLivesNumber - this._state.lives)
        .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
        .join(``)}
      ${new Array(this._state.lives)
        .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
        .join(``)}
    </div>
    <style>
      @keyframes blink-animation {
        to {
          visibility: hidden;
        }
      }
    </style>
    `;
  }
}

const Answer = Object.freeze({
  WRONG: `wrong`,
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
  UNKONWN: `unknown`,
});

const getAnswerTemplate = (answer) => {
  return `<li class="stats__result stats__result--${answer}"></li>`;
};

class StatsView extends AbstractView {
  constructor(answers, questionsNumber) {
    super();
    this._answers = answers;
    this._questionsNumber = questionsNumber;
  }

  get template() {
    return `
    <ul class="stats">
      ${this._answers.reduce((acc, answer) => acc + getAnswerTemplate(answer), ``)}
      ${new Array(this._questionsNumber - this._answers.length)
        .fill(getAnswerTemplate(Answer.UNKONWN)).join(``)}
    </ul>
    `;
  }
}

class GameView extends AbstractView {
  constructor(header, footer, stats, game) {
    super();
    this._header = header;
    this._footer = footer;
    this._stats = stats;
    this._game = game;
  }

  render() {
    const container = document.createDocumentFragment();
    container.appendChild(this._header);
    container.appendChild(this._game);
    container.appendChild(this._stats);
    container.appendChild(this._footer);
    return container;
  }
}

const debugStyle = (debug, predicat) => {
  if (debug && predicat) {
    return `style="outline: 3px solid blue"`;
  }
  return ``;
};

const resize = (frame, image) => {
  const widthScale = image.width / frame.width;
  const heightScale = image.height / frame.height;
  const scale = widthScale > heightScale ? widthScale : heightScale;

  return {
    width: Math.round(image.width / scale),
    height: Math.round(image.height / scale)
  };
};

const fitIntoBox = (image) => {
  const imageSize = {width: image.naturalWidth, height: image.naturalHeight};
  const frameSize = {width: image.width, height: image.height};
  const newSize = resize(frameSize, imageSize);
  image.width = newSize.width;
  image.height = newSize.height;
  return;
};

const Settings = Object.freeze({
  DEBUG: true,
  GAME_SETTINGS: Object.freeze({
    maxLivesNumber: 3,
    questionNumber: 10,
    answerCost: 100,
    fastCost: 50,
    slowCost: 50,
    liveCost: 50,
    slowTime: 20,
    fastTime: 10,
    timeOnAnswer: 30,
  })
});

class GameSingleView extends AbstractView {
  constructor(data) {
    super();
    this._debug = Settings.DEBUG;
    this._question = data.text;
    this._image = data.images[0];
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this._question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this._image.src}" alt="${this._image.alt}" width="${this._image.width}" height="${this._image.height}">
          <label class="game__answer  game__answer--photo">
            <input name="${this._image.name}" type="radio" value="photo" required>
            <span ${debugStyle(this._debug, this._image.rightValue === `photo`)}>Фото</span>
          </label>
          <label class="game__answer game__answer--paint game__answer--wide">
            <input name="${this._image.name}" type="radio" value="paint" required>
            <span ${debugStyle(this._debug, this._image.rightValue === `paint`)}>Рисунок</span>
          </label>
        </div>
      </form>
    </div>
    `;
  }

  bind() {
    const gameContent = this.element.querySelector(`.game__content`);
    gameContent.addEventListener(`change`, () => {
      const option = gameContent.elements[this._image.name].value;
      this.onAnswer(option === this._image.rightValue);
    });

    const image = this.element.querySelector(`.game__option img`);
    image.addEventListener(`load`, (evt) => {
      fitIntoBox(evt.target);
    });
  }

  onAnswer() {}
}

class GameDoubleView extends AbstractView {
  constructor(data) {
    super();
    this._debug = Settings.DEBUG;
    this._question = data.text;
    this._image1 = data.images[0];
    this._image2 = data.images[1];
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this._question}</p>
      <form class="game__content">
        <div class="game__option">
          <img src="${this._image1.src}" alt="${this._image1.alt}" width="${this._image1.width}" height="${this._image1.height}">
          <label class="game__answer  game__answer--photo">
            <input name="${this._image1.name}" type="radio" value="photo" required>
            <span ${debugStyle(this._debug, this._image1.rightValue === `photo`)}>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input name="${this._image1.name}" type="radio" value="paint" required>
            <span ${debugStyle(this._debug, this._image1.rightValue === `paint`)}>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src="${this._image2.src}" alt="${this._image2.alt}" width="${this._image2.width}" height="${this._image2.height}">
          <label class="game__answer  game__answer--photo">
            <input name="${this._image2.name}" type="radio" value="photo" required>
            <span ${debugStyle(this._debug, this._image2.rightValue === `photo`)}>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input name="${this._image2.name}" type="radio" value="paint" required>
            <span ${debugStyle(this._debug, this._image2.rightValue === `paint`)}>Рисунок</span>
          </label>
        </div>
      </form>
    </div>
    `;
  }

  bind() {
    const gameContent = this.element.querySelector(`.game__content`);
    gameContent.addEventListener(`change`, () => {
      if (!gameContent.reportValidity()) {
        return;
      }
      const rightAnswer1 = this._image1.rightValue;
      const rightAnswer2 = this._image2.rightValue;
      const option1 = gameContent.elements[this._image1.name].value;
      const option2 = gameContent.elements[this._image2.name].value;
      const result = option1 === rightAnswer1 && option2 === rightAnswer2;
      this.onAnswer(result);
    });

    const options = this.element.querySelectorAll(`.game__option img`);
    for (const item of options) {
      item.addEventListener(`load`, (evt) => {
        fitIntoBox(evt.target);
      });
    }
  }

  onAnswer() {}
}

class GameTripleView extends AbstractView {
  constructor(data) {
    super();
    this._debug = Settings.DEBUG;
    this._question = data.text;
    this._image1 = data.images[0];
    this._image2 = data.images[1];
    this._image3 = data.images[2];
    this._rightValue = data.images.filter((item) => item.rightValue)[0].name;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this._question}</p>
      <form class="game__content game__content--triple">
        <div class="game__option" ${debugStyle(this._debug, this._image1.rightValue)} data-name="${this._image1.name}">
          <img src="${this._image1.src}" alt="${this._image1.alt}" width="${this._image1.width}" height="${this._image1.height}">
        </div>
        <div class="game__option" ${debugStyle(this._debug, this._image2.rightValue)} data-name="${this._image2.name}">
          <img src="${this._image2.src}" alt="${this._image2.alt}" width="${this._image2.width}" height="${this._image2.height}">
        </div>
        <div class="game__option" ${debugStyle(this._debug, this._image3.rightValue)} data-name="${this._image3.name}">
          <img src="${this._image3.src}" alt="${this._image3.alt}" width="${this._image3.width}" height="${this._image3.height}">
        </div>
      </form>
    </div>
    `;
  }

  bind() {
    const gameContent = this.element.querySelector(`.game__content`);
    gameContent.addEventListener(`change`, () => {
      const option1 = gameContent.elements[this._image1.name].value;
      const option2 = gameContent.elements[this._image2.name].value;
      this.onAnswer({option1, option2});
    });

    const options = this.element.querySelectorAll(`.game__option`);
    for (const item of options) {
      item.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const option = evt.currentTarget.dataset.name;
        const result = option === this._rightValue;
        this.onAnswer(result);
      });

      const image = item.querySelector(`img`);
      image.addEventListener(`load`, (evt) => {
        fitIntoBox(evt.target);
      });
    }
  }

  onAnswer() {}
}

const createTimer = (time) => {
  if (typeof time !== `number`) {
    throw new TypeError(`Argument should be a number`);
  }

  if (!Number.isInteger(time)) {
    throw new TypeError(`Argument should be integer`);
  }

  if (time < 0) {
    throw new RangeError(`Argument should be more then 0`);
  }

  return Object.freeze(
      {
        time,
        tick() {
          return createTimer(time - 1);
        }
      }
  );
};

const GameViewSet = {
  [GameType.SINGLE]: GameSingleView,
  [GameType.DOUBLE]: GameDoubleView,
  [GameType.TRIPLE]: GameTripleView,
};

const makeNewGame = (question) => {
  const Game = GameViewSet[question.type];
  return new Game(question);
};

class GameSceen {
  constructor(model, transitionBack, transitionForward) {
    this._model = model;
    this._transitionBack = transitionBack;
    this._transitionForward = transitionForward;

    const status = new StatusView(model);
    this._header = new HeaderView(status.element);
    this._header.onBackClick = () => this._transitionBack();
    this._stats = new StatsView(model.answers, model.settings.questionNumber);
    this._footer = new FooterView();

    const question = this._model.getQuestion();
    this._game = makeNewGame(question);
    this._game.onAnswer = (result) => this.onAnswer(result);

    this._gameView = new GameView(this._header.element, this._footer.element, this._stats.element, this._game.element);
  }

  get element() {
    return this._gameView.element;
  }

  _updateStatus() {
    const newStatus = new StatusView(this._model);
    const newHeader = new HeaderView(newStatus.element);

    this._header.element.parentNode.replaceChild(newHeader.element, this._header.element);
    this._header = newHeader;
    this._header.onBackClick = () => this._transitionBack();
  }

  _updateStats() {
    const newStats = new StatsView(this._model.answers, this._model.settings.questionNumber);
    this._stats.element.parentNode.replaceChild(newStats.element, this._stats.element);
    this._stats = newStats;
  }

  _nextLevel() {
    const question = this._model.getQuestion();
    const newGame = makeNewGame(question);
    newGame.onAnswer = (result) => this.onAnswer(result);

    this._game.element.parentNode.replaceChild(newGame.element, this._game.element);
    this._game = newGame;
    this.startGame();
  }

  startGame() {
    const ticker = (timer) => {
      this._model.time = timer.time;
      this._updateStatus();
      if (timer.time === 0) {
        this.onAnswer(false);
        return;
      }
      this.timeout = window.setTimeout(() => {
        ticker(timer.tick());
      }, 1000);
    };

    ticker(createTimer(this._model.settings.timeOnAnswer));
  }

  stopGame() {
    window.clearTimeout(this.timeout);
  }

  onAnswer(result) {
    this.stopGame();
    this._model.handleAnswer(result);
    if (this._model.gameOver) {
      this._model.saveResult();
      this._transitionForward(this._model);
    } else {
      this._nextLevel();
      this._updateStatus();
      this._updateStats();
    }
  }
}

class GameModel {
  constructor(userName, data) {
    this._userName = userName;
    this._settings = Object.assign({}, Settings.GAME_SETTINGS, {questionNumber: data.length});
    this._lives = Settings.GAME_SETTINGS.maxLivesNumber;
    this._questions = data;
    this._answers = [];
    this._gameOver = false;
    this._result = null;
    this._time = 0;
  }

  get userName() {
    return this._userName;
  }

  get settings() {
    return this._settings;
  }

  get lives() {
    return this._lives;
  }

  get answers() {
    return this._answers;
  }

  get gameOver() {
    return this._gameOver;
  }

  get result() {
    return this._result;
  }

  get time() {
    return this._time;
  }

  set time(newTime) {
    this._time = newTime;
  }

  _getAnswer(result, time, settings) {
    if (!result) {
      return Answer.WRONG;
    }
    if (settings.timeOnAnswer - time < settings.fastTime) {
      return Answer.FAST;
    }
    if (settings.timeOnAnswer - time > settings.slowTime) {
      return Answer.SLOW;
    }

    return Answer.CORRECT;
  }

  getQuestion() {
    return this._questions[this._answers.length];
  }

  handleAnswer(result) {
    const answer = this._getAnswer(result, this._time, this._settings);
    this._lives = (answer === Answer.WRONG) ? this._lives - 1 : this._lives;
    this._answers = [...this._answers, answer];
    this._gameOver = this._lives < 0 || this._answers.length === this._settings.questionNumber;
  }

  saveResult() {
    const lives = this._lives;
    const answers = this._answers;
    this._result = {lives, answers};
  }
}

class ErrorView extends AbstractView {
  constructor(error) {
    super();
    this._error = error;
  }

  get template() {
    return `
    <section class="modal-error modal-error__wrap">
      <div class="modal-error__inner">
        <h2 class="modal-error__title">Произошла ошибка!</h2>
        <p class="modal-error__text">Статус: ${this._error}. Пожалуйста, перезагрузите страницу.</p>
      </div>
    </section>
    `;
  }
}

class ResultsView extends AbstractView {
  constructor(header, footer, table) {
    super();
    this._header = header;
    this._footer = footer;
    this._table = table;
  }

  render() {
    const container = document.createDocumentFragment();
    container.appendChild(this._header);
    container.appendChild(this._table);
    container.appendChild(this._footer);
    return container;
  }
}

var statsCalc = (answers, lives, settings) => {
  if (answers.length < settings.questionNumber) {
    return -1;
  }

  const SCORE = {
    [Answer.WRONG]: 0,
    [Answer.UNKONWN]: 0,
    [Answer.CORRECT]: settings.answerCost,
    [Answer.FAST]: settings.answerCost + settings.fastCost,
    [Answer.SLOW]: settings.answerCost - settings.slowCost,
  };

  return answers.reduce((acc, answer) => {
    return acc + SCORE[answer];
  }, lives * settings.liveCost);
};

const getTotalBlock = (fail, points, totalPoints) => {
  const totalFailTemplate = `
  <td class="result__total"></td>
  <td class="result__total  result__total--final">fail</td>
  `;

  const totalPointsTemplate = `
  <td class="result__points">×&nbsp;${points}</td>
  <td class="result__total">${totalPoints}</td>
  `;

  return fail ? totalFailTemplate : totalPointsTemplate;
};

const getSpeedBonusBlock = (fail, fast, fastCost) => {
  const speetBonusTemplate = `
  <tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">${fast}&nbsp;<span class="stats__result stats__result--fast"></span></td>
    <td class="result__points">×&nbsp;${fastCost}</td>
    <td class="result__total">${fast * fastCost}</td>
  </tr>
  `;

  return (!fail && fast > 0) ? speetBonusTemplate : ``;
};

const getLivesBonusBlock = (fail, lives, liveCost) => {
  const livesBonusTemplate = `
  <tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">×&nbsp;${liveCost}</td>
    <td class="result__total">${lives * liveCost}</td>
  </tr>
  `;

  return (!fail && lives > 0) ? livesBonusTemplate : ``;
};

const getSlowPenaltyBlock = (fail, slow, slowCost) => {
  const slowPenaltyTemplate = `
  <tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">${slow}&nbsp;<span class="stats__result stats__result--slow"></span></td>
    <td class="result__points">×&nbsp;${slowCost}</td>
    <td class="result__total">-${slow * slowCost}</td>
  </tr>
  `;

  return (!fail && slow > 0) ? slowPenaltyTemplate : ``;
};

const getTotalFinalBlock = (fail, totalFinal) => {
  const totalFinalTemplate = `
  <tr>
    <td colspan="5" class="result__total  result__total--final">
      ${totalFinal}
    </td>
  </tr>
  `;

  return (!fail && totalFinal > 0) ? totalFinalTemplate : ``;
};

class ResultView extends AbstractView {
  constructor(data, statsElement) {
    super();
    this._gameNumber = data.gameNumber;
    this._totalBlock = getTotalBlock(data.fail, data.points, data.totalPoints);
    this._speedBonusBlock = getSpeedBonusBlock(data.fail, data.fast, data.fastCost);
    this._livesBonusBlock = getLivesBonusBlock(data.fail, data.lives, data.liveCost);
    this._slowPenaltyBlock = getSlowPenaltyBlock(data.fail, data.slow, data.slowCost);
    this._totalFinalBlock = getTotalFinalBlock(data.fail, data.totalFinal);
    this._statsElement = statsElement;
  }

  get template() {
    return `
    <table class="result__table">
      <tr>
        <td class="result__number">${this._gameNumber}.</td>
        <td colspan="2" class="stats-container"></td>
        ${this._totalBlock}
        ${this._speedBonusBlock}
        ${this._livesBonusBlock}
        ${this._slowPenaltyBlock}
        ${this._totalFinalBlock}
      </tr>
    </table>
    `;
  }

  insertStats() {
    const statsContainer = this.element.querySelector(`.stats-container`);
    statsContainer.appendChild(this._statsElement);
  }
}

let ResultsView$1 = class ResultsView extends AbstractView {
  constructor(isWin, table) {
    super();
    this._isWin = isWin;
    this._table = table;
  }

  get template() {
    return `
      <div class="result">
        <h1>${this._isWin ? `Победа` : `Поражение`}!</h1>
      </div>
    `;
  }

  render() {
    const content = super.render();
    this._table.forEach((item) => {
      content.appendChild(item);
    });

    return content;
  }
};

const processResultsData = (data, settings) => {
  const results = data.map((result, index) => {
    const answers = result.answers;
    const gameNumber = index + 1;
    const lives = result.lives;
    const fail = lives < 0;
    const points = settings.answerCost;
    const rightAnswer = result.answers.filter((answer) => {
      return answer !== Answer.WRONG && answer !== Answer.UNKONWN;
    }).length;
    const totalPoints = points * rightAnswer;
    const fast = result.answers.filter((answer) => answer === Answer.FAST).length;
    const slow = result.answers.filter((answer) => answer === Answer.SLOW).length;
    const fastCost = settings.fastCost;
    const liveCost = settings.liveCost;
    const slowCost = settings.slowCost;
    const totalFinal = statsCalc(result.answers, result.lives, settings);

    return {
      answers,
      gameNumber,
      fail,
      points,
      totalPoints,
      fast,
      fastCost,
      lives,
      liveCost,
      slow,
      slowCost,
      totalFinal
    };
  });
  return results;
};

class Results {
  constructor(model, transition) {
    this._model = model;
    this._headerView = new HeaderView();
    this._headerView.onBackClick = () => transition();
    this._footerView = new FooterView();
    this._table = new ResultsView$1(null, []);
    this._resultView = new ResultsView(this._headerView.element, this._footerView.element, this._table.element);
  }

  get element() {
    return this._resultView.element;
  }

  renderResultTable(data) {
    const resultsData = processResultsData(data, this._model.settings);
    let resultTable = [];

    resultsData.forEach((dataItem) => {
      const statsView = new StatsView(dataItem.answers, this._model.settings.questionNumber);
      const result = new ResultView(dataItem, statsView.element);
      result.insertStats();
      resultTable.push(result.element);
    });

    const isWin = this._model.lives >= 0;
    const newTable = new ResultsView$1(isWin, resultTable);
    this._table.element.parentNode.replaceChild(newTable.element, this._table.element);
  }

}

const MapGameType = {
  'two-of-two': GameType.DOUBLE,
  'tinder-like': GameType.SINGLE,
  'one-of-three': GameType.TRIPLE
};

const MapValue = {
  'painting': `paint`,
  'photo': `photo`
};

const getRightAnswerForTriple = (answers) => {
  const answerTypes = answers.map((answer) => answer.type);
  return answerTypes.reduce((accumulator, currentValue) => {
    return (answerTypes.indexOf(currentValue) === answerTypes.lastIndexOf(currentValue)) ? currentValue : accumulator;
  }, null);
};

const isTripleGame = (question) => MapGameType[question.type] === GameType.TRIPLE;

const adaptServerData = (data) => {
  return data.map((question) => {
    const rightAnswerForTriple = isTripleGame(question) ? getRightAnswerForTriple(question.answers) : null;
    return Object.assign({}, {
      type: MapGameType[question.type],
      text: question.question,
      images: question.answers.map((answer, index) => {
        return {
          name: `question${index + 1}`,
          rightValue: isTripleGame(question) ? rightAnswerForTriple === answer.type : MapValue[answer.type],
          src: answer.image.url,
          alt: `Option ${index + 1}`,
          width: `${answer.image.width}`,
          height: `${answer.image.height}`
        };
      })
    });
  });
};

const adaptLocalData = (result) => {
  return {lives: result.lives, stats: result.answers};
};

const adaptServerResults = (results) => {
  return results.map((answer) => {
    return {lives: answer.lives, answers: answer.stats};
  });
};

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

class Loader {
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

class ConfirmView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="modal-confirm modal-confirm__wrap">
      <form class="modal-confirm__inner">
        <button class="modal-confirm__close" type="button">Закрыть</button>
        <h2 class="modal-confirm__title">Подтверждение</h2>
        <p class="modal-confirm__text">Вы уверены что хотите начать игру заново?</p>
        <div class="modal-confirm__btn-wrap">
          <button class="modal-confirm__btn modal-confirm__btn_ok">Ок</button>
          <button class="modal-confirm__btn modal-confirm__btn_cancel">Отмена</button>
        </div>
      </form>
    </section>
    `;
  }

  bind() {
    const okButton = this.element.querySelector(`.modal-confirm__btn_ok`);
    okButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onOkClick();
    });

    const cancelButton = this.element.querySelector(`.modal-confirm__btn_cancel`);
    cancelButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onCancelClick();
    });

    const closeButton = this.element.querySelector(`.modal-confirm__close`);
    closeButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onCloseClick();
    });

  }

  onOkClick() {}

  onCancelClick() {}

  onCloseClick() {}
}

const container = document.querySelector(`.central`);

const clearContainer = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const fadeout = (callback, opacity = 1) => {
  container.style.opacity = opacity;
  if (opacity <= 0) {
    container.style.opacity = 0;
    callback();
    return;
  }

  window.setTimeout(() => fadeout(callback, opacity - 0.1), 100);
};

const fadein = (opacity = 0) => {
  container.style.opacity = opacity;
  if (opacity >= 1) {
    container.style.opacity = 1;
    return;
  }

  window.setTimeout(() => fadein(opacity + 0.1), 100);
};

const changeView = (element, crossfade) => {
  if (crossfade) {
    fadeout(() => {
      clearContainer(container);
      container.appendChild(element);
      fadein();
    });
    return;
  }

  clearContainer(container);
  container.appendChild(element);
};

let gameData = null;

class Application {
  static showIntro() {
    const intro = introScreen();
    changeView(intro);
    Loader.loadData().
      then((data) => {
        Loader.loadImages(data).
        then(() => {
          gameData = data;
          Application.showGreeting(true);
        }).
        catch((error) => Application.showError(error));
      }).
      catch((error) => Application.showError(error));
  }

  static showGreeting(crossfade = false) {
    const greeting = greetingScreen(Application.showRules);
    changeView(greeting, crossfade);
  }

  static showRules() {
    const rules = rulesScreen(Application.showGreeting, Application.showGame);
    changeView(rules);
  }

  static showGame(userName) {
    const model = new GameModel(userName, gameData);
    const game = new GameSceen(model, () => Application.showConfirm(game), Application.showResults);
    changeView(game.element);
    game.startGame();
  }

  static showResults(model) {
    const results = new Results(model, Application.showGreeting);
    changeView(results.element);
    Loader.saveResults(model.result, model.userName).
      then(() => Loader.loadResults(model.userName)).
      then((data) => results.renderResultTable(data)).
      catch(Application.showError);
  }

  static showConfirm(game) {
    const confirm = new ConfirmView();
    confirm.onCancelClick = () => Application.hideConfirm(confirm);
    confirm.onCloseClick = () => Application.hideConfirm(confirm);
    confirm.onOkClick = () => {
      game.stopGame();
      Application.hideConfirm(confirm);
      Application.showGreeting();
    };

    container.parentNode.appendChild(confirm.element);
  }

  static hideConfirm(confirm) {
    container.parentNode.removeChild(confirm.element);
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    container.parentNode.appendChild(errorView.element);
  }
}

Application.showIntro();

}());

//# sourceMappingURL=main.js.map
