'use strict'

import chopcal from 'chopcal'
import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import pointFromTouchEvent from './helpers/pointFromTouchEvent'
import sourceElementScrollFor from './helpers/sourceElementScrollFor'
import TheTabButton from './TheTabButton'
import TheTabContent from './TheTabContent'

/**
 * Tab for the-components
 */
class TheTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animating: false,
      bodyHeight: 'auto',
      movingRate: 0,
      nextIndex: props.activeIndex || 0,
      translateX: 0,
    }
    this.header = null
    this.headerRef = React.createRef()
    this.bodyRef = React.createRef()
    this.buttons = {}
    this.contentWraps = []
    this.movingTimer = -1
    this.resizeTimer = -1
    this.touchedScroll = null
    this.innerRef = React.createRef()
    this.touchPoint = null
    this.touchMoveCount = 0
    this.touchHandlers = {
      touchend: this.handleTouchEnd.bind(this),
      touchmove: this.handleTouchMove.bind(this),
      touchstart: this.handleTouchStart.bind(this),
    }
  }

  componentDidMount() {
    const {
      innerRef: { current: inner },
    } = this
    this.resize(this.props.activeIndex)
    this.resizeTimer = setInterval(() => this.resize(this.state.nextIndex), 300)

    if (!this.props.disableTouchAction) {
      for (const [event, handler] of Object.entries(this.touchHandlers)) {
        inner && inner.addEventListener(event, handler)
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {
      props: { activeIndex: nextIndex },
    } = this

    const updateNextIndex =
      nextIndex === null || prevProps.activeIndex !== nextIndex
    if (updateNextIndex) {
      if (this.state.nextIndex !== nextIndex) {
        this.setState({ nextIndex })
      }

      this.resize(nextIndex)
    }
  }

  componentWillUnmount() {
    clearInterval(this.resizeTimer)
    clearTimeout(this.movingTimer)
    const {
      innerRef: { current: inner },
    } = this

    for (const [event, handler] of Object.entries(this.touchHandlers)) {
      inner && inner.removeEventListener(event, handler)
    }
  }

  getBounds() {
    const {
      props: { activeIndex, buttons },
    } = this
    const bounds = { bottom: 0, top: 0 }
    if (activeIndex === 0) {
      bounds.right = 20
    }

    if (activeIndex === buttons.length - 1) {
      bounds.left = -20
    }

    return bounds
  }

  handleTouchEnd(e) {
    const {
      bodyRef: { current: body },
    } = this
    if (!body) {
      return
    }

    const {
      props: { activeIndex, onChange },
      state: { translateX },
    } = this
    const amount = this.movingAmountFor(translateX)

    const toLeft = amount < 0
    if (toLeft) {
      this.moveTo(body.offsetWidth, () =>
        onChange({ activeIndex: activeIndex - 1 }),
      )
      return
    }

    const toRight = amount > 0
    if (toRight) {
      this.moveTo(body.offsetWidth * -1, () =>
        onChange({ activeIndex: activeIndex + 1 }),
      )
      return
    }

    this.moveTo(0)
    this.touchPoint = null
    this.touchedScroll = null
  }

  handleTouchMove(e) {
    if (!this.touchedScroll) {
      return
    }

    const touchedScroll = sourceElementScrollFor(e)
    const scrolled = this.touchedScroll.left !== touchedScroll.left
    if (scrolled) {
      return
    }

    this.touchedScroll = touchedScroll
    const isFirstMove = this.touchMoveCount === 0
    this.touchMoveCount++
    if (isFirstMove) {
      return
    }

    const point = pointFromTouchEvent(e)
    if (!this.touchPoint) {
      this.touchPoint = point
      return
    }

    const vx = point.x - this.touchPoint.x
    const vy = point.y - this.touchPoint.y
    const avy = Math.abs(vy)
    const avx = Math.abs(vx)
    const isHorizontal = avy < 20 && avy < avx
    if (isHorizontal) {
      const {
        props: { activeIndex },
      } = this
      const translateX = this.state.translateX + vx
      this.setState({ translateX })

      const amount = this.movingAmountFor(translateX)
      const nextIndex = activeIndex + amount

      if (this.state.nextIndex !== nextIndex) {
        this.resize(nextIndex)
        this.setState({ nextIndex })
      }

      const movingRate = this.movingRateFor(translateX)
      if (this.state.movingRate !== movingRate) {
        this.setState({ movingRate })
      }
    }

    this.touchPoint = point
  }

  handleTouchStart(e) {
    const {
      headerRef: { current: header },
    } = this
    this.touchedScroll = sourceElementScrollFor(e)
    this.touchPoint = pointFromTouchEvent(e)
    this.touchMoveCount = 0
    clearTimeout(this.movingTimer)
    this.setState({
      animating: false,
      nextIndex: this.props.activeIndex,
    })
    this.buttons = [...header.querySelectorAll('.the-tab-button')]
  }

  moveTo(x, callback) {
    this.setState({ animating: true })
    clearTimeout(this.movingTimer)
    this.setState({
      movingRate: 0,
      translateX: x,
    })
    this.movingTimer = setTimeout(() => {
      this.setState({
        animating: false,
        translateX: 0,
      })
      callback && callback()
    }, 300)
  }

  movingAmountFor(x) {
    const {
      bodyRef: { current: body },
    } = this
    if (!body) {
      return
    }

    const threshold = Math.min(80, body.offsetWidth / 2)
    const {
      props: {
        activeIndex,
        buttons: { length: count },
      },
    } = this

    const toLeft = threshold < x && activeIndex > 0
    if (toLeft) {
      return -1
    }

    const toRight = x < threshold * -1 && activeIndex < count - 1
    if (toRight) {
      return 1
    }

    return 0
  }

  movingRateFor(x) {
    const {
      bodyRef: { current: body },
    } = this
    if (!body) {
      return
    }

    return chopcal.floor(x / body.offsetWidth, 0.001)
  }

  render() {
    const {
      props,
      props: {
        activeIndex,
        buttons,
        buttons: { length: count },
        children,
        className,
        disableTouchAction,
        onChange,
      },
      state: { animating, bodyHeight, movingRate, nextIndex, translateX },
    } = this

    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-tab', className)}
      >
        <div className='the-tab-header' ref={this.headerRef} role='tablist'>
          {buttons.map((text, i) => (
            <TheTab.Button
              active={nextIndex === i}
              key={i}
              movingRate={activeIndex === i ? movingRate : 0}
              onClick={() => onChange({ activeIndex: i })}
              role='tab'
            >
              {text}
            </TheTab.Button>
          ))}
        </div>
        <div
          className='the-tab-body'
          ref={this.bodyRef}
          style={{ height: bodyHeight }}
        >
          <div
            className={c('the-tab-body-inner', {
              'the-tab-body-inner-animating': animating,
            })}
            ref={this.innerRef}
            style={{
              left: `${activeIndex * -100}%`,
              transform: !disableTouchAction
                ? `translateX(${translateX}px)`
                : 'none',
              width: `${count * 100}%`,
            }}
          >
            {React.Children.map(children, (child, i) => (
              <div
                className={c('the-tab-content-wrap', {
                  'the-tab-content-wrap-active': i === activeIndex,
                })}
                key={i}
                ref={(contentWrap) => {
                  this.contentWraps[i] = contentWrap
                }}
                role='tabpanel'
                style={{ width: `${Number(100 / count).toFixed(2)}%` }}
              >
                {this.shouldRenderChildForIndex(i) ? child : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  resize(activeIndex) {
    const contentWrap = this.contentWraps[activeIndex]
    const bodyHeight = contentWrap && contentWrap.offsetHeight
    const needsUpdateState = bodyHeight && bodyHeight !== this.state.bodyHeight
    if (needsUpdateState) {
      this.setState({ bodyHeight })
    }
  }

  scrollHeader(amount) {
    if (this.headerScrolling) {
      return
    }

    this.headerScrolling = true
    setTimeout(() => {
      this.header.scrollLeft += amount
      this.headerScrolling = false
    }, 10)
  }

  shouldRenderChildForIndex(index) {
    return this.state.nextIndex === index || this.props.activeIndex === index
  }
}

TheTab.Button = TheTabButton
TheTab.Content = TheTabContent

TheTab.propTypes = {
  /** Active tab index */
  activeIndex: PropTypes.number.isRequired,
  /** Tab buttons */
  buttons: PropTypes.arrayOf(PropTypes.node),
  /** Disable touch action */
  disableTouchAction: PropTypes.bool,
  /** Change handler */
  onChange: PropTypes.func,
}

TheTab.defaultProps = {
  activeIndex: 0,
  buttons: [],
  disableTouchAction: false,
  onChange: () => {},
}

TheTab.displayName = 'TheTab'

export default TheTab
