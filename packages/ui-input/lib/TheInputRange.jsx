'use strict'

import chopcal from 'chopcal'
import c from 'classnames'
import PropTypes from 'prop-types'
import rangecal from 'rangecal'
import React from 'react'
import Draggable from 'react-draggable'
import { TheCondition } from '@the-/ui-condition'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import { get } from '@the-/window'
import { renderErrorMessage } from './helpers'

/**
 * Range Input
 */
class TheInputRange extends React.PureComponent {
  static Handle(props) {
    const { elmRef, maxX, minX, onMove, shouldMove = true, step, x } = props
    return (
      <Draggable
        axis='x'
        bounds={{ left: minX, right: maxX }}
        grid={step && [step, step]}
        onDrag={(e, { x, y }) => shouldMove && onMove({ x, y })}
        onStart={(e, { x, y }) => shouldMove && onMove({ x, y })}
        onStop={(e, { x, y }) => shouldMove && onMove({ x, y })}
        position={{ x, y: 0 }}
      >
        <div
          className='the-input-range-handle'
          data-max-x={maxX}
          data-min-x={minX}
          ref={elmRef}
        >
          <div className='the-input-range-handle-area' />
          <div className='the-input-range-handle-icon' />
        </div>
      </Draggable>
    )
  }

  static Label({ children, className, ref }) {
    return (
      <label className={c('the-input-range-label', className)} ref={ref}>
        <span>{children}</span>
      </label>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      fromX: 0,
      maxX: 0,
      minX: 0,
      toX: 0,
    }
    this.elm = null
    this.barElm = null
    this.fromHandleElm = null
    this.toHandleElm = null

    const methodsToBind = [
      'handleResize',
      'handleBarClick',
      'handleFromHandleMove',
      'handleToHandleMove',
    ]
    for (const methodName of methodsToBind) {
      this[methodName] = this[methodName].bind(this)
    }
  }

  componentDidMount() {
    const { window } = get('window')
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    const { window } = get('window')
    window.removeEventListener('resize', this.handleResize)
  }

  getHandleRadius() {
    const { fromHandleElm } = this
    if (!fromHandleElm) {
      return 0
    }

    return fromHandleElm.offsetWidth / 2
  }

  handleBarClick(e) {
    const { barElm, state } = this
    if (!barElm) {
      return
    }

    const handleRadius = this.getHandleRadius()
    const { fromX, toX } = state
    const { left } = barElm.getBoundingClientRect()
    const x = e.clientX - left - handleRadius
    const xWithFromX = Math.abs(x - fromX)
    const xWithToX = Math.abs(x - toX)
    const rate = this._rateWithX(x)
    const value = this._valueWithRate(rate)
    const {
      props: {
        value: [from, to],
      },
    } = this
    if (xWithFromX > xWithToX) {
      this.setState({ toX: x })
      this.setRangeValue(from, value)
    } else {
      this.setState({ fromX: x })
      this.setRangeValue(value, to)
    }
  }

  handleFromHandleMove({ x }) {
    const rate = this._rateWithX(x)
    const from = this._valueWithRate(rate)
    const {
      props: {
        value: [, to],
      },
    } = this
    this.setRangeValue(from, to)
  }

  handleResize() {
    const { barElm, props } = this
    if (!barElm) {
      return
    }

    const { offsetWidth: w } = barElm
    const handleRadius = this.getHandleRadius()
    const minX = 0 - handleRadius
    const maxX = w - handleRadius
    if (minX === maxX) {
      return
    }

    const {
      value: [from, to],
    } = props
    const fromRate = this._rateWithValue(from)
    const toRate = this._rateWithValue(to)
    this.setState({
      fromX: rangecal.value(minX, maxX, fromRate),
      maxX,
      minX,
      toX: rangecal.value(minX, maxX, toRate),
    })
  }

  handleToHandleMove({ x }) {
    const rate = this._rateWithX(x)
    const to = this._valueWithRate(rate)
    const {
      props: {
        value: [from],
      },
    } = this
    this.setRangeValue(from, to)
  }

