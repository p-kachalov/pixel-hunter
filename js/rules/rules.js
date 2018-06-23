import RulesView from './rules-view';
import HeaderView from '../blocks/header-view';
import FooterView from '../blocks/footer-view';
import Application from '../application';

export default (results) => {
  const headerView = new HeaderView();
  headerView.onBackClick = () => Application.showGreeting();
  const footerView = new FooterView();

  const rulesView = new RulesView(headerView.element, footerView.element);
  rulesView.onSubmit = (userName) => Application.showGame(userName, results);

  return rulesView.element;
};
