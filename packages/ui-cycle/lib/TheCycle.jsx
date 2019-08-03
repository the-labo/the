'use strict'

import { cleanup } from 'asobj'
import Debug from 'debug'
import PropTypes from 'prop-types'
import React from 'react'
import { changedProps } from '@the-/util-ui'

const isEmptyObj = (obj) => !obj || Object.keys(obj).length === 0

const debug = Debug('the:cycle')

/**
 * Component with life cycle
 */
class TheCycle extends React.Component {
  componentDidMount() {
    const {
      props: { onMount, values },
    } = this
    onMount && onMount()
    debug('onMount')
    const received = cleanup({ ...values })
    this.handleReceive(null, received)
  }

  componentDidUpdate(prevProps) {
    const {
      props: { values },
    } = this
    this.handleReceive(prevProps.values, values)
  }

  componentWillUnmount() {
    const {
      props: { onUnmount },
    } = this
    onUnmount && onUnmount()
    debug('onUnmount')
  }

  handleReceive(prevValues, values) {
    const {
      props: { onReceive },
    } = this
    const received = prevValues
      ? changedProps(prevValues, values)
      : { ...values }
    if (isEmptyObj(received)) {
      return
    }

    onReceive && onReceive(received, prevValues, values)
    debug('onReceive', received)
  }

  render() {
    const {
      props: { children },
    } = this

    return <React.Fragment>{children}</React.Fragment>
  }
}

TheCycle.propTypes = {
  /** Handler for component mount */
  onMount: PropTypes.func,
  /** Handler for new prop values */
  onReceive: PropTypes.func,
  /** Handler for component unmount */
  onUnmount: PropTypes.func,
  /** Values to receive */
  values: PropTypes.object,
}

TheCycle.defaultProps = {
  onMount: () => null,
  onReceive: () => null,
  onUnmount: () => null,
  values: {},
}

TheCycle.displayName = 'TheCycle'

export default TheCycle
