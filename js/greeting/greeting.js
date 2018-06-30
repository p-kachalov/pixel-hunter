import GreetingView from './greeting-view';
import FooterView from '../blocks/footer-view';

export default (transition) => {
  const footerView = new FooterView();
  const greetingView = new GreetingView(footerView.element);
  greetingView.onContinue = () => transition();
  return greetingView.element;
};
