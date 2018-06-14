import renderTemplate from './render-template';
import getFooter from './block-footer';
import getHeader from './block-header';
import getStats from './block-stats';
import AnswerSpeed from './answer-speed';

const user1Template = `
<table class="result__table">
  <tr>
    <td class="result__number">1.</td>
    <td colspan="2">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </td>
    <td class="result__points">×&nbsp;100</td>
    <td class="result__total">900</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">1&nbsp;<span class="stats__result stats__result--fast"></span></td>
    <td class="result__points">×&nbsp;50</td>
    <td class="result__total">50</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">×&nbsp;50</td>
    <td class="result__total">100</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">2&nbsp;<span class="stats__result stats__result--slow"></span></td>
    <td class="result__points">×&nbsp;50</td>
    <td class="result__total">-100</td>
  </tr>
  <tr>
    <td colspan="5" class="result__total  result__total--final">950</td>
  </tr>
</table>
`;

const user2Template = `
<table class="result__table">
  <tr>
    <td class="result__number">2.</td>
    <td>
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--wrong"></li>
      </ul>
    </td>
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>
  </tr>
</table>
`;

const user3Template = `
<table class="result__table">
  <tr>
    <td class="result__number">3.</td>
    <td colspan="2">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </td>
    <td class="result__points">×&nbsp;100</td>
    <td class="result__total">900</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">×&nbsp;50</td>
    <td class="result__total">100</td>
  </tr>
  <tr>
    <td colspan="5" class="result__total  result__total--final">950</td>
  </tr>
</table>
`;

const contentTemplate = `
<div class="result">
  <h1>Победа!</h1>
</div>
`;

const getResultTemplate = (result) => {
  const totalFailTemplate = `
  <td class="result__total"></td>
  <td class="result__total  result__total--final">fail</td>
  `;

  const totalPointsTemplate = `
  <td class="result__points">×&nbsp;${result.points}</td>
  <td class="result__total">${result.totalPoints}</td>
  `;

  const totalTemplate = result.fail ? totalFailTemplate : totalPointsTemplate;

  const resultTemplate = `
  <table class="result__table">
    <tr>
      <td class="result__number">${result.number}.</td>
      <td colspan="2">${result.stats}</td>
      ${totalTemplate}
    </tr>
  </table>
  `;

  return resultTemplate;
};

const processResultsData = (data) => {
  const results = data.map((item, index) => {
    const fail = item.lives === 0;
    const stats = renderTemplate(getStats(item.answers));
    const points = 100; // constant
    const rightAnswer = item.answers.filter((answer) => answer.right).length;
    const totalPoints = points * rightAnswer;

    return {number: index, fail, stats, points, totalPoints};
  });
  return results;
};

const data = [
  {
    lives: 3,
    answers: [
      {right: true, speed: AnswerSpeed.NORMAL},
      {right: true, speed: AnswerSpeed.NORMAL},
      {right: true, speed: AnswerSpeed.NORMAL},
      {right: true, speed: AnswerSpeed.NORMAL},
      {right: true, speed: AnswerSpeed.NORMAL},
      {right: true, speed: AnswerSpeed.NORMAL},
      {right: true, speed: AnswerSpeed.NORMAL},
      {right: true, speed: AnswerSpeed.NORMAL},
      {right: true, speed: AnswerSpeed.NORMAL},
      {right: true, speed: AnswerSpeed.NORMAL},
    ],
  }
];


export default (state, callback) => {
  const screen = document.createElement(`template`);
  const header = getHeader(state, callback);
  const footer = getFooter();
  const content = renderTemplate(contentTemplate);


  const resultsData = processResultsData(data);

  resultsData.forEach((item) => {
    const resultTemplate = getResultTemplate(item);
    const result = renderTemplate(resultTemplate);
    content.appendChild(result);
  });


  const user1 = renderTemplate(user1Template);
  const user2 = renderTemplate(user2Template);
  const user3 = renderTemplate(user3Template);
  content.appendChild(user1);
  content.appendChild(user2);
  content.appendChild(user3);


  screen.content.appendChild(header);
  screen.content.appendChild(content);
  screen.content.appendChild(footer);

  return screen.content;
};
