'use strict'

import PropTypes from 'prop-types'
import React from 'react'

/**
 * Conditional renderer for the-components
 */
class TheCondition extends React.Component {
  render() {
    const {
      props: { children },
    } = this

    if (!this.shouldRender()) {
      return null
    }

    return children
  }

  shouldRender() {
    const {
      props: { allOf, if: if_, someOf, unless },
    } = this

    if (if_ !== null) {
      if (!if_) {
        return false
      }
    }

    if (unless !== null) {
      if (unless) {
        return false
      }
    }

    if (someOf !== null) {
      const hasAny = someOf.some((bool) => bool)
      if (!hasAny) {
        return false
      }
    }

    if (allOf !== null) {
      const hasAll = !allOf.some((bool) => !bool)
      if (!hasAll) {
        return false
      }
    }

    return true
  }
}

TheCondition.propTypes = {
  allOf: PropTypes.arrayOf(PropTypes.bool),
  if: PropTypes.bool,
  someOf: PropTypes.arrayOf(PropTypes.bool),
  unless: PropTypes.bool,
}

TheCondition.defaultProps = {
  allOf: null,
  if: null,
  someOf: null,
  unless: null,
}

TheCondition.displayName = 'TheCondition'

export default TheCondition
