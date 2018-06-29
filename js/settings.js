
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

export default Settings;
