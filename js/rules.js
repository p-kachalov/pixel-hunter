import RulesView from './view/rules-view';
import HeaderView from './view/header-view';
import FooterView from './view/footer-view';

export default (state, callback) => {
  const header = new HeaderView();
  header.onBackClick = () => callback({back: true});
  const footer = new FooterView();

  const rules = new RulesView();
  rules.header = header.element;
  rules.footer = footer.element;
  rules.onSubmit = (value) => callback({userName: value});

  return rules.element;
};
