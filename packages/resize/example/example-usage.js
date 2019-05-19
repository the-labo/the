'use strict'

const { TheResize } = require('@the-/resize')

async function tryExample() {
  const resize = new TheResize({
    fit: 'inside', // 'cover','contain','fill', 'inside' or 'outside'

    height: 200,
    width: 200,
  })
  // Resize image to size fit inside 200x200
  await resize.convert('src01.png', 'dest01.png')
}

tryExample().catch((err) => console.error(err))