  render() {
    const {
      props,
      props: {
        barOnly,
        className,
        error,
        max,
        min,
        name,
        value: { from, to },
      },
      state: { fromX, maxX, minX, toX },
    } = this

    return (
      <div
        {...htmlAttributesFor(props, {
          except: ['id', 'className', 'type', 'value', 'name', 'placeholder'],
        })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-input-range', className, {
          'the-input-error': !!error,
        })}
        data-value-from={from}
        data-value-to={to}
        ref={(elm) => {
          this.elm = elm
          this.handleResize()
        }}
      >
        {renderErrorMessage(error)}
        <input
          name={`${name}[from]`}
          onChange={() => {}}
          type='hidden'
          value={from}
        />
        <input
          name={`${name}[to]`}
          onChange={() => {}}
          type='hidden'
          value={to}
        />
        <div className='the-input-range-inner'>
          <TheCondition unless={barOnly}>
            <TheInputRange.Label>{min}</TheInputRange.Label>
          </TheCondition>
          <div className='the-input-range-bar-wrap'>
            <div
              className='the-input-range-bar'
              onClick={(e) => this.handleBarClick(e)}
              ref={(barElm) => {
                this.barElm = barElm
                this.handleResize()
              }}
            >
              <div className='the-input-range-bar-tap' />
              <div className='the-input-range-bar-bg' />
              <div
                className='the-input-range-bar-highlight'
                style={{ left: fromX, width: toX - fromX }}
              />
            </div>
            <TheInputRange.Handle
              elmRef={(fromHandleElm) => {
                this.fromHandleElm = fromHandleElm
                this.handleResize()
              }}
              maxX={maxX}
              minX={minX}
              onMove={(e) => this.handleFromHandleMove(e)}
              x={fromX}
            />
            <TheInputRange.Handle
              elmRef={(toHandleElm) => {
                this.toHandleElm = toHandleElm
                this.handleResize()
              }}
              maxX={maxX}
              minX={minX}
              onMove={(e) => this.handleToHandleMove(e)}
              x={toX}
            />
          </div>
          <TheCondition unless={barOnly}>
            <TheInputRange.Label>{max}</TheInputRange.Label>
          </TheCondition>
        </div>
      </div>
    )
  }

  setRangeValue(from, to) {
    const {
      props,
      state: { maxX, minX },
    } = this

    if (minX === maxX) {
      return
    }

    const {
      name,
      step,
      value: [currentFrom, currentTo],
    } = props

    if (to < from) {
      if (from === currentFrom) {
        from = to - step
      } else if (to === currentFrom.to) {
        to = from + step
      } else {
        to = from = (to + from) / 2
        to += step
        from -= step
      }
    }

    const duplicate = currentFrom === from && currentTo === to
    if (duplicate) {
      return
    }

    const fromRate = this._rateWithValue(from)
    const toRate = this._rateWithValue(to)
    this.setState({
      fromX: rangecal.value(minX, maxX, fromRate),
      toX: rangecal.value(minX, maxX, toRate),
    })

    from = chopcal.round(from, step)
    to = chopcal.round(to, step)

    const notChanged = this._from === from && this._to === to
    if (notChanged) {
      return
    }

    this._from = from
    this._to = to

    if (props.onUpdate) {
      props.onUpdate({ [name]: [from, to] })
    }
  }

  _rateWithValue(value) {
    const {
      props: { max, min },
    } = this

    value = rangecal.round(min, max, value)
    return chopcal.round(rangecal.rate(min, max, value), 0.01)
  }

  _rateWithX(x) {
    const {
      state: { maxX, minX },
    } = this

    if (minX === maxX) {
      return 0
    }

    return rangecal.rate(minX, maxX, x + 2)
  }

  _valueWithRate(rate) {
    const {
      props: { max, min },
    } = this

    const value = chopcal.round(rangecal.value(min, max, rate), 0.01)
    return rangecal.round(min, max, value)
  }
}

TheInputRange.propTypes = {
  /** Name of input */
  /** Hides min/max value text */
  barOnly: PropTypes.bool,
  /** Input error */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Max value */
  max: PropTypes.number,
  /** Min value */
  min: PropTypes.number,
  name: PropTypes.string.isRequired,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Value step */
  step: PropTypes.number,
  /** Value of input */
  value: PropTypes.arrayOf(PropTypes.number),
}

TheInputRange.defaultProps = {
  barOnly: false,
  error: null,
  max: 100,
  min: 0,
  step: 0.1,
  value: [0, 100],
}

TheInputRange.displayName = 'TheInputRange'

export default TheInputRange
