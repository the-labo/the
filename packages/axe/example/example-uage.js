'use strict'

const axe = require('@the-/axe')
document.addEventListener('DOMContentLoaded', () => {
  if (process.env.NODE_ENV !== 'production') {
    // Start
    axe.start({
      interval: 10000,
    })
  }
})
