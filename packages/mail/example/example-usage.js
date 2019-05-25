'use strict'
const theMail = require('@the-/mail').default

async function tryExample() {
  const mail = theMail({
    key: 'xxxxxxxxxxx',
    service: 'sendgrid',
  })

  await mail.send({
    content: 'This is the content of the mail',
    from: 'the-sender@example.com',
    subject: 'This is the title',
    to: 'the-receiver@example.com',
  })
}

tryExample().catch((err) => console.error(err))
