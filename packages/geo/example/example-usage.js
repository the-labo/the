'use strict'

const {TheGeo} = require('@the-/geo')

async function tryExample () {

  const geo = new TheGeo()

  const {lat, lng} = await geo.detect()
  console.log('current geo location', {lat, lng})

}

tryExample().catch((err) => console.error(err))
