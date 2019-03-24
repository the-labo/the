'use strict'

import { clone } from 'asobj'
import chopcal from 'chopcal'
import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheButton } from 'the-button'
import { eventHandlersFor, htmlAttributesFor } from 'the-component-util'
import { TheSpin } from 'the-spin'

const pointFromTouchEvent = (e) => {
  const [touch] = e.changedTouches || []
  if (!touch) {
    return null
  }
  const { clientX: x, clientY: y } = touch
  return { x, y }
}

const sourceElementScrollFor = (e) => {
  let target = e.target || e.srcElement
  let left = 0
  let top = 0
  while (target) {
    left += target.scrollLeft
    top += target.scrollTop
    target = target.parentElement
  }
  return { left, top }
}

/**
 * Tab for the-components
 */
class TheTab extends React.Component {
  static Button (props) {
    const { active, children, className, disableTouchAction, movingRate } = props
    const buttonProps = clone(props, { without: ['className', 'active'] })
    return (
      <TheButton {...buttonProps}
                 className={c('the-tab-button', className, {
                   'the-tab-button-active': active,
                 })}
      >
        {active && (
          <span className='the-tab-button-active-bar'
                style={active && { transform: !disableTouchAction ? `translateX(${movingRate * -100}%)` : 'none' }}
          />
        )}
        {children}
      </TheButton>
    )
  }

  static Content (props) {
    const { children, className, spinning } = props
    return (
      <div {...htmlAttributesFor(props, { except: ['className', 'spinning'] })}
           {...eventHandlersFor(props, { except: [] })}
           className={c('the-tab-content', className)}
      >
        {
          spinning && (
            <TheSpin className='the-tab-content-spin'
                     cover
                     enabled
            />
          )
        }

        {children}
      </div>
    )
  }

