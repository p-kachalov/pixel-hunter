
export const resize = (frame, image) => {
  const widthScale = image.width / frame.width; // 150 / 10 = 15
  const heightScale = image.height / frame.height; // 300 / 10 = 30
  const scale = widthScale > heightScale ? widthScale : heightScale;

  return {
    width: Math.round(image.width / scale),
    height: Math.round(image.height / scale)
  };
};
