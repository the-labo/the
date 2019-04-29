'use strict'

const theMail = require('@the-/mail').default

async function tryExample () {
  const mail = theMail({
    service: 'sendgrid',
    key: 'xxxxxxxxxxx'
  })

  await mail.send({
    from: 'the-sender@example.com',
    to: 'the-receiver@example.com',
    subject: 'This is the title',
    content: 'This is the content of the mail'
  })
}

tryExample().catch((err) => console.error(err))
