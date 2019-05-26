'use strict'
/**
 * Test for TheFacebook.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const TheFacebook = require('../lib/TheFacebook')

describe('the-facebook', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheFacebook)

    const fb = new TheFacebook()
    ok(fb)
    // const appToken = await fb.appTokenFor('315653982270659', 'c1da99a8fe207cebe972803810fa3cda')
    // ok(appToken)
    // const data = await fb.userDataFor('EAAEfFet8NMMBAPZAYKiGcooS7ynlZCXawVuoJUTaBmyRBbZAvLFjI1I2DSeO5upyuSJWuHrf8Lo0ihjAmYfEkZCg2AW0NgC6uyRZCBn5Fgx4AKif09Hy3GRFFNxdAD0v4wZBWqr8ASfeZAueEP5whIbhp7IZCLZCwg5AgpuQNgcwIh8wriGArnve9ZCBpNIKVuj7RnhVDfrIffobN3pRbuOHzwqUJMGmjdlvpaodtpDh39XRmtsIeFrJON', appToken)
    // ok(data)
    //
    // const url = fb.userImageUrlFor(data.id)
    // ok(url)
  })
})

/* global describe, before, after, it */
