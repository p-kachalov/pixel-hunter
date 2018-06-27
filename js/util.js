
export const debugStyle = (debug, predicat) => {
  if (debug && predicat) {
    return `style="outline: 3px solid blue"`;
  }
  return ``;
};
