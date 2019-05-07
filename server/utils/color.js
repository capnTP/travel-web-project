/* eslint-disable no-undef,no-multi-assign,no-param-reassign */
/**
 * Created by ashishmishra on 7/17/2017 AD.
 */
// import { loadImage } from 'canvas';
import axios from 'axios';
//
let Canvas;
if (typeof window === 'undefined') {
// eslint-disable-next-line global-require
  Canvas = require('canvas');
}
// const fs = require('fs');


// function readFile(src) {
//
// }


function getColor(image, canvas) {
    // only visit every 5 pixels
  const blockSize = 5;
    // for non-supporting envs
  const defaultRGB = { r: 0, g: 0, b: 0 };
  const context = canvas.getContext('2d');
  const rgb = { r: 0, g: 0, b: 0 };

  let data;
  let i = -4;
  let count = 0;

  if (!context) {
    return defaultRGB;
  }

  const height = canvas.height = image.naturalHeight || image.offsetHeight || image.height;
  const width = canvas.width = image.naturalWidth || image.offsetWidth || image.width;
  image.crossOrigin = 'Anonymous';
  context.drawImage(image, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
        /* security error, img on diff domain */
// eslint-disable-next-line no-console
    console.log('Cross origin!!!');
    return defaultRGB;
  }

  const length = data.data.length;

// eslint-disable-next-line no-mixed-operators,no-cond-assign
  while ((i = i + blockSize * 4) < length) {
// eslint-disable-next-line no-plusplus
    ++count;
    rgb.r = rgb.r + data.data[i];
    rgb.g = rgb.g + data.data[i + 1];
    rgb.b = rgb.b + data.data[i + 2];
  }

    // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return rgb;
}

function getDominantColor(src) {
  const canvas = Canvas ? new Canvas() : document.createElement('canvas');
  const image = Canvas ? new Canvas.Image() : new Image();

  return new Promise((resolve, reject) => {
    axios.get(src, {
      withCredentials: true,
      responseType: 'arraybuffer',
    }).then((res) => {
      const buffer = new Buffer(res.data, 'binary');
      image.src = Canvas ?
                buffer :
                `data:image/jpeg;base64,${buffer.toString('base64')}`;
      if (!Canvas) {
        image.onload = function () {
          resolve(getColor(this, canvas));
        };
      } else {
        resolve(getColor(image, canvas));
      }
    }).catch((err) => {
      reject(err);
    });
  });
}


const color = (function () {
  return {
    getDominant(src) {
      return getDominantColor(src);
    },
  };
}());

export default color;
