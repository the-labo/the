'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { eventHandlersFor, htmlAttributesFor, newId } from '@the-/util-ui'

/**
 * Toggle input of the-components
 */
const TheInputToggle = React.memo((props) => {
  const {
    className,
    color,
    error,
    name,
    offTitle,
    on,
    onChange,
    onTitle,
    onUpdate,
    simple = false,
    style,
    width,
  } = props
  const id = useMemo(() => props.id || newId(), [props.id])

  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e)
    },
    [onChange],
  )

  const handleClick = useCallback(() => {
    onUpdate && onUpdate({ [name]: !on })
  }, [name, on, onUpdate])

  return (
    <div
      {...htmlAttributesFor(props, { except: ['id', 'className'] })}
      {...eventHandlersFor(props, { except: [] })}
      aria-checked={on}
      className={c('the-input-toggle', className, {
        'the-input-error': !!error,
        'the-input-toggle-off': !on,
        'the-input-toggle-on': on,
        'the-input-toggle-simple': simple,
      })}
      id={id}
      role='switch'
      style={Object.assign({}, style, { width })}
    >
      <div className='the-input-toggle-inner'>
        <TheInputToggle.Label
          className='the-input-toggle-on-label'
          htmlFor={`${id}-radio-off`}
          style={{ backgroundColor: color }}
          title={onTitle}
        />
        <TheInputToggle.Radio
          checked={!on}
          id={`${id}-radio-off`}
          name={name}
          onChange={handleChange}
          onClick={handleClick}
          value='off'
        />
        <div
          className='the-input-toggle-handle'
          onClick={handleClick}
          style={simple ? { backgroundColor: color } : {}}
        />
        <TheInputToggle.Label
          className='the-input-toggle-off-label'
          htmlFor={`${id}-radio-on`}
          title={offTitle}
        />
        <TheInputToggle.Radio
          checked={!!on}
          id={`${id}-radio-on`}
          name={name}
          onChange={handleChange}
          onClick={handleClick}
          value='on'
        />
      </div>
      {props.children}
    </div>
  )
})

TheInputToggle.Label = function TheInputToggleLabel({
  className,
  htmlFor,
  style,
  title,
}) {
  return (
    <label
      className={c('the-input-toggle-label', className)}
      htmlFor={htmlFor}
      style={style}
    >
      <span className='the-input-toggle-label-text'>{title}</span>
    </label>
  )
}

TheInputToggle.Radio = function TheInputToggleRadio({
  checked,
  id,
  name,
  onChange,
  onClick,
  value,
}) {
  return (
    <input
      checked={checked}
      className='the-input-toggle-radio'
      id={id}
      name={name}
      onChange={onChange}
      onClick={onClick}
      type='radio'
      value={value}
    />
  )
}

TheInputToggle.propTypes = {
  /** Title text for off state */
  offTitle: PropTypes.string,
  /** Switch on or not */
  on: PropTypes.bool.isRequired,
  /** Title text for on state */
  onTitle: PropTypes.string,
  /** Width of component */
  width: PropTypes.number,
}

TheInputToggle.defaultProps = {
  error: null,
  offTitle: '',
  on: false,
  onTitle: '',
  width: 64,
}

TheInputToggle.displayName = 'TheInputToggle'

export default TheInputToggle
