'use strict'

function evalInjectors(creators = {}){
  return Object.assign(
    {},
    ...Object.keys(creators).map((name) => ({
      [name]: creators[name](),
    })),
  )
}

module.exports = evalInjectors
