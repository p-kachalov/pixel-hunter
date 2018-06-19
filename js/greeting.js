import GreetingView from './view/greeting-view';
import FooterView from './view/footer-view';

export default (state, callback) => {
  const view = new GreetingView();
  const footer = new FooterView();
  view.footer = footer.element;
  view.callback = callback;
  return view.element;
};
