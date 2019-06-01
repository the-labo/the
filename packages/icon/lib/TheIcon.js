/**
 * @memberof module:@the-/icon
 * @class TheIcon
 */
'use strict'

const { createCanvas, registerFont } = require('canvas')
const applier = require('./helpers/applier')
const drawer = require('./helpers/drawer')
const writer = require('./helpers/writer')

/** @lends module:@the-/icon.TheIcon */
class TheIcon {
  constructor(config = {}) {
    const {
      color,
      font: fontFile,
      height = 512,
      text,
      theme,
      width = 512,
    } = config
    this.canvas = createCanvas(width, height)
    const font = this.registerFont(fontFile)
    if (theme) {
      this.applyTheme(theme, { color, font, text })
    }
  }

  get height() {
    return this.canvas.height
  }

  get width() {
    return this.canvas.width
  }

  applyTheme(theme, { color, font, text }) {
    const apply = applier[theme]
    if (!apply) {
      throw new Error(`[TheIcon] Unknown theme: ${theme}`)
    }
    apply(this, { color, font, text })
  }

  registerFont(filename) {
    if (!filename) {
      return
    }
    const name = `font-${new Date().getTime()}`
    registerFont(filename, { family: name })
    return name
  }

  setBackground(options = {}) {
    const { borderRadius = 0, color, margin = 4 } = options
    const { canvas } = this
    drawer.drawRect(canvas, {
      cx: canvas.width / 2,
      cy: canvas.height / 2,
      fill: color,
      lineWidth: margin,
      r: borderRadius,
    })
  }

  setBorder(options = {}) {
    const { borderRadius = 0, color, width = 4 } = options
    const { canvas } = this
    drawer.drawRect(canvas, {
      cx: canvas.width / 2,
      cy: canvas.height / 2,
      lineWidth: width,
      r: borderRadius,
      stroke: color,
    })
  }

  setText(text, options = {}) {
    const { color = '#555', font = 'Comic Sans' } = options
    const { canvas } = this
    drawer.drawText(canvas, {
      color,
      cx: canvas.width / 2,
      cy: canvas.height / 2,
      fontFamily: font,
      text,
    })
  }

  toStream() {
    const { canvas } = this
    return canvas.createPNGStream()
  }
  /**
   * Save as file
   * @param {string} filename
   * @returns {Promise<undefined>}
   */
  async saveAs(filename) {
    const stream = this.toStream()
    await writer.writerStream(filename, stream)
  }
}

module.exports = TheIcon
