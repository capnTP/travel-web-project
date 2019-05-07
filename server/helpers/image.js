

const imageResolver = (image) => {
  let imgixSrc = image.elm.getAttribute('data-base');

  imgixSrc = [imgixSrc, 65].join('&q=');
  imgixSrc = [imgixSrc, 'center, center'].join('&crop=');

  if (image.width) {
    imgixSrc = [imgixSrc, image.width].join('&w=');
  }
  if (image.height) {
    imgixSrc = [imgixSrc, image.height].join('&h=');
  }

  imgixSrc = [imgixSrc, 'crop'].join('&fit=');

  return imgixSrc;
};

export default imageResolver;
