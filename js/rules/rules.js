import RulesView from './rules-view';
import HeaderView from '../blocks/header-view';
import FooterView from '../blocks/footer-view';

export default (transitionBack, transitionForward) => {
  const headerView = new HeaderView();
  headerView.onBackClick = () => transitionBack();
  const footerView = new FooterView();

  const rulesView = new RulesView(headerView.element, footerView.element);
  rulesView.onSubmit = (userName) => transitionForward(userName);

  return rulesView.element;
};
