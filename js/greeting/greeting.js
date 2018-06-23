import GreetingView from './greeting-view';
import FooterView from '../blocks/footer-view';
import Application from '../application';

export default (results) => {
  const footerView = new FooterView();
  const greetingView = new GreetingView(footerView.element);
  greetingView.onContinue = () => Application.showRules(results);
  return greetingView.element;
};
