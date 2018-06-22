import AbstractView from '../abstract-view';

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
  constructor(data) {
    super();
    this.gameNumber = data.gameNumber;
    this.totalBlock = getTotalBlock(data.fail, data.points, data.totalPoints);
    this.speedBonusBlock = getSpeedBonusBlock(data.fail, data.fast, data.fastCost);
    this.livesBonusBlock = getLivesBonusBlock(data.fail, data.lives, data.liveCost);
    this.slowPenaltyBlock = getSlowPenaltyBlock(data.fail, data.slow, data.slowCost);
    this.totalFinalBlock = getTotalFinalBlock(data.fail, data.totalFinal);
  }

  get template() {
    return `
    <table class="result__table">
      <tr>
        <td class="result__number">${this.gameNumber}.</td>
        <td colspan="2" class="stats-container"></td>
        ${this.totalBlock}
        ${this.speedBonusBlock}
        ${this.livesBonusBlock}
        ${this.slowPenaltyBlock}
        ${this.totalFinalBlock}
      </tr>
    </table>
    `;
  }

  insertStats(statsElement) {
    const statsContainer = this.element.querySelector(`.stats-container`);
    statsContainer.appendChild(statsElement);
  }
}

export default ResultView;
