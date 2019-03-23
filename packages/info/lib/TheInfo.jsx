'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from 'the-component-util'

/**
 * Info of the-component
 */
class TheInfo extends React.Component {
  static Body ({ children, className }) {
    return (
      <div className={classnames('the-info-body', className)}
           role='rowGroup'
      >
        {children}
      </div>
    )
  }

  static Header ({ children, className }) {
    return (
      <h5 className={classnames('the-info-header', className)}
          role='heading'
      >
        {children}
      </h5>
    )
  }

  static Row ({ children, className, label, value }) {
    return (
      <div className={classnames('the-info-row', className)}
           role='row'
      >
        <label className='the-info-row-label'
               role='rowheader'
        >
          {label}
        </label>
        <div aria-label={label}
             className='the-info-row-value'
             role='gridcell'
        >
          {value}
        </div>
      </div>
    )
  }

  render () {
    const { props } = this
    const {
      children,
      className,
      data,
      keys,
      title,
    } = props
    return (
      <div {...htmlAttributesFor(props, { except: ['className', 'data'] })}
           {...eventHandlersFor(props, { except: [] })}
           className={classnames('the-info', className)}
      >
        {
          title && (
            <TheInfo.Header>{title}</TheInfo.Header>
          )
        }
        <TheInfo.Body>
          {
            (keys || Object.keys(data || {})).map((label) => (
              <TheInfo.Row key={label}
                           label={label}
                           value={data[label]}
              >
              </TheInfo.Row>
            ))
          }
          {children}
        </TheInfo.Body>
      </div>
    )
  }
}

TheInfo.propTypes = {
  /** Info data */
  data: PropTypes.objectOf(PropTypes.node),
  /** Keys to show */
  keys: PropTypes.arrayOf(PropTypes.string),
  /** Info title */
  title: PropTypes.string,
}

TheInfo.defaultProps = {
  data: {},
  keys: null,
  role: 'grid',
  title: null,
}

TheInfo.displayName = 'TheInfo'

export default TheInfo
