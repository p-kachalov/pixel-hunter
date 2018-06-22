import IntroView from './intro-view';
import Application from '../application';

export default () => {
  const introView = new IntroView();
  introView.onIntroClick = () => Application.showGreeting();
  return introView.element;
};
