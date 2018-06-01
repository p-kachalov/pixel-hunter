
const container = document.querySelector(`.central`);

const clearContainer = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

export default (newScreen) => {
  clearContainer(container);
  container.appendChild(newScreen);
};
