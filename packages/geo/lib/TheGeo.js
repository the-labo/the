/**
 * @memberOf module:@the-/geo
 * @class TheGeo
 * @param {Object} [options={}] - Optional settings
 */
'use strict'

const { purge, restore, save } = require('bstorage')
const { get } = require('@the-/window')

/** @lends module:@the-/geo.TheGeo */
class TheGeo {
  constructor(options = {}) {
    const {
      cacheDuration = 5 * 60 * 1000,
      cacheKey = 'the:geo:cache',
      enableHighAccuracy = false,
      maximumAge = 3 * 1000,
      timeout = 15 * 1000,
    } = options
    this.cacheKey = cacheKey
    this.cacheDuration = cacheDuration
    this.enableHighAccuracy = enableHighAccuracy
    this.maximumAge = maximumAge
    this.timeout = timeout
  }

  delCache() {
    purge(this.cacheKey)
  }

  getCache() {
    const cached = restore(this.cacheKey)
    const valid =
      !!cached && cached._at + this.cacheDuration > new Date().getTime()
    if (valid) {
      const { _at, ...data } = cached
      return data
    }

    return null
  }

  isSupported() {
    const geolocation = get('navigator.geolocation')
    return !!geolocation
  }

  setCache(data) {
    save(this.cacheKey, { ...data, _at: new Date().getTime() })
  }

  /**
   * Watch position change
   * @param {Function} callback
   * @param {Object} [options] - Optional settings
   */
  watch(callback, options = {}) {
    const { enableHighAccuracy, maximumAge, timeout } = this
    const geolocation = get('navigator.geolocation')
    const watchId = geolocation.watchPosition(
      ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords
        const data = { lat, lng }
        this.setCache(data)
        callback(data)
      },
      (err) => {
        console.warn(`[TheGeo] Failed to watch `, err)
      },
      {
        enableHighAccuracy,
        maximumAge,
        timeout,
      },
    )
    const unwatch = () => geolocation.clearWatch(watchId)
    return unwatch
  }

  /**
   * Detect current geo location
   * @param {Object} options - Optional settings
   * @returns {Promise<*>}
   */
  async detect(options = {}) {
    const { force = false } = options
    const cached = this.getCache()
    if (cached && !force) {
      return { ...cached }
    }
    const fromGeolocation = await this.detectFromGeolocation()
    if (!fromGeolocation) {
      return null
    }
    const { latitude: lat, longitude: lng } = fromGeolocation
    const data = { lat, lng }
    this.setCache(data)
    return data
  }

  async detectFromGeolocation() {
    const { enableHighAccuracy, maximumAge, timeout } = this
    const geolocation = get('navigator.geolocation')
    if (!geolocation) {
      return null
    }
    return new Promise((resolve, reject) => {
      geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy,
        maximumAge,
        timeout,
      })
    }).then((result) => result.coords)
  }
}

module.exports = TheGeo