  constructor (props) {
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
      'touchend': this.handleTouchEnd.bind(this),
      'touchmove': this.handleTouchMove.bind(this),
      'touchstart': this.handleTouchStart.bind(this),
    }
  }

  componentDidMount () {
    const inner = this.innerRef.current
    this.resize(this.props.activeIndex)
    this.resizeTimer = setInterval(() => this.resize(this.state.nextIndex), 300)

    if (!this.props.disableTouchAction) {
      for (const [event, handler] of Object.entries(this.touchHandlers)) {
        inner && inner.addEventListener(event, handler)
      }
    }
  }

  componentDidUpdate (prevProps) {
    const { props } = this
    const nextIndex = props.activeIndex
    const updateNextIndex = (nextIndex === null) || (prevProps.activeIndex !== nextIndex)
    if (updateNextIndex) {
      if (this.state.nextIndex !== nextIndex) {
        this.setState({ nextIndex })
      }
      this.resize(nextIndex)
    }
  }

  componentWillUnmount () {
    clearInterval(this.resizeTimer)
    clearTimeout(this.movingTimer)
    const inner = this.innerRef.current

    for (const [event, handler] of Object.entries(this.touchHandlers)) {
      inner && inner.removeEventListener(event, handler)
    }
  }

  getBounds () {
    const { activeIndex, buttons } = this.props
    const bounds = { bottom: 0, top: 0 }
    if (activeIndex === 0) {
      bounds.right = 20
    }
    if (activeIndex === buttons.length - 1) {
      bounds.left = -20
    }
    return bounds
  }

  handleTouchEnd (e) {
    const body = this.bodyRef.current
    if (!body) {
      return
    }
    const { translateX } = this.state
    const amount = this.movingAmountFor(translateX)
    const { activeIndex, onChange } = this.props
    const toLeft = amount < 0
    if (toLeft) {
      this.moveTo(body.offsetWidth, () =>
        onChange({ activeIndex: activeIndex - 1 })
      )
      return
    }
    const toRight = amount > 0
    if (toRight) {
      this.moveTo(body.offsetWidth * -1, () =>
        onChange({ activeIndex: activeIndex + 1 })
      )
      return
    }
    this.moveTo(0)
    this.touchPoint = null
    this.touchedScroll = null
  }

  handleTouchMove (e) {
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
    let isHorizontal = avy < 20 && avy < avx
    if (isHorizontal) {
      const { activeIndex } = this.props
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

  handleTouchStart (e) {
    const header = this.headerRef.current
    this.touchedScroll = sourceElementScrollFor(e)
    this.touchPoint = pointFromTouchEvent(e)
    this.touchMoveCount = 0
    clearTimeout(this.movingTimer)
    this.setState({
      animating: false,
      nextIndex: this.props.activeIndex,
    })
    this.buttons = [
      ...header.querySelectorAll('.the-tab-button')
    ]
  }

  moveTo (x, callback) {
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

  movingAmountFor (x) {
    const body = this.bodyRef.current
    if (!body) {
      return
    }
    const threshold = Math.min(80, body.offsetWidth / 2)
    const { activeIndex, buttons } = this.props
    const count = buttons.length
    const toLeft = (threshold < x) && (0 < activeIndex)
    if (toLeft) {
      return -1
    }
    const toRight = x < (threshold * -1) && (activeIndex < count - 1)
    if (toRight) {
      return 1
    }
    return 0
  }

  movingRateFor (x) {
    const body = this.bodyRef.current
    if (!body) {
      return
    }
    return chopcal.floor(x / body.offsetWidth, 0.001)
  }

  render () {
    const { body, props, state } = this
    const {
      animating,
      bodyHeight,
      movingRate,
      nextIndex,
      translateX,
    } = state
    const {
      activeIndex,
      buttons,
      children,
      className,
      disableTouchAction,
      onChange,
    } = props
    const count = buttons.length
    return (
      <div {...htmlAttributesFor(props, { except: ['className'] })}
           {...eventHandlersFor(props, { except: [] })}
           className={c('the-tab', className)}
      >
        <div className='the-tab-header'
             ref={this.headerRef}
             role='tablist'>
          {
            buttons.map((text, i) => (
              <TheTab.Button active={nextIndex === i}
                             key={i}
                             movingRate={activeIndex === i ? movingRate : 0}
                             onClick={() => onChange({ activeIndex: i })}
                             role='tab'
              >{text}</TheTab.Button>
            ))
          }
        </div>
        <div className='the-tab-body'
             ref={this.bodyRef}
             style={{ height: bodyHeight }}
        >
          <div className={c('the-tab-body-inner', {
            'the-tab-body-inner-animating': animating,
          })}
               ref={this.innerRef}
               style={{
                 left: `${activeIndex * -100}%`,
                 transform: !disableTouchAction ? `translateX(${translateX}px)` : 'none',
                 width: `${count * 100}%`,
               }}

          >
            {
              React.Children.map(children, (child, i) => (
                <div className={c('the-tab-content-wrap', {
                  'the-tab-content-wrap-active': i === activeIndex,
                })}
                     key={i}
                     ref={(contentWrap) => {this.contentWraps[i] = contentWrap}}
                     role='tabpanel'
                     style={{ width: `${Number(100 / count).toFixed(2)}%` }}
                >
                  {this.shouldRenderChildForIndex(i) ? child : null}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }

  resize (activeIndex) {
    const contentWrap = this.contentWraps[activeIndex]
    const bodyHeight = contentWrap && contentWrap.offsetHeight
    const needsUpdateState = bodyHeight && (bodyHeight !== this.state.bodyHeight)
    if (needsUpdateState) {
      this.setState({ bodyHeight })
    }
  }

  scrollHeader (amount) {
    if (this.headerScrolling) {
      return
    }
    this.headerScrolling = true
    setTimeout(() => {
      this.header.scrollLeft += amount
      this.headerScrolling = false
    }, 10)
  }

  shouldRenderChildForIndex (index) {
    return this.state.nextIndex === index || this.props.activeIndex === index
  }
}

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
