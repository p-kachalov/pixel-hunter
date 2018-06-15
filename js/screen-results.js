import renderTemplate from './render-template';
import getFooter from './block-footer';
import getHeader from './block-header';
import getStats from './block-stats';
import statsCalc from './stats-calc';
import AnswerSpeed from './answer-speed';

const getResultTemplate = (result) => {
  const totalFailTemplate = `
  <td class="result__total"></td>
  <td class="result__total  result__total--final">fail</td>
  `;

  const totalPointsTemplate = `
  <td class="result__points">×&nbsp;${result.points}</td>
  <td class="result__total">${result.totalPoints}</td>
  `;

  const speetBonusTemplate = `
  <tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">${result.fast}&nbsp;<span class="stats__result stats__result--fast"></span></td>
    <td class="result__points">×&nbsp;${result.fastCost}</td>
    <td class="result__total">${result.fast * result.fastCost}</td>
  </tr>
  `;

  const livesBonusTemplate = `
  <tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${result.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">×&nbsp;${result.liveCost}</td>
    <td class="result__total">${result.lives * result.liveCost}</td>
  </tr>
  `;

  const slowPenaltyTemplate = `
  <tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">${result.slow}&nbsp;<span class="stats__result stats__result--slow"></span></td>
    <td class="result__points">×&nbsp;${result.slowCost}</td>
    <td class="result__total">-${result.slow * result.slowCost}</td>
  </tr>
  `;

  const totalFinalTemplate = `
  <tr>
    <td colspan="5" class="result__total  result__total--final">${result.totalFilnal}</td>
  </tr>
  `;

  const totalBlock = result.fail ? totalFailTemplate : totalPointsTemplate;
  const speedBonusBlock = (!result.fail && result.fast > 0) ? speetBonusTemplate : ``;
  const livesBonusBlock = (!result.fail && result.lives > 0) ? livesBonusTemplate : ``;
  const slowPenaltyBlock = (!result.fail && result.slow > 0) ? slowPenaltyTemplate : ``;
  const totalFinalBlock = (!result.fail && result.totalFilnal > 0) ? totalFinalTemplate : ``;

  const resultTemplate = `
  <table class="result__table">
    <tr>
      <td class="result__number">${result.gameNumber}.</td>
      <td colspan="2" class="stats-container"></td>
      ${totalBlock}
      ${speedBonusBlock}
      ${livesBonusBlock}
      ${slowPenaltyBlock}
      ${totalFinalBlock}
    </tr>
  </table>
  `;

  return resultTemplate;
};

const processResultsData = (data) => {
  const results = data.map((result, index) => {
    const gameNumber = index + 1;
    const lives = result.lives;
    const fail = lives === 0;
    const stats = getStats(result.answers);
    const points = result.settings.answerCost;
    const rightAnswer = result.answers.filter((answer) => answer.right).length;
    const totalPoints = points * rightAnswer;
    const fast = result.answers.filter((answer) =>
      answer.right && answer.speed === AnswerSpeed.FAST).length;
    const slow = result.answers.filter((answer) =>
      answer.right && answer.speed === AnswerSpeed.SLOW).length;
    const fastCost = result.settings.fastCost;
    const liveCost = result.settings.liveCost;
    const slowCost = result.settings.slowCost;
    const totalFilnal = statsCalc(result.answers, result.lives, result.settings);

    return {
      gameNumber,
      fail,
      stats,
      points,
      totalPoints,
      fast,
      fastCost,
      lives,
      liveCost,
      slow,
      slowCost,
      totalFilnal
    };
  });
  return results;
};

const renderResult = (data) => {
  const resultTemplate = getResultTemplate(data);
  const result = renderTemplate(resultTemplate);
  const statsContainer = result.querySelector(`.stats-container`);
  statsContainer.appendChild(data.stats);

  return result;
};

export default (state, callback) => {
  const screen = document.createElement(`template`);
  const header = getHeader(state, callback);
  const footer = getFooter();
  const content = renderTemplate(`<div class="result"><h1>Победа!</h1></div>`);

  const resultsData = processResultsData(state.results);

  resultsData.forEach((dataItem) => {
    const result = renderResult(dataItem);
    content.appendChild(result);
  });

  screen.content.appendChild(header);
  screen.content.appendChild(content);
  screen.content.appendChild(footer);

  return screen.content;
};
