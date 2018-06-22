import RulesView from './rules-view';
import HeaderView from '../blocks/header-view';
import FooterView from '../blocks/footer-view';

export default (state, callback) => {
  const headerView = new HeaderView();
  headerView.onBackClick = () => callback({back: true});
  const footerView = new FooterView();

  const rulesView = new RulesView(headerView.element, footerView.element);
  rulesView.onSubmit = (value) => callback({userName: value});

  return rulesView.element;
};
