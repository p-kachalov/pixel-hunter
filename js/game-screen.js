import getFooter from './footer';
import getHeader from './header';
import getStatus from './game-status';
import getStats from './game-stats';

export default (state, game) => {
  const screen = document.createElement(`template`);
  const header = getHeader(state);
  const status = getStatus(state);
  const stats = getStats(state);
  const footer = getFooter();

  header.appendChild(status);

  screen.content.appendChild(header);
  screen.content.appendChild(game);
  screen.content.appendChild(stats);
  screen.content.appendChild(footer);

  return screen.content;
};
