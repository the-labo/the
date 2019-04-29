'use strict'

const coz = require('coz')
const { Readme } = require('@the-/templates')

const bud = Readme({
  pkg: { name: 'foo', version: 'bar' },
})

coz.render(bud,)
