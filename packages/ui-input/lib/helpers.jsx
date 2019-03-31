/**
 * @module helpers
 */
'use strict'

import path from 'path'
import React from 'react'
import url from 'url'
import videoExtensions from 'video-extensions'

const { parse: parseUrl } = url

export const normalizeOptions = (options) =>
  []
    .concat(options)
    .filter(Boolean)
    .reduce((normalized, value) => {
      const isObject = typeof value === 'object'
      return Object.assign(normalized, isObject ? value : { [value]: value })
    }, {})

export function normalizeArrayValue(values, splitter = ',') {
  return []
    .concat(values)
    .filter(Boolean)
    .reduce((normzlied, value) => {
      if (typeof value === 'string') {
        return normzlied.concat(value.split(splitter))
      }
      return normzlied.concat(value)
    }, [])
}

export function renderErrorMessage(error) {
  if (!error) {
    return <span className='the-input-message the-input-message-empty' />
  }
  if (typeof error === 'string') {
    error = { message: error }
  }
  return (
    <span className='the-input-message the-input-error-message'>
      {error.message}
    </span>
  )
}

export function renderWarningMessage(warning) {
  if (!warning) {
    return <span className='the-input-message the-input-message-empty' />
  }
  if (typeof warning === 'string') {
    warning = { message: warning }
  }
  return (
    <span className='the-input-message the-input-warn-message'>
      {warning.message}
    </span>
  )
}

export function isImageUrl(src) {
  if (/^data:image/.test(src)) {
    return true
  }
  const imageExtensions = ['.jpg', '.jpeg', '.svg', '.gif', '.png']
  const extname = path.extname(parseUrl(src).pathname)
  if (!extname) {
    return false
  }
  return imageExtensions.includes(extname)
}

export function isVideoUrl(src) {
  if (/^data:video/.test(src)) {
    return true
  }
  const extname = path.extname(parseUrl(src).pathname)
  if (!extname) {
    return false
  }
  return videoExtensions.includes(extname.replace(/^\./, ''))
}

export function isUnknownTypeUrl(src) {
  if (/^data:/.test(src)) {
    return false
  }
  const extname = path.extname(parseUrl(src).pathname)
  return !extname
}

export function onOffBoolean(v) {
  if (typeof v === 'boolean') {
    return v ? 'on' : 'off'
  }
  return v
}

export default {
  isImageUrl,
  isUnknownTypeUrl,
  isVideoUrl,
  normalizeArrayValue,
  normalizeOptions,
  onOffBoolean,
  renderErrorMessage,
  renderWarningMessage,
}
