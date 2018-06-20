import GreetingView from './greeting-view';
import FooterView from '../blocks/footer-view';

export default (state, callback) => {
  const footerView = new FooterView();
  const greetingView = new GreetingView(footerView.element);
  greetingView.onContinue = () => callback();
  return greetingView.element;
};
