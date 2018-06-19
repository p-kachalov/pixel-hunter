import IntroView from './view/intro-view';

export default (state, callback) => {
  const view = new IntroView();
  view.callback = callback;
  return view.element;
};
