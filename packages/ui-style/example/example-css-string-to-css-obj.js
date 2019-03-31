'use strict'

const css = require('css')
const fs = require('fs')
const stringcase = require('stringcase')

const data = css.parse(
  fs.readFileSync(require.resolve('flatpickr/dist/flatpickr.css')).toString(),
)
console.log(
  Object.assign(
    {},
    ...data.stylesheet.rules
      .filter(({ selectors }) => !!selectors)
      .map(({ declarations, selectors }) => ({
        [selectors.join(',')]: Object.assign(
          {},
          ...(declarations || [])
            .filter(({ property }) => !/^-ms-/.test(property))
            .filter(({ property }) => !/^-moz-/.test(property))
            .filter(({ property }) => !/^-webkit-/.test(property))
            .map(({ property, value }) => ({
              [stringcase.camelcase(property)]: value,
            })),
        ),
      })),
  ),
)
