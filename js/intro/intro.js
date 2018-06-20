import IntroView from './intro-view';

export default (state, callback) => {
  const view = new IntroView();
  view.callback = callback;
  return view.element;
};
