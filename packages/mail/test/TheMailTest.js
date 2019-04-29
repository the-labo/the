/**
 * Test for TheMail.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
const theSecret = require('@the-/secret').default
const TheMail = require('../lib/TheMail')

describe('the-mail', function() {
  this.timeout(500000)
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheMail)

    const mail = new TheMail({
      service: 'mock',
    })
    await mail.send({
      content: '<h3>foo</h3>',
      from: 'foo@example.com',
      subject: 'This is a mail',
      to: 'to@example.com',
    })
  })

  it('Use SMTP', async () => {
    ok(TheMail)
    return // FIXME
    const mail = new TheMail({
      service: 'smtp',
      url: 'smtps://username:password@smtp.zoho.com/?pool=true',
    })
    await mail.send({
      content: '<h3>The mail!</h3>',
      from: 'support@kini-naru.site',
      subject: 'This is the mail test',
      to: 'okunishinishi@gmail.com',
    })
  })

  it('Send grid', async () => {
    return // FIXME
    const mail = new TheMail({
      key: '',
      service: 'sendgrid',
    })

    await mail
      .send({
        content: '<h3>The mail!</h3>',
        from: 'support@the-demo-site.com',
        subject: 'This is the mail test',
        to: 'okunishinishi@gmail.com',
      })
      .catch((e) => {
        console.error('error', e)
      })
  })
})

/* global describe, before, after, it */
