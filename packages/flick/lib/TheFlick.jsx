'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import Draggable from 'react-draggable'
import { TheButton } from 'the-button'
import {
  changedProps,
  eventHandlersFor,
  htmlAttributesFor,
  toggleBodyClass,
} from 'the-component-util'
import { TheCondition } from 'the-condition'
import { TheIcon } from 'the-icon'
import { TheSpin } from 'the-spin'
import { get } from 'the-window'
import TheFlickImage from './TheFlickImage'

const toggleDocumentScroll = (enabled) =>
  toggleBodyClass('the-flick-fix', enabled)

/**
 * Flickable viewer of the-components
 */
class TheFlick extends React.Component {
  static FlipButton({ className, icon, onClick, style }) {
    return (
      <div className='the-flick-flip-button-wrap' {...{ style }}>
        <TheButton
          className={c('the-flick-flip-button', className)}
          {...{ icon, onClick }}
        />
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      animating: false,
      bodyWidth: null,
      draggingPosition: null,
      nextIndex: props.activeIndex || 0,
    }
    this.imageWraps = []
    this.movingTimer = -1
    this.handleClose = this.handleClose.bind(this)
    this.bodyRef = React.createRef()
    this.resize = this.resize.bind(this)
    this.changeToPrev = this.changeToPrev.bind(this)
    this.changeToNext = this.changeToNext.bind(this)

    this.handleDragDrag = this.handleDragDrag.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragStop = this.handleDragStop.bind(this)
  }

  changeIndexTo(nextIndex) {
    const { activeIndex, onChange } = this.props
    const body = this.bodyRef.current
    if (!body) {
      return
    }
    const amount = nextIndex - activeIndex
    this.moveTo(body.offsetWidth * amount * -1, () =>
      onChange({ activeIndex: nextIndex }),
    )
  }

  changeToNext() {
    const { activeIndex } = this.props
    this.changeIndexTo(activeIndex + 1)
  }

  changeToPrev() {
    const { activeIndex } = this.props
    this.changeIndexTo(activeIndex - 1)
  }

  componentDidMount() {
    const { props } = this
    toggleDocumentScroll(props.present)
    const window = get('window')
    window.addEventListener('resize', this.resize)

    this.resize()
  }

  componentDidUpdate(prevProps) {
    const { props } = this

    const diff = changedProps(prevProps, this.props)
    const shouldToggleScrollLock = 'present' in diff
    if (shouldToggleScrollLock) {
      toggleDocumentScroll(this.props.present)
      this.resize()
    }
    const shouldResize = ['images', 'activeIndex'].some((k) => k in diff)
    if (shouldResize) {
      this.resize()
    }
    const nextIndex = props.activeIndex
    const updateNextIndex =
      nextIndex === null || prevProps.activeIndex !== nextIndex
    if (updateNextIndex) {
      this.setState({ nextIndex })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.movingTimer)
    toggleDocumentScroll(false)
    const window = get('window')
    window.removeEventListener('resize', this.resize)
  }

  getBounds() {
    const { activeIndex, images } = this.props
    const bounds = { bottom: 0, top: 0 }
    if (activeIndex === 0) {
      bounds.right = 20
    }
    if (activeIndex === images.length - 1) {
      bounds.left = -20
    }
    return bounds
  }

  handleClose() {
    const { onClose } = this.props
    onClose && onClose()
  }

  handleDragDrag(e, data) {
    const body = this.bodyRef.current
    if (!body) {
      return
    }
    const { activeIndex } = this.props
    const { x } = data
    const amount = this.moveAmountFor(x)
    const nextIndex = activeIndex + amount
    if (this.state.nextIndex !== nextIndex) {
      this.setState({ nextIndex })
    }
  }

  handleDragStart(e) {
    clearTimeout(this.movingTimer)
    this.setState({
      animating: false,
      draggingPosition: null,
      nextIndex: this.props.activeIndex,
    })
  }

  handleDragStop(e, data) {
    const body = this.bodyRef.current
    if (!body) {
      return
    }
    const { x } = data
    const amount = this.moveAmountFor(x)
    const { activeIndex, onChange } = this.props
    const toLeft = amount < 0
    if (toLeft) {
      this.changeToPrev()
      return
    }
    const toRight = amount > 0
    if (toRight) {
      this.changeToNext()
      return
    }
    this.moveTo(0)
  }

  moveAmountFor(x) {
    const body = this.bodyRef.current
    const threshold = Math.min(80, body.offsetWidth / 2)
    const { activeIndex, images } = this.props
    const count = images.length
    const toLeft = threshold < x && 0 < activeIndex
    if (toLeft) {
      return -1
    }
    const toRight = x < threshold * -1 && activeIndex < count - 1
    if (toRight) {
      return 1
    }
    return 0
  }

