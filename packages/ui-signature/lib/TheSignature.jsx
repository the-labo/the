'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import SignaturePad from 'signature_pad'
import {
  changedProps,
  eventHandlersFor,
  htmlAttributesFor,
} from '@the-/util-ui'
import { get } from '@the-/window'

/**
 * Signature pad of the-components
 */
class TheSignature extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.pad = null
    this.handleBegin = this.handleBegin.bind(this)
    this.handleEnd = this.handleEnd.bind(this)
  }

  applyValue(value) {
    const { pad } = this
    if (!pad) {
      return null
    }
    pad.fromDataURL(value)
  }

  componentDidMount() {
    const canvas = this.canvasRef.current
    this.pad = new SignaturePad(canvas, {
      onBegin: this.handleBegin,
      onEnd: this.handleEnd,
    })
    this.resize = this.resize.bind(this)
    this.syncPad()
    this.pad.on()

    const window = get('window')
    window.addEventListener('resize', this.resize)

    this.resize()

    const { onPad } = this.props
    onPad && onPad(this.pad)
  }

  componentDidUpdate(prevProps) {
    const diff = changedProps(prevProps, this.props)

    const needsSyncPad = ['color'].some((k) => k in diff)
    if (needsSyncPad) {
      this.syncPad()
    }

    if ('value' in diff) {
      this.applyValue(diff.value)
    }
  }

  componentWillUnmount() {
    this.pad.off()
    this.pad = null

    const window = get('window')
    window.removeEventListener('resize', this.resize)
  }

  handleBegin() {
    const { pad } = this
    const { onBegin } = this.props
    onBegin && onBegin({ pad })
  }

  handleEnd() {
    const { pad } = this
    const { onEnd } = this.props
    onEnd && onEnd({ pad })
  }

  render() {
    const { props } = this
    const { children, className, height, width } = props
    return (
      <div
        {...htmlAttributesFor(props, {
          except: ['className', 'width', 'height'],
        })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-signature', className)}
      >
        <canvas
          className='the-signature-canvas'
          ref={this.canvasRef}
          style={{ height, width }}
        />
        {children}
      </div>
    )
  }

  resize() {
    const canvas = this.canvasRef.current
    const { pad } = this
    const skip = !canvas || !pad
    if (skip) {
      return
    }
    const value = pad.toDataURL()
    const devicePixelRatio = get('window.devicePixelRatio') || 1
    const ratio = Math.max(devicePixelRatio, 1)
    canvas.width = canvas.offsetWidth * ratio
    canvas.height = canvas.offsetHeight * ratio
    const ctx = canvas.getContext('2d')
    canvas.dataset.scaleRatio = ratio
    ctx.scale(ratio, ratio)

    this.applyValue(value)
  }

  syncPad() {
    const { pad } = this
    if (!pad) {
      return
    }
    const { color } = this.props
    pad.penColor = color
  }
}

TheSignature.propTypes = {
  color: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

TheSignature.defaultProps = {
  color: '#555',
  height: '150px',
  onBegin: () => null,
  onEnd: () => null,
  onPad: () => null,
  width: '100%',
}

TheSignature.displayName = 'TheSignature'

export default TheSignature
