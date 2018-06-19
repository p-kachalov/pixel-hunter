import GreetingView from './view/greeting-view';
import FooterView from './view/footer-view';

export default (state, callback) => {
  const view = new GreetingView();
  const footer = new FooterView();
  view.callback = callback;
  view.element.appendChild(footer.element);
  return view.element;
};
