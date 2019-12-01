'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import TheSpin from '@the-/ui-spin/shim/TheSpin'
import { htmlAttributesFor } from '@the-/util-ui'

/**
 * Main for the-components
 */
const TheMain = (props) => {
  const { children, className, spinning } = props
  return (
    <main
      {...htmlAttributesFor(props, { except: ['className'] })}
      aria-busy={spinning}
      className={c('the-main', className)}
    >
      {spinning && (
        <TheSpin className='the-main-spin' cover enabled size='xx-large' />
      )}
      {children}
    </main>
  )
}

TheMain.propTypes = {
  /** Show spinner */
  spinning: PropTypes.bool,
}

TheMain.defaultProps = {
  role: 'main',
  spinning: false,
}

TheMain.displayName = 'TheMain'

export default TheMain
