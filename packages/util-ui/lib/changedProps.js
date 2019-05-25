'use strict'
/**
 * Extract changed props
 * @memberof module:@the-/util-ui
 * @function changedProps
 * @param {Object} prevProps
 * @param {Object} props
 * @returns {Object} - Changed prop values
 */
/** @lends module:@the-/util-ui.changedProps */
function changedProps(prevProps, props) {
  const changed = {}
  for (const [key, value] of Object.entries(props)) {
    if (prevProps[key] !== value) changed[key] = value
  }
  return changed
}

module.exports = changedProps
