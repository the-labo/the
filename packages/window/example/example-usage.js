'use strict'
const React = require('react')
const { mount, once } = require('@the-/window')

async function tryExample() {
  once('DOMContentLoaded', () => {
    const element = React.createElement('div')
    mount(element, '@the-/window-dom-id')
  })
}

tryExample().catch((err) => console.error(err))
