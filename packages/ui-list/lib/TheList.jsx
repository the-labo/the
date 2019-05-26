'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheCondition } from '@the-/ui-condition'
import { TheSpin } from '@the-/ui-spin'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import TheListItem from './TheListItem'

/**
 * List components
 */
class TheList extends React.Component {
  render() {
    const {
      props,
      props: { alt, children, className, horizontal, spinning },
    } = this

    const empty = props.empty || React.Children.count(children) === 0
    return (
      <ul
        {...htmlAttributesFor(props, { except: ['className', 'alt'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={classnames('the-list', className, {
          'the-list-horizontal': horizontal,
        })}
      >
        <TheCondition if={!!spinning}>
          <TheSpin cover enabled size='x-large' />
        </TheCondition>
        <TheCondition if={empty}>
          <li className='the-list-alt'>{alt}</li>
        </TheCondition>
        {children}
      </ul>
    )
  }
}

TheList.Item = TheListItem

TheList.propTypes = {
  alt: PropTypes.node,
  horizontal: PropTypes.bool,
  spinning: PropTypes.bool,
}

TheList.defaultProps = {
  alt: 'No Data Found',
  horizontal: false,
  role: 'list',
  spinning: false,
}

TheList.displayName = 'TheList'

export default TheList
