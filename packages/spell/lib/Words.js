/**
 * Pre defined words
 * @memberof module:@the-/spell
 * @member Array
 * @type {Array<string>}
 */
'use strict'

const CssColorKeywords = require('css-color-keywords')
const imageExtensions = require('image-extensions')
const os = require('os')
const path = require('path')
const reserved = require('reserved')
const textExtensions = require('text-extensions')
const videoExtensions = require('video-extensions')
const { get } = require('@the-/window')

module.exports = [
  ...reserved,
  ...Object.keys(CssColorKeywords),
  ...Object.keys(os),
  ...Object.keys(path),
  ...videoExtensions,
  ...textExtensions,
  ...imageExtensions,
  ...Object.keys(get('global') || {}),
  ...Object.keys(get('process.env') || {}),
  ...[
    'webpack',
    'nginx',
    'babel',
    'lebab',
    'sequelize',
    'axios',
    'react',
    'redis',
    'eslint',
  ],
  ...['pcss', 'js', 'jsx', 'css', 'html', 'git'],
  ...['ctrl', 'act', 'enc', 'dec', 'unref', 'asc', 'desc', 'ctx', 'pub', 'sub'],
].sort()
