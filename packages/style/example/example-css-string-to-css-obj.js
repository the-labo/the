'use strict'

const css = require('css')
const stringcase = require('stringcase')

const fs = require('fs')

const data = css.parse(
  fs.readFileSync(
    require.resolve('flatpickr/dist/flatpickr.css')
  ).toString()
)
console.log(
  Object.assign({},
    ...data.stylesheet.rules
      .filter(({selectors}) => !!selectors)
      .map(({selectors, declarations}) => ({
        [selectors.join(',')]: Object.assign({},
          ...(declarations || [])
            .filter(({property}) => !/^-ms-/.test(property))
            .filter(({property}) => !/^-moz-/.test(property))
            .filter(({property}) => !/^-webkit-/.test(property))
            .map(({property, value}) => ({
              [stringcase.camelcase(property)]: value
            }))
        )
      }))
  )
)
