'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheCondition } from '@the-/ui-condition'
import { TheSpin } from '@the-/ui-spin'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import TheRepeatableStyle from './TheRepeatableStyle'

/**
 * Repeatable of the-component
 */
const TheRepeatable = (props) => {
  const {
    ItemComponent,
    ListComponent,
    alt,
    children,
    className,
    data = [],
    horizontal,
    introItem,
    keyFor,
    outroItem,
    render,
    spinning,
  } = props

  const empty = !spinning && data.length === 0
  return (
    <div
      {...htmlAttributesFor(props, { except: ['className', 'data', 'alt'] })}
      {...eventHandlersFor(props, { except: [] })}
      aria-busy={spinning}
      className={c('the-repeatable', className, {
        'the-repeatable-horizontal': horizontal,
      })}
    >
      <TheSpin className='the-repeatable-spin' cover enabled={spinning} />
      <TheCondition if={empty}>
        <div className='the-repeatable-alt'>{alt}</div>
      </TheCondition>
      <TheCondition unless={empty}>
        <ListComponent className='the-repeatable-list' role='list'>
          {introItem}
          {data.map((data, i) => (
            <ItemComponent
              className='the-repeatable-item'
              key={keyFor(data, i)}
              role='listitem'
            >
              {render(data, i)}
            </ItemComponent>
          ))}
          {outroItem}
        </ListComponent>
      </TheCondition>
      {children}
    </div>
  )
}

TheRepeatable.Style = TheRepeatableStyle

TheRepeatable.propTypes = {
  /** Item component */
  ItemComponent: PropTypes.any,
  /** List component */
  ListComponent: PropTypes.any,
  /** Alt text when empty */
  alt: PropTypes.node,
  /** Items to render */
  data: PropTypes.array,
  /** Render as horizontal list */
  horizontal: PropTypes.bool,
  /** Intro item */
  introItem: PropTypes.node,
  /** Get key for data */
  keyFor: PropTypes.func,
  /** Outro item */
  outroItem: PropTypes.node,
  /** Renderer */
  render: PropTypes.func.isRequired,
  /** Shows spinner */
  spinning: PropTypes.bool,
}

TheRepeatable.defaultProps = {
  ItemComponent: 'li',
  ListComponent: 'ul',
  alt: 'Data Not Found',
  data: [],
  horizontal: false,
  introItem: null,
  keyFor: (data, i) => i,
  outroItem: null,
  render: null,
  spinning: false,
}

TheRepeatable.displayName = 'TheRepeatable'

export default TheRepeatable
