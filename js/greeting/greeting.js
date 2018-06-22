import GreetingView from './greeting-view';
import FooterView from '../blocks/footer-view';
import Application from '../application';

export default () => {
  const footerView = new FooterView();
  const greetingView = new GreetingView(footerView.element);
  greetingView.onContinue = () => Application.showRules();
  return greetingView.element;
};
