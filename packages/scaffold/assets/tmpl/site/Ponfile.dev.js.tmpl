/**
 * Pon tasks for development
 * @file Ponfile
 * @see https://github.com/realglobe-Inc/pon
 */
'use strict'

const pon = require('pon')
const {
  command: { fork, spawn: { npm, npx } },
  fs: { del },
  open,
} = require('pon-task-basic')
const {
  fmtjson, mocha, pondoc,
} = require('pon-task-dev')
const docker = require('pon-task-docker')
const icon = require('pon-task-icon')
const theCode = require('the-code/pon')
const theSupport = require('the-support/pon')
const Local = require('./Local')
const Containers = require('./misc/docker/Containers')
const Drawings = require('./misc/icon/Drawings')
const PondocDev = require('./misc/project/Pondoc.dev')
const { cwd, doc, tasks } = require('./Ponfile')

module.exports = pon(
  /** @module tasks */
  {

    // -----------------------------------
    // Meta info
    // -----------------------------------
    ...{
      $cwd: cwd,
      $dev: true,
      $doc: { ...doc, ...PondocDev },
    },

    // -----------------------------------
    // From Ponfile.js
    // -----------------------------------
    ...tasks,

    // -----------------------------------
    // Sub Tasks for Icon
    // -----------------------------------
    ...{
      /** Generate icons */
      'icon:gen': [
        Drawings.appIcon && icon('assets/images/app-icon.png', Drawings.appIcon),
        Drawings.fbAppIcon && icon('assets/images/fb/fb-app-icon.png', Drawings.fbAppIcon),
        Drawings.officialAccountIcon && icon('assets/images/accounts/official-account-icon.png', Drawings.officialAccountIcon),
      ].filter(Boolean),
    },

    // -----------------------------------
    // Sub Tasks for Clean Up
    // -----------------------------------
    ...{
      /** Cleanup cache files */
      'clean:cache': del(['tmp/cache/**/*.*', 'node_modules/.cache/**/*.*']),
      /** Cleanup public files */
      'clean:public': del(['public/build/*.*']),
      /** Cleanup shim files */
      'clean:shim': del(['shim/**/*.*', 'client/shim/**/*.*']),
    },

    // -----------------------------------
    // Sub Tasks for Debug
    // -----------------------------------
    ...{
      /** Run server for debug */
      'debug:server': [
        'ps:debug', 'env:debug', npx('nodemon', '--config', 'misc/dev/Nodemon.json', 'bin/app.js')
      ],
      /** Watch files for debug */
      'debug:watch': ['env:debug', 'ui:*/watch'],
    },

    // -----------------------------------
    // Sub Tasks for Document
    // -----------------------------------
    ...{
      /** Generate pondoc file */
      'doc:pondoc': pondoc('Ponfile.js', 'misc/project/Pondoc.json'),
      'doc:pondoc:dev': pondoc('Ponfile.dev.js', 'misc/project/Pondoc.dev.json'),
    },

    // -----------------------------------
    // Sub Tasks for Format
    // -----------------------------------
    ...{
      /** Format client files */
      'format:client': theCode([
        'client/ui/**/*.pcss',
        'client/ui/**/*.jsx',
        'client/scenes/**/*.js',
        'client/+(mappings|ui|scenes|scopes|client|workers)/**/.*.bud',
      ], { ignore: 'client/**/index.*' }),
      /** Format conf files */
      'format:conf': theCode([
        'Local.js',
        'Ponfile.js',
        'Ponfile.*.js',
        'conf/*.js',
        'conf/.*.bud',
      ], { ignore: 'conf/index.js' }),
      /** Format json files */
      'format:json': fmtjson([
        'conf/**/*.json',
        'client/**/*.json',
        'server/**/*.json',
        'misc/**/*.json',
        'secrets.json',
      ], { sort: true }),
      /** Format server files */
      /** Format server files */
      'format:server': theCode([
        'server/**/*.js',
        'server/**/.*.bud',
      ], {}),
    },

    // -----------------------------------
    // Sub Tasks for Open
    // -----------------------------------
    ...{
      /** Open app in browser */
      'open:app': open(`http://localhost:${Local.NGINX_CONTAINER_PORT}`),
      /** Open homepage field in package.json */
      'open:repo': npm('docs'),
    },

    // -----------------------------------
    // Sub Tasks for Test
    // -----------------------------------
    ...{
      /** Run client tests */
      'test:client': mocha('client/test/**/*.js', { timeout: 3000 }),
      /** Run server tests */
      'test:server': mocha('server/test/**/*.js', { timeout: 3000 }),
      /** Check compatibility */
      'test:support': theSupport('public/**/*.js'),
    },

    // -----------------------------------
    // Sub Tasks for Docker
    // -----------------------------------
    ...{
      /** Prepare mysql docker container */
      'docker:mysql': docker.mysql(Containers.mysql.name, Containers.mysql.options),
    },

    // -----------------------------------
    // Main Tasks
    // -----------------------------------
    ...{
      /** Build project */
      build: [...tasks.build, 'format',],
      /** Clean all */
      clean: ['clean:shim', 'clean:public', 'clean:cache'],
      /** Start debugging */
      debug: ['ps:debug', 'env:debug', 'build', 'debug:*'],
      /** Deploy project on development */
      deploy: [
        'maint:on',
        'stop',
        'git:catchup',
        'pkg:install',
        'b',
        'db:seed',
        'db:migrate',
        'start',
        'maint:off'
      ],
      /** Docker tasks */
      docker: ['docker:redis/run', 'docker:mysql/run', 'docker:nginx/run'],
      /** Format source codes */
      format: [
        'format:conf', 'format:json', 'format:client', 'format:server'
      ],
      /** Open project */
      open: 'open:app',
      /** Prepare project */
      prepare: [
        ...tasks.prepare,
        ...['format', 'pkg:fix', 'doc',],
        ...['test:support'],
      ],
      /** Start server */
      start: ['debug:server'],
      /** Stop server */
      stop: [],
      /** Run all tess */
      test: ['env:test', 'test:support', 'test:client', 'test:server'],
      /** Upgrade package */
      upgrade: ['pkg:upg', 'pkg:install:force', 'pkg:link', 'build'],
      /** Run watches */
      watch: ['ui:*', 'ui:*/watch'],
    },

    // -----------------------------------
    // Aliases
    // -----------------------------------
    ...{
      /** Shortcut for `clean` task */
      c: 'clean',
      /** Shortcut for `debug` task */
      d: 'debug',
      /** Shortcut for `debug:server` task */
      ds: 'debug:server',
      /** Shortcut for `format` task */
      f: 'format',
      /** Shortcut for `open` task */
      o: 'open',
      /** Shortcut for `open` task */
      or: 'open:repo',
      /** Shortcut for `test` task */
      t: 'test',
      /** Shortcut for `upgrade` task */
      u: 'upgrade',
      /** Shortcut for `watch` task */
      w: 'watch',
    },
  }
)
