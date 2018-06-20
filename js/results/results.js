import HeaderView from '../blocks/header-view';
import FooterView from '../blocks/footer-view';
import ResultsView from './results-view';
import Answer from '../data/answer';
import statsCalc from '../blocks/stats/stats-calc';
import ResultView from './result-view';
import StatsView from '../blocks/stats/stats-view';

const processResultsData = (data) => {
  const results = data.map((result, index) => {
    const answers = result.answers;
    const gameNumber = index + 1;
    const lives = result.lives;
    const fail = lives === 0;
    const points = result.settings.answerCost;
    const rightAnswer = result.answers.filter((answer) => {
      return answer !== Answer.WRONG && answer !== Answer.UNKONWN;
    }).length;
    const totalPoints = points * rightAnswer;
    const fast = result.answers.filter((answer) => answer === Answer.FAST).length;
    const slow = result.answers.filter((answer) => answer === Answer.SLOW).length;
    const fastCost = result.settings.fastCost;
    const liveCost = result.settings.liveCost;
    const slowCost = result.settings.slowCost;
    const totalFinal = statsCalc(result.answers, result.lives, result.settings);

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

export default (state, callback) => {
  const headerView = new HeaderView();
  headerView.onBackClick = () => callback({back: true});
  const footerView = new FooterView();

  const resultsData = processResultsData(state.results);
  let resultTable = [];

  resultsData.forEach((dataItem) => {
    const statsView = new StatsView(dataItem.answers, state.settings.questionNumber);
    const result = new ResultView(dataItem);
    result.insertStats(statsView.element);
    resultTable.push(result.element);
  });

  const results = new ResultsView(headerView.element, footerView.element, resultTable);
  return results.element;
};

