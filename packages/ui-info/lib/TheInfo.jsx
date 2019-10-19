'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * Info of the-component
 */
const TheInfo = (props) => {
  const { children, className, data, keys, title } = props
  return (
    <div
      {...htmlAttributesFor(props, { except: ['className', 'data'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={classnames('the-info', className)}
    >
      {title && <TheInfo.Header>{title}</TheInfo.Header>}
      <TheInfo.Body>
        {(keys || Object.keys(data || {})).map((label) => (
          <TheInfo.Row key={label} label={label} value={data[label]} />
        ))}
        {children}
      </TheInfo.Body>
    </div>
  )
}

TheInfo.Body = function Body({ children, className }) {
  return (
    <div className={classnames('the-info-body', className)} role='rowGroup'>
      {children}
    </div>
  )
}

TheInfo.Header = function Header({ children, className }) {
  return (
    <h5 className={classnames('the-info-header', className)} role='heading'>
      {children}
    </h5>
  )
}

TheInfo.Row = function Row({ className, label, value }) {
  return (
    <div className={classnames('the-info-row', className)} role='row'>
      <label className='the-info-row-label' role='rowheader'>
        {label}
      </label>
      <div aria-label={label} className='the-info-row-value' role='gridcell'>
        {value}
      </div>
    </div>
  )
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
