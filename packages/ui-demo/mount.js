/**
 * Mount into component demo
 * @function mount
 * @param {function} Component - Component class
 * @param {Object} props - Root props
 * @param {function} callback
 */
'use strict'

const React = require('react')
const ReactDOM = require('react-dom')

/** @lends mount */
function mount(Component, props, callback) {
  let container = document.getElementById('the-demo')
  let component = React.createElement(Component, props)
  ReactDOM.render(component, container, () => {
    if (callback) {
      callback()
    }
  })
}

module.exports = mount
