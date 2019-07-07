/**
 * Pre defined words
 * @memberof module:@the-/spell
 * @member Array
 * @type {Array<string>}
 */
'use strict'

const builtinModules = require('builtin-modules')
const CssColorKeywords = require('css-color-keywords')
const httpVerbs = require('http-verbs')
const imageExtensions = require('image-extensions')
const os = require('os')
const path = require('path')
const reserved = require('reserved')
const textExtensions = require('text-extensions')
const util = require('util')
const videoExtensions = require('video-extensions')
const { get } = require('@the-/window')

module.exports = [
  ...reserved,
  ...Object.keys(CssColorKeywords),
  ...Object.keys(httpVerbs).map((key) => key.toLowerCase()),
  ...Object.keys(os),
  ...Object.keys(path),
  ...Object.keys(util),
  ...videoExtensions,
  ...textExtensions,
  ...imageExtensions,
  ...builtinModules,
  ...Object.keys(get('global') || {}),
  ...Object.keys(get('process.env') || {}),
  ...[
    'aws',
    'axios',
    'babel',
    'eslint',
    'ffmpeg',
    'ffprobe',
    'jsdoc',
    'lebab',
    'nginx',
    'ngrok',
    'nodemon',
    'npx',
    'nuxt',
    'nuxtjs',
    'openresty',
    'ponfile',
    'postgrest',
    'rabbitmq',
    'react',
    'redis',
    'sequelize',
    'vue',
    'vuejs',
    'vuex',
    'webpack',
  ],
  ...['pcss', 'js', 'jsx', 'css', 'html', 'git'],
  ...[
    'act',
    'asc',
    'atob',
    'blob',
    'ctrl',
    'ctx',
    'dec',
    'desc',
    'dep',
    'deps',
    'dev',
    'dup',
    'enc',
    'func',
    'glob',
    'impl',
    'num',
    'pcm',
    'pkg',
    'pub',
    'prod',
    'regexp',
    'rpc',
    'sdk',
    'str',
    'sms',
    'sns',
    'stringify',
    'sub',
    'tst',
    'unref',
    'worklet',
  ],
].sort()
