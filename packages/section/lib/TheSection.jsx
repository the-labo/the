'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheButton } from 'the-button'
import { eventHandlersFor, htmlAttributesFor } from 'the-component-util'
import { TheSpin } from 'the-spin'

/**
 * Section of the-components
 */
class TheSection extends React.Component {
  static Body(props) {
    let { children, className } = props
    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-section-body', className)}
      >
        {children}
      </div>
    )
  }

  static Header(props) {
    const {
      actionIcon,
      actionText,
      actionTo,
      children,
      className,
      lined,
      onAction,
      role = 'heading',
    } = props
    return (
      <h2
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-section-header', className, {
          'the-section-header-lined': lined,
        })}
        role={role}
      >
        <span className='the-section-header-text'>{children}</span>
        {Boolean(actionIcon || actionText) && (
          <TheButton
            className='the-section-header-action'
            icon={actionIcon}
            onClick={onAction}
            simple
            to={actionTo}
          >
            {actionText}
          </TheButton>
        )}
      </h2>
    )
  }

  render() {
    const { props } = this
    const { children, className, spinning } = props
    return (
      <section
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        aria-busy={spinning}
        className={c('the-section', className)}
      >
        <TheSpin
          className='the-section-spin'
          cover
          enabled={spinning}
          size='x-large'
        />
        {children}
      </section>
    )
  }
}

TheSection.propTypes = {
  spinning: PropTypes.bool,
}

TheSection.defaultProps = {
  role: 'region',
  spinning: false,
}

TheSection.displayName = 'TheSection'

export default TheSection
