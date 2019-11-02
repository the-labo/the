'use strict'

import chopcal from 'chopcal'
import c from 'classnames'
import PropTypes from 'prop-types'
import rangecal from 'rangecal'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TheCondition } from '@the-/ui-condition'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import { get } from '@the-/window'
import { renderErrorMessage } from './helpers'
import TheInputRangeHandle from './partials/TheInputRangeHandle'
import TheInputRangeLabel from './partials/TheInputRangeLabel'

const noop = () => {}
/**
 * Range Input
 */
const TheInputRange = React.memo((props) => {
  const {
    barOnly,
    className,
    error,
    max,
    min,
    name,
    onUpdate,
    step,
    value: { from, to },
  } = props
  const [fromX, setFromX] = useState(0)
  const [maxX, setMaxX] = useState(0)
  const [minX, setMinX] = useState(0)
  const [toX, setToX] = useState(0)
  const elmRef = useRef(null)
  const barElmRef = useRef(null)
  const fromHandleElmRef = useRef(null)
  const toHandleElmRef = useRef(null)

  useEffect(() => {
    const { window } = get('window')
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const _rateWithValue = useCallback(
    (value) => {
      const choppedValue = rangecal.round(min, max, value)
      return chopcal.round(rangecal.rate(min, max, choppedValue), 0.01)
    },
    [min, max],
  )

  const _rateWithX = useCallback(
    (x) => {
      if (minX === maxX) {
        return 0
      }

      return rangecal.rate(minX, maxX, x + 2)
    },
    [minX, maxX],
  )

  const _valueWithRate = useCallback(
    (rate) => {
      const value = chopcal.round(rangecal.value(min, max, rate), 0.01)
      return rangecal.round(min, max, value)
    },
    [max, min],
  )

  const getHandleRadius = useCallback(() => {
    const { current: fromHandleElm } = fromHandleElmRef
    if (!fromHandleElm) {
      return 0
    }

    return fromHandleElm.offsetWidth / 2
  }, [])

  const setRangeValue = useCallback(
    (from, to) => {
      if (minX === maxX) {
        return
      }

      const {
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

      const fromRate = _rateWithValue(from)
      const toRate = _rateWithValue(to)
      setFromX(rangecal.value(minX, maxX, fromRate))
      setToX(rangecal.value(minX, maxX, toRate))

      from = chopcal.round(from, step)
      to = chopcal.round(to, step)

      const notChanged = currentFrom === from && currentTo === to
      if (notChanged) {
        return
      }

      if (onUpdate) {
        onUpdate({ [name]: [from, to] })
      }
    },
    [onUpdate, name, step, props.value, minX, maxX, _rateWithValue],
  )

  const handleBarClick = useCallback(
    (e) => {
      const { current: barElm } = barElmRef
      if (!barElm) {
        return
      }

      const handleRadius = getHandleRadius()
      const { left } = barElm.getBoundingClientRect()
      const x = e.clientX - left - handleRadius
      const xWithFromX = Math.abs(x - fromX)
      const xWithToX = Math.abs(x - toX)
      const rate = _rateWithX(x)
      const value = _valueWithRate(rate)
      const {
        value: [from, to],
      } = props
      if (xWithFromX > xWithToX) {
        setToX(x)
        setRangeValue(from, value)
      } else {
        setFromX(x)
        setRangeValue(value, to)
      }
    },
    [props.value, getHandleRadius],
  )

  const handleFromHandleMove = useCallback(
    ({ x }) => {
      const rate = _rateWithX(x)
      const from = _valueWithRate(rate)
      const {
        value: [, to],
      } = props
      setRangeValue(from, to)
    },
    [props.value, _rateWithValue, _rateWithValue, setRangeValue],
  )

  const handleResize = useCallback(() => {
    const { current: barElm } = barElmRef
    if (!barElm) {
      return
    }

    const { offsetWidth: w } = barElm
    const handleRadius = getHandleRadius()
    const minX = 0 - handleRadius
    const maxX = w - handleRadius
    if (minX === maxX) {
      return
    }

    const {
      value: [from, to],
    } = props
    const fromRate = _rateWithValue(from)
    const toRate = _rateWithValue(to)
    setFromX(rangecal.value(minX, maxX, fromRate))
    setMaxX(maxX)
    setMinX(minX)
    setToX(rangecal.value(minX, maxX, toRate))
  }, [getHandleRadius, _rateWithValue, _rateWithValue, setMaxX])

  const handleToHandleMove = useCallback(
    ({ x }) => {
      const rate = _rateWithX(x)
      const to = _valueWithRate(rate)
      const {
        value: [from],
      } = props
      setRangeValue(from, to)
    },
    [props.value, _rateWithX, _valueWithRate, setRangeValue],
  )

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
      ref={elmRef}
    >
      {renderErrorMessage(error)}
      <input
        name={`${name}[from]`}
        onChange={noop}
        type='hidden'
        value={from}
      />
      <input name={`${name}[to]`} onChange={noop} type='hidden' value={to} />
      <div className='the-input-range-inner'>
        <TheCondition unless={barOnly}>
          <TheInputRange.Label>{min}</TheInputRange.Label>
        </TheCondition>
        <div className='the-input-range-bar-wrap'>
          <div
            className='the-input-range-bar'
            onClick={handleBarClick}
            ref={barElmRef}
          >
            <div className='the-input-range-bar-tap' />
            <div className='the-input-range-bar-bg' />
            <div
              className='the-input-range-bar-highlight'
              style={{ left: fromX, width: toX - fromX }}
            />
          </div>
          <TheInputRange.Handle
            elmRef={fromHandleElmRef}
            maxX={maxX}
            minX={minX}
            onMove={handleFromHandleMove}
            x={fromX}
          />
          <TheInputRange.Handle
            elmRef={toHandleElmRef}
            maxX={maxX}
            minX={minX}
            onMove={handleToHandleMove}
            x={toX}
          />
        </div>
        <TheCondition unless={barOnly}>
          <TheInputRange.Label>{max}</TheInputRange.Label>
        </TheCondition>
      </div>
    </div>
  )
})

TheInputRange.Handle = TheInputRangeHandle

TheInputRange.Label = TheInputRangeLabel

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
