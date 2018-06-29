
export const resize = (frame, image) => {
  const widthScale = image.width / frame.width;
  const heightScale = image.height / frame.height;
  const scale = widthScale > heightScale ? widthScale : heightScale;

  return {
    width: Math.round(image.width / scale),
    height: Math.round(image.height / scale)
  };
};
