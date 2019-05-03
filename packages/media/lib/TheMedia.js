/**
 * @memberof module:@the-/media
 * @class TheMedia
 * @param {Object} [options={}] - Optional settings
 * @param {Object|Boolean} [options.video] - Video constraint
 * @param {Object|Boolean} [options.audio] - Audio constraint
 */
'use strict'

const { get } = require('@the-/window')

/** @lends module:@the-/media.TheMedia */
class TheMedia {
  static async createMediaStream(constrains = {}) {
    const mediaDevices = get('navigator.mediaDevices')
    if (!mediaDevices) {
      return null
    }
    return mediaDevices.getUserMedia(constrains)
  }

  constructor(options = {}) {
    const { audio = true, video = true } = options
    this.stream = null
    this.constrains = { audio, video }
    this.running = false
  }

  get audioEnabled() {
    return this.getStreamTracks('audio').some((track) => track.enabled)
  }

  get videoEnabled() {
    return this.getStreamTracks('video').some((track) => track.enabled)
  }

  /**
   * Create audio media recorder with AudioContext
   * @param {window.AudioContext} audioContext
   * @param {Object} [options={}]
   * @returns {window.MediaRecorder}
   */
  createAudioRecorder(audioContext, options = {}) {
    const {
      audioBitsPerSecond,
      mimeType,
      processors = [],
      videoBitsPerSecond,
    } = options
    const MediaRecorder = get('MediaRecorder')
    const source = audioContext.createMediaStreamSource(this.stream)
    const destination = audioContext.createMediaStreamDestination()
    let connected = source
    for (const processor of processors) {
      connected = connected.connect(processor)
    }
    connected.connect(destination)
    return new MediaRecorder(destination.stream, {
      audioBitsPerSecond,
      mimeType,
      videoBitsPerSecond,
    })
  }

  /**
   * Get tracks
   * @param {string} kind
   * @returns {window.MediaStreamTrack[]}
   */
  getStreamTracks(kind) {
    if (!this.stream) {
      return []
    }
    const tracks = this.stream.getTracks()
    if (!kind) {
      return tracks
    }
    return tracks.filter((track) => track.kind === kind)
  }

  toggleAudioEnabled(enabled) {
    this.toggleEnabled('audio', enabled)
  }

  /**
   * Toggle track enabled
   * @param {string} kind
   * @param {boolean} enabled
   */
  toggleEnabled(kind, enabled) {
    const tracks = this.getStreamTracks(kind)
    for (const track of tracks) {
      track.enabled = enabled
    }
  }

  toggleVideoEnabled(enabled) {
    this.toggleEnabled('video', enabled)
  }

  /**
   * Bind HTML video element
   * @param {window.HTMLVideoElement} video
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<undefined>}
   */
  async bindVideo(video, options = {}) {
    if (!video) {
      return null
    }
    const { stream } = this
    await new Promise((resolve, reject) => {
      video.srcObject = stream
      video.onplay = () => resolve()
      video.onerror = (err) => reject(err)
    })
  }

  /**
   * Start user media
   * @returns {Promise<undefined>}
   */
  async start() {
    if (this.running) {
      throw new Error(`[TheMedia] Already running`)
    }
    const stream = await TheMedia.createMediaStream(this.constrains)
    if (!stream) {
      throw new Error(`[TheMedia] Failed to get user media stream`)
    }
    this.stream = stream
    this.running = true
  }

  async startIfNeeded() {
    if (this.running) {
      return
    }
    await this.start()
  }

  /**
   * Stop user media
   * @returns {Promise<undefined>}
   */
  async stop() {
    if (!this.running) {
      throw new Error(`[TheMedia] Not running`)
    }
    for (const track of this.stream.getTracks()) {
      await track.stop()
    }
    this.running = false
  }

  async stopIfNeeded() {
    if (!this.running) {
      return
    }
    await this.stop()
  }

  /**
   * Take photo image
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<window.Blob>} Blob
   */
  async takePhoto(options = {}) {
    const { height, width } = options
    const ImageCapture = get('ImageCapture', { strict: true })
    const { stream } = this
    const [track] = stream.getVideoTracks()
    const imageCapture = new ImageCapture(track)
    const { height: maxHeight, width: maxWidth } = track.getSettings()

    const blob = await imageCapture.takePhoto({
      imageHeight: height || maxHeight,
      imageWidth: width || maxWidth,
    })
    return blob
  }
}

module.exports = TheMedia
