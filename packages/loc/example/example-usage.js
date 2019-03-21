'use strict'

// Require defined locales
const loc = require('./loc/index.js')

let en = loc.bind('en')
console.log(en('titles.WELCOME_TITLE')) // -> "Welcome to hello-world!"
