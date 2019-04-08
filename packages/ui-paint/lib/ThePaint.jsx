'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import {
  changedProps,
  eventHandlersFor,
  htmlAttributesFor,
} from '@the-/util-ui'
import { get } from '@the-/window'
import DrawingMethods from './constants/DrawingMethods'
import Drawer from './helpers/Drawer'
import ThePaintStyle from './ThePaintStyle'

/**
 * Hand write painting
 */
class ThePaint extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.tmpCanvasRef = React.createRef()
    this.handleDrawStart = this.handleDrawStart.bind(this)
    this.handleDraw = this.handleDraw.bind(this)
    this.handleDrawEnd = this.handleDrawEnd.bind(this)
    this.drawer = null
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    const canvas = this.canvasRef.current
    const tmpCanvas = this.tmpCanvasRef.current
    const drawer = new Drawer(canvas, tmpCanvas, {})
    const { background, onDrawer } = this.props
    if (background) {
      void drawer.registerBackground(background)
    }

    this.drawer = drawer
    onDrawer && onDrawer(drawer)
    this.updateDrawer()

    const window = get('window')
    window.addEventListener('resize', this.handleResize)
  }

  componentDidUpdate(prevProps) {
    this.updateDrawer()
    const { drawer } = this
    {
      const diff = changedProps(prevProps, this.props)
      if ('background' in diff) {
        const { background } = this.props
        void drawer.registerBackground(background)
      }
    }
  }

  componentWillUnmount() {
    const window = get('window')
    window.removeEventListener('resize', this.handleResize)
  }

  handleDraw(e) {
    const { drawer } = this
    if (!drawer.active) {
      return
    }
    const pos = this.positionForEvent(e)
    drawer.draw(pos)
    const { onDraw } = this.props
    onDraw && onDraw({ drawer, pos })
  }

  handleDrawEnd() {
    const { drawer } = this
    if (!drawer.active) {
      return
    }
    drawer.end()
    const snapshot = drawer.snapshot()
    const { onDrawEnd } = this.props
    onDrawEnd && onDrawEnd({ drawer, pos, snapshot })
  }

  handleDrawStart(e) {
    const { drawer } = this
    if (drawer.active) {
      return
    }
    const snapshot = drawer.snapshot()
    const pos = this.positionForEvent(e)
    drawer.start(pos)
    const { onDrawStart } = this.props
    onDrawStart && onDrawStart({ drawer, pos, snapshot })
  }

  handleResize() {
    const { drawer } = this
    drawer && drawer.resize()
  }

  positionForEvent(e) {
    const canvas = this.canvasRef.current
    if (!canvas) {
      return null
    }
    const { left, top } = canvas.getBoundingClientRect()
    const touch = e.touches ? e.touches[0] : e
    if (!touch) {
      return null
    }
    const { clientX, clientY } = touch
    return { x: clientX - left, y: clientY - top }
  }

  render() {
    const { handleDraw, handleDrawEnd, handleDrawStart, props } = this
    const { children, className, height, style, width } = props
    return (
      <div
        {...htmlAttributesFor(props, {
          except: ['className', 'width', 'height', 'style'],
        })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-paint', className)}
        style={{ ...(style || {}), height, width }}
      >
        {children}
        <div
          className='the-paint-canvas-container'
          onMouseDown={handleDrawStart}
          onMouseLeave={handleDrawEnd}
          onMouseMove={handleDraw}
          onMouseUp={handleDrawEnd}
          onTouchCancel={handleDrawEnd}
          onTouchEnd={handleDrawEnd}
          onTouchMove={handleDraw}
          onTouchStart={handleDrawStart}
        >
          <canvas
            className='the-paint-canvas'
            ref={this.canvasRef}
            style={{ height, width }}
          />
          <canvas
            className='the-paint-tmp-canvas'
            ref={this.tmpCanvasRef}
            style={{ height, width }}
          />
        </div>
      </div>
    )
  }

  updateDrawer() {
    const { lineColor, lineWidth, method } = this.props
    const { drawer } = this
    if (!drawer) {
      return
    }
    drawer.lineColor = lineColor
    drawer.lineWidth = lineWidth
    drawer.method = method
  }
}

ThePaint.Style = ThePaintStyle

ThePaint.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Method of drawing */
  method: PropTypes.oneOf(Object.values(DrawingMethods)),
  onDraw: PropTypes.func,
  onDrawEnd: PropTypes.func,
  /** Get drawer ref */
  onDrawer: PropTypes.func,
  onDrawStart: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

ThePaint.defaultProps = {
  flushed: null,
  height: 150,
  lineColor: '#555',
  lineWidth: 4,
  method: DrawingMethods.FREE,
  onDrawer: null,
  width: 150,
}

ThePaint.displayName = 'ThePaint'

export default ThePaint
