import GreetingView from './greeting-view';
import FooterView from '../blocks/footer-view';

export default (state, callback) => {
  const footer = new FooterView();
  const view = new GreetingView(footer.element);
  view.callback = callback;
  return view.element;
};
