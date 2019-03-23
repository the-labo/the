'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheButton } from '@the-/button'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-component'
import { TheContainer } from 'the-container'
import TheBarStyle from './TheBarStyle'

/**
 * Bar of the-component
 */
class TheActionBar extends React.Component {
  render () {
    const { props } = this
    const {
      buttons,
      children,
      className,
      danger,
      handlers,
      hidden,
      icons,
      lead,
    } = props
    return (
      <div {...htmlAttributesFor(props, { except: ['className', 'hidden'] })}
           {...eventHandlersFor(props, { except: [] })}
           className={classnames('the-action-bar', className, {
             'the-action-bar-hidden': hidden,
           })}
      >
        <TheContainer className='the-action-bar-inner'>

          {
            lead && (
              <p className='the-action-bar-lead'>{lead}</p>
            )
          }

          <div className='the-action-bar-buttons'>
            {
              Object.keys(buttons).map((name) => (
                <TheButton className='the-action-bar-button'
                           danger={danger[name]}
                           icon={icons[name]}
                           key={name}
                           onClick={handlers[name]}
                >{buttons[name]}</TheButton>
              ))
            }
          </div>
          {children}
        </TheContainer>
      </div>
    )
  }
}

TheActionBar.Style = TheBarStyle

TheActionBar.propTypes = {
  /** Button texts  */
  buttons: PropTypes.object,
  /** Danger marks  */
  danger: PropTypes.object,
  /** Handler functions  */
  handlers: PropTypes.object,
  /** Hidden or not */
  hidden: PropTypes.bool,
  /** Icon class names */
  icons: PropTypes.object,
  /** Lead text */
  lead: PropTypes.string,
}

TheActionBar.defaultProps = {
  buttons: {},
  danger: {},
  handlers: {},
  hidden: false,
  icons: {},
}

TheActionBar.displayName = 'TheActionBar'

export default TheActionBar
