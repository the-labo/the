'use strict'

const {TheRefresher} = require('the-refresher')

async function tryExample () {
  const refresher = new TheRefresher(async () => {
    // Do something to refresh
    /* .. */
  }, {
    interval: 3000,
  })

  await refresher.start()
}

tryExample().catch((err) => console.error(err))
