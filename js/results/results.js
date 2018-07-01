import HeaderView from '../blocks/header-view';
import FooterView from '../blocks/footer-view';
import ResultsView from './results-view';
import Answer from '../data/answer';
import statsCalc from '../blocks/stats/stats-calc';
import ResultView from './result-view';
import ResultTableView from './result-tabe-view';
import StatsView from '../blocks/stats/stats-view';

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

export default class Results {
  constructor(model, transition) {
    this._model = model;
    this._headerView = new HeaderView();
    this._headerView.onBackClick = () => transition();
    this._footerView = new FooterView();
    this._table = new ResultTableView(null, []);
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
    const newTable = new ResultTableView(isWin, resultTable);
    this._table.element.parentNode.replaceChild(newTable.element, this._table.element);
  }

}
