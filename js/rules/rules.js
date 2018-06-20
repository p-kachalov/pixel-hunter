import RulesView from './rules-view';
import HeaderView from '../blocks/header-view';
import FooterView from '../blocks/footer-view';

export default (state, callback) => {
  const header = new HeaderView();
  header.onBackClick = () => callback({back: true});
  const footer = new FooterView();

  const rules = new RulesView(header.element, footer.element);
  rules.onSubmit = (value) => callback({userName: value});

  return rules.element;
};
