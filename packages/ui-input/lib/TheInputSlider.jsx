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
import TheInputSliderHandle from './partials/TheInputSliderHandle'
import TheInputSliderLabel from './partials/TheInputSliderLabel'

/**
 * Slider Input
 */
const TheInputSlider = React.memo((props) => {
  const {
    barOnly,
    className,
    error,
    max,
    min,
    name,
    onUpdate,
    step,
    value,
  } = props
  const [maxX, setMaxX] = useState(0)
  const [minX, setMinX] = useState(0)
  const [x, setX] = useState(0)
  const elmRef = useRef(null)
  const barElmRef = useRef(null)
  const handleElmRef = useRef(null)

  const _rateWithValue = useCallback(
    (value) => {
      value = rangecal.round(min, max, value)
      return chopcal.round(rangecal.rate(min, max, value), 0.01)
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
      const choppedValue = chopcal.round(rangecal.value(min, max, rate), 0.01)
      return rangecal.round(min, max, choppedValue)
    },
    [min, max],
  )

  useEffect(() => {
    const { window } = get('window')
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const getHandleRadius = useCallback(() => {
    const { current: handleElm } = handleElmRef
    if (!handleElm) {
      return 0
    }

    return handleElm.offsetWidth / 2
  }, [])

  const setSliderValue = useCallback(
    (newValue) => {
      const rate = _rateWithValue(newValue)
      setX(rangecal.value(minX, maxX, rate))

      newValue = chopcal.round(newValue, step)

      const duplicate = props.value === newValue
      if (duplicate) {
        return
      }

      if (onUpdate) {
        onUpdate({ [name]: newValue })
      }
    },
    [step, name, onUpdate, props.value, minX, maxX, _rateWithValue],
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
      setX(x)
      const rate = _rateWithX(x)
      const value = _valueWithRate(rate)
      setSliderValue(value)
    },
    [getHandleRadius, setSliderValue, _rateWithX, _valueWithRate],
  )

  const handleHandleMove = useCallback(
    ({ x }) => {
      const rate = _rateWithX(x)
      const value = _valueWithRate(rate)
      setSliderValue(value)
    },
    [setSliderValue],
  )

  const handleResize = useCallback(() => {
    const { current: barElm } = barElmRef
    if (!barElm) {
      return
    }

    const { offsetWidth: w } = barElm
    const handleRadius = getHandleRadius()
    const newMinX = 0 - handleRadius
    const newMaxX = w - handleRadius
    const rate = _rateWithValue(props.value)
    setMaxX(newMaxX)
    setMinX(newMinX)
    setX(rangecal.value(newMinX, newMaxX, rate))
  }, [props.value])

  return (
    <div
      {...htmlAttributesFor(props, {
        except: ['id', 'className', 'type', 'value', 'name', 'placeholder'],
      })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-input-slider', className, {
        'the-input-error': !!error,
      })}
      data-value={value}
      ref={elmRef}
    >
      {renderErrorMessage(error)}
      <input name={name} onChange={() => {}} type='hidden' value={value} />
      <div className='the-input-slider-inner'>
        <TheCondition unless={barOnly}>
          <TheInputSlider.Label>{min}</TheInputSlider.Label>
        </TheCondition>
        <div className='the-input-slider-bar-wrap'>
          <div
            className='the-input-slider-bar'
            onClick={handleBarClick}
            ref={barElmRef}
          >
            <div className='the-input-slider-bar-tap' />
            <div className='the-input-slider-bar-bg' />
            <div
              className='the-input-slider-bar-highlight'
              style={{ left: 0, width: x }}
            />
          </div>
          <TheInputSlider.Handle
            elmRef={handleElmRef}
            maxX={maxX}
            minX={minX}
            onMove={handleHandleMove}
            x={x}
          />
        </div>
        <TheCondition unless={barOnly}>
          <TheInputSlider.Label>{max}</TheInputSlider.Label>
        </TheCondition>
      </div>
    </div>
  )
})

TheInputSlider.Handle = TheInputSliderHandle
TheInputSlider.Label = TheInputSliderLabel

TheInputSlider.propTypes = {
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
  value: PropTypes.number,
}

TheInputSlider.defaultProps = {
  barOnly: false,
  error: null,
  max: 100,
  min: 0,
  step: 0.1,
  value: 0,
}

TheInputSlider.displayName = 'TheInputSlider'

export default TheInputSlider
