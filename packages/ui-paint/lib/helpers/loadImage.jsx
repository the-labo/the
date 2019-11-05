'use strict'

async function loadImage(src) {
  if (typeof src === 'string') {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.crossorigin = true
      image.onload = () => resolve(image)
      image.onerror = (e) => reject(e)
      image.src = src
    })
  }
  return src
}

export default loadImage

/* global Image */
