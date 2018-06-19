import GreetingView from './view/greeting-view';
import FooterView from './view/footer-view';

export default (state, callback) => {
  const footer = new FooterView();
  const view = new GreetingView(footer);
  view.callback = callback;
  return view.element;
};
