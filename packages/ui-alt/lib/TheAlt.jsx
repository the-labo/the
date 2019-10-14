'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * Alt text for the-components
 * @memberof module:@the-/ui-alt
 * @class TheAlt
 */
const TheAlt = (props) => {
  const { children, className, enabled, text } = props
  if (!enabled) {
    return null
  }

  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-alt', className)}
    >
      <span className='the-alt-text'>{text}</span>
      {children}
    </div>
  )
}

TheAlt.propTypes = {
  enabled: PropTypes.bool,
  text: PropTypes.node,
}

TheAlt.defaultProps = {
  enabled: false,
  text: 'No Data Found',
}

TheAlt.displayName = 'TheAlt'

export default TheAlt
