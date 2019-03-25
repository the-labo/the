'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { isProduction } from '@the-/check'
import { TheCondition } from '@the-/condition'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-component'

/**
 * Component to show caught errors
 */
class TheCaught extends React.Component {
  render() {
    const { props } = this
    const { children, className, error, info } = props
    const { componentStack } = info || {}
    if (!error) {
      return null
    }
    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-caught', className)}
      >
        <h3 className='the-caught-title' role='heading'>
          {String(error.message || error)}
        </h3>
        {children}
        <TheCondition if={!!componentStack && !isProduction()}>
          <pre className='the-caught-stack'>{componentStack}</pre>
        </TheCondition>
      </div>
    )
  }
}

TheCaught.propTypes = {
  /** Caught error */
  error: PropTypes.string,
  /** Error Info */
  info: PropTypes.object,
}

TheCaught.defaultProps = {
  error: null,
  info: null,
}

TheCaught.displayName = 'TheCaught'

export default TheCaught
