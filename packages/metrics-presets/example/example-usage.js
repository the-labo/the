'use strict'

const { RenderingCountMetrics } = require('@the-/metrics-presets')

async function tryExample() {
  const Components = {
    /*...*/
  }

  // Start rendering count metrics
  const stop = RenderingCountMetrics(Components, {
    interval: 30 * 1000,
  })

  /* ... */
  stop()
}

tryExample().catch((err) => console.error(err))
