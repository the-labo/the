/**
 * Key code detector
 * @function isKeyCode
 * @param {number} code - Key code to check
 * @param {string|number} name - Name of key code to compare
 * @return {boolean}
 */
'use strict'

const keycode = require('keycode')

/** @lends isKeyCode */
function isKeyCode(name, code) {
  return (
    code === name ||
    Number(code) === Number(name) ||
    keycode(name) === code ||
    keycode(name) === Number(code)
  )
}

const _bind = (name) => isKeyCode.bind(null, name)

Object.assign(isKeyCode, {
  down: _bind('down'),
  enter: _bind('enter'),
  left: _bind('left'),
  right: _bind('right'),
  space: _bind('space'),
  up: _bind('up'),
})

module.exports = isKeyCode
