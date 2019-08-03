/**
 * Pre defined words
 * @memberof module:@the-/spell
 * @member Array
 * @type {Array<string>}
 */
'use strict'

const binaryExtensions = require('binary-extensions')
const builtinModules = require('builtin-modules')
const compressedExtensions = require('compressed-extensions')
const CssColorKeywords = require('css-color-keywords')
const fontExtensions = require('font-extensions')
const httpVerbs = require('http-verbs')
const imageExtensions = require('image-extensions')
const os = require('os')
const path = require('path')
const reserved = require('reserved')
const textExtensions = require('text-extensions')
const util = require('util')
const videoExtensions = require('video-extensions')

module.exports = [
  ...reserved,
  ...Object.keys(CssColorKeywords),
  ...Object.keys(httpVerbs).map((key) => key.toLowerCase()),
  ...Object.keys(os),
  ...Object.keys(path),
  ...Object.keys(util),
  ...videoExtensions,
  ...textExtensions,
  ...binaryExtensions,
  ...imageExtensions,
  ...fontExtensions,
  ...compressedExtensions,
  ...builtinModules,
  ...Object.keys(global),
  ...Object.keys(process.env),
  ...Object.keys(process),
  'android',
  'aws',
  'axios',
  'babel',
  'eslint',
  'ffmpeg',
  'ffprobe',
  'git',
  'ios',
  'jsdoc',
  'lebab',
  'nginx',
  'mac',
  'ngrok',
  'nodemon',
  'npx',
  'npm',
  'node',
  'nodejs',
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
  'pcss',
  'js',
  'jsx',
  'css',
  'html',
  'ttf',
  'webm',
  'act',
  'asc',
  'atob',
  'blob',
  'ctrl',
  'ctx',
  'dir',
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
].sort()
