'use strict'

const coz = require('coz')
const { readme } = require('the-templates')

coz.render(
  readme({
    pkg: { name: 'foo', version: 'bar' },
  }),
)
