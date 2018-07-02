
export const resize = (frame, image) => {
  const widthScale = image.width / frame.width;
  const heightScale = image.height / frame.height;
  const scale = widthScale > heightScale ? widthScale : heightScale;

  return {
    width: Math.round(image.width / scale),
    height: Math.round(image.height / scale)
  };
};

export const fitIntoBox = (image) => {
  const imageSize = {width: image.naturalWidth, height: image.naturalHeight};
  const frameSize = {width: image.width, height: image.height};
  const newSize = resize(frameSize, imageSize);
  image.width = newSize.width;
  image.height = newSize.height;
  return;
};
