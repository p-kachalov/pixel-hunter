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
    const fail = lives === 0;
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
    this.model = model;
    this.headerView = new HeaderView();
    this.headerView.onBackClick = () => transition();
    this.footerView = new FooterView();
    this.table = new ResultTableView(null, []);
    this.resultView = new ResultsView(this.headerView.element, this.footerView.element, this.table.element);
  }

  get element() {
    return this.resultView.element;
  }

  renderResultTable(data) {
    const resultsData = processResultsData(data, this.model.settings);
    let resultTable = [];

    resultsData.forEach((dataItem) => {
      const statsView = new StatsView(dataItem.answers, this.model.settings.questionNumber);
      const result = new ResultView(dataItem);
      result.insertStats(statsView.element);
      resultTable.push(result.element);
    });

    const isWin = this.model.lives > 0;
    const newTable = new ResultTableView(isWin, resultTable);
    this.table.element.parentNode.replaceChild(newTable.element, this.table.element);
  }

}
