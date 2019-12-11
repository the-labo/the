'use strict'

const { askNotification, showNotification } = require('@the-/notify')

async function tryExample() {
  // ask to notify if needed
  await askNotification()
  // show notification
  await showNotification('Hi there', {
    body: 'How do U do?',
    icon: 'images/my-awesome-some-icon.png',
  })
}

tryExample().catch((err) => console.error(err))
