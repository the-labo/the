/**
 * Create element and render to static markup
 * @function markup
 * @param {Object} props - Props for ComponentDemo
 * @returns {string} Static markup string
 */
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const TheComponentDemo = require('./shim/TheComponentDemo').default

/** @lends markup */
function markup(props) {
  const demo = React.createElement(TheComponentDemo, props)
  return ReactDOMServer.renderToStaticMarkup(demo)
}

module.exports = markup
