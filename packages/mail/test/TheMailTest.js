/**
 * Test for TheMail.
 * Runs with mocha.
 */
'use strict'

const TheMail = require('../lib/TheMail')
const {ok, equal} = require('assert')
const theSecret = require('@the-/secret').default

describe('the-mail', function () {
  this.timeout(500000)
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    ok(TheMail)

    const mail = new TheMail({
      service: 'mock'
    })
    await mail.send({
      from: 'foo@example.com',
      to: 'to@example.com',
      subject: 'This is a mail',
      content: '<h3>foo</h3>'
    })
  })

  it('Use SMTP', async () => {
    ok(TheMail)
    return // FIXME
    const mail = new TheMail({
      service: 'smtp',
      url: 'smtps://username:password@smtp.zoho.com/?pool=true'
    })
    await mail.send({
      from: 'support@kini-naru.site',
      to: 'okunishinishi@gmail.com',
      subject: 'This is the mail test',
      content: '<h3>The mail!</h3>',
    })
  })

  it('Send grid', async () => {
    return // FIXME
    const mail = new TheMail({
      service: 'sendgrid',
      key: '',
    })

    await mail.send({
      from: 'support@the-demo-site.com',
      to: 'okunishinishi@gmail.com',
      subject: 'This is the mail test',
      content: '<h3>The mail!</h3>',
    }).catch((e) => {
      console.error('error', e)
    })
  })
})

/* global describe, before, after, it */
