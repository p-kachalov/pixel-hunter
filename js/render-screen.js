const container = document.querySelector(`.central`);

const clearContainer = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

export default (screen) => {
  clearContainer(container);
  container.appendChild(screen);
};
