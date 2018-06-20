import IntroView from './intro-view';

export default (state, callback) => {
  const introView = new IntroView();
  introView.onIntroClick = () => callback();
  return introView.element;
};
