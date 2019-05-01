'use strict'

const theFacebook = require('@the-/facebook')

async function tryExample() {
  const fb = theFacebook({ apiVersion: 'v2.11' })

  const token = 'xxxxxxxxx' // user token
  const appToken = await fb.appTokenFor('__my_app_id__', '__my_app_secret__')
  const data = await fb.userDataFor(token, appToken, {
    fields: 'name,email,picture,timezone,gender,locale',
  })
}

tryExample().catch((err) => console.error(err))