  moveTo(x, callback) {
    this.setState({ animating: true })
    clearTimeout(this.movingTimer)
    this.setState({ draggingPosition: { x, y: 0 } })
    this.movingTimer = setTimeout(() => {
      this.setState({
        animating: false,
        draggingPosition: { x: 0, y: 0 },
      })
      callback && callback()
    }, 300)
  }

  render() {
    const { props, state } = this
    const { animating, bodyWidth, draggingPosition } = state
    const {
      activeIndex,
      children,
      className,
      images,
      present,
      spinning,
      title,
    } = props
    const count = images.length
    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-flick', className, {
          'the-flick-present': present,
        })}
      >
        <div className='the-flick-inner'>
          <div className='the-flick-back' onClick={this.handleClose}>
            <div className='the-flick-back-inner' />
          </div>
          <div className='the-flick-content'>
            <div className='the-flick-header'>
              <div className='the-flick-header-row' />
              <div className='the-flick-header-row'>
                <h5 className='the-flick-header-title'>
                  {title || `${activeIndex + 1} / ${count}`}
                </h5>
              </div>
              <div className='the-flick-header-row'>
                <a
                  className='the-flick-close-button'
                  onClick={this.handleClose}
                >
                  <TheIcon className={TheFlick.CLOSE_ICON} />
                </a>
              </div>
            </div>
            <div className='the-flick-body' ref={this.bodyRef}>
              <TheCondition if={spinning}>
                <TheSpin className='the-flick-spin' cover enabled={spinning} />
              </TheCondition>

              <TheCondition if={activeIndex > 0}>
                <TheFlick.FlipButton
                  icon={TheFlick.PREV_ICON}
                  onClick={this.changeToPrev}
                  style={{ left: '16px' }}
                />
              </TheCondition>
              <TheCondition if={activeIndex < count - 1}>
                <TheFlick.FlipButton
                  icon={TheFlick.NEXT_ICON}
                  onClick={this.changeToNext}
                  style={{ right: '16px' }}
                />
              </TheCondition>
              <Draggable
                axis='x'
                bounds={this.getBounds()}
                onDrag={this.handleDragDrag}
                onStart={this.handleDragStart}
                onStop={this.handleDragStop}
                position={draggingPosition}
              >
                <div
                  className={c('the-flick-image-body-inner', {
                    'the-flick-image-body-inner-animating': animating,
                  })}
                  style={{
                    left: `${activeIndex * -100}%`,
                    width: `${count * 100}%`,
                  }}
                >
                  {images
                    .map((props) =>
                      typeof props === 'string' ? { src: props } : props,
                    )
                    .map((props, i) => (
                      <div
                        className={c('the-flick-image-wrap', {
                          'the-flick-image-wrap-active': i === activeIndex,
                        })}
                        key={i}
                        ref={(imageWrap) => {
                          this.imageWraps[i] = imageWrap
                        }}
                        style={{ width: bodyWidth }}
                      >
                        <TheCondition if={Math.abs(activeIndex - i) < 2}>
                          <TheFlick.Image {...props} onLoad={this.resize} />
                        </TheCondition>
                      </div>
                    ))}
                </div>
              </Draggable>
              {children}
            </div>
            <div className='the-flick-footer' />
          </div>
        </div>
      </div>
    )
  }

  resize() {
    const body = this.bodyRef.current
    if (!body) {
      return
    }
    const bodyWidth = body.offsetWidth
    if (bodyWidth === 0) {
      return
    }
    if (this.state.bodyWidth !== bodyWidth) {
      this.setState({ bodyWidth })
    }
  }
}

TheFlick.Image = TheFlickImage
TheFlick.CLOSE_ICON = 'fas fa-times'
TheFlick.PREV_ICON = 'fas fa-chevron-left'
TheFlick.NEXT_ICON = 'fas fa-chevron-right'

TheFlick.propTypes = {
  /** Flick title */
  /** Active index of images */
  activeIndex: PropTypes.number,
  /** Images to flip */
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ).isRequired,
  /** Handle index change */
  onChange: PropTypes.func.isRequired,
  /** Close handler */
  onClose: PropTypes.func.isRequired,
  /** Shows the dialog */
  present: PropTypes.bool.isRequired,
  /** Show spin */
  spinning: PropTypes.bool,
  title: PropTypes.string,
}

TheFlick.defaultProps = {
  activeIndex: 0,
  images: [],
  onChange: () => {},
  onClose: () => {},
  present: false,
  spinning: false,
  title: null,
}

TheFlick.displayName = 'TheFlick'

export default TheFlick
