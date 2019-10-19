/**
 * Pon tasks for development
 * @file Ponfile
 * @see https://github.com/realglobe-Inc/pon
 */
'use strict'

const pon = require('pon')
const {
  command: {
    spawn: { git, npm, npx },
  },
  fs: { del },
  open,
} = require('pon-task-basic')
const changelog = require('pon-task-changelog')
const { eslint, fmtjson, mocha, pondoc } = require('pon-task-dev')
const docker = require('pon-task-docker')
const theCode = require('@the-/code/pon')
const icon = require('@the-/icon/pon')
const jsdoc = require('@the-/jsdoc/pon')
const theLint = require('@the-/lint/pon')
const theSpell = require('@the-/spell/pon')
const theSupport = require('@the-/support/pon')
const locales = require('./conf/locales')
const Containers = require('./misc/docker/Containers')
const Drawings = require('./misc/icon/Drawings')
const Rules = require('./misc/lint/Rules')
const PondocDev = require('./misc/project/Pondoc.dev')
const Words = require('./misc/spell/Words')
const { cwd, doc, tasks } = require('./Ponfile')
const { DockerPorts, WebApps } = require('./server/constants')

module.exports = pon(
  /** Tasks of Ponfile.dev */
  {
    $cwd: cwd,
    $dev: true,
    $doc: { ...doc, ...PondocDev },
    ...tasks,
    'analyze:ui': ['ui:*/analyze'],
    'clean:cache': del(['tmp/cache/**/*.*', 'node_modules/.cache/**/*.*']),
    /** Cleanup public files */
    'clean:public': del(['public/build/*.*']),
    /** Cleanup shim files */
    'clean:shim': del(['shim/**/*.*', 'client/shim/**/*.*']),
    'debug:server': [
      'ps:debug',
      'env:debug',
      npx(
        'nodemon',
        '--config',
        'misc/dev/Nodemon.json',
        `--inspect=${WebApps.Default.INSPECT_PORT}`,
        'bin/app.js',
      ),
    ],
    /** Watch files for debug */
    'debug:watch': ['env:debug', 'ui:*/watch'],
    'doc:jsdoc': jsdoc(__dirname, 'doc/jsdoc', {
      ignore: '**/shim/**/*.*',
      jsonFile: 'jsdoc.json',
      mdFile: 'jsdoc.md',
      patterns: '+(conf|client|server)/**/*.js',
    }),
    /** Generate pondoc file */
    'doc:pondoc': pondoc('Ponfile.js', 'misc/project/Pondoc.json'),
    'doc:pondoc:dev': pondoc('Ponfile.dev.js', 'misc/project/Pondoc.dev.json'),
    'docker:mysql': docker.mysql(
      Containers.mysql.name,
      Containers.mysql.options,
    ),
    'eslint:check': eslint(__dirname, { ext: '.js,.bud,.jsx,.json' }),
    'eslint:fix': eslint(__dirname, { ext: '.js,.bud,.jsx,.json', fix: true }),
    'format:client': theCode(
      [
        'client/ui/**/*.pcss',
        'client/ui/**/*.jsx',
        'client/**/.*.bud',
        'client/**/*.js',
      ],
      {
        ignore: ['client/**/index.*', 'client/shim/**/*.*'],
      },
    ),
    /** Format conf files */
    'format:conf': theCode(
      [
        '*.yml',
        '.*.yml',
        'Ponfile.js',
        'Ponfile.*.js',
        'conf/*.js',
        'conf/.*.bud',
        '.*.bud',
      ],
      { ignore: 'conf/index.js' },
    ),
    /** Format json files */
    'format:json': fmtjson(
      [
        'conf/**/*.json',
        'client/**/*.json',
        'server/**/*.json',
        'misc/**/*.json',
        'secrets.json',
      ],
      { sort: true },
    ),
    /** Format server files */
    'format:misc': theCode(['misc/**/*.js', 'server/**/.*.bud'], {}),
    'format:server': theCode(['server/**/*.js', 'server/**/.*.bud'], {}),
    'git:changelog': [changelog(), git('add', 'CHANGELOG.md')],
    'icon:gen': [
      Drawings.appIcon && icon('assets/images/app-icon.png', Drawings.appIcon),
    ].filter(Boolean),
    'lint:loc': () => locales.validate(),
    /** Lint by rules */
    'lint:rules': theLint(Rules),
    /** Run spell check */
    'lint:spell': theSpell(
      ['client/**/+(*.jsx|*.js)', 'server/**/*.js', 'conf/*.js'],
      {
        ignore: ['client/shim/**/*.*'],
        words: Words,
      },
    ),
    'open:app': open(`http://localhost:${DockerPorts.NGINX_CONTAINER_PORT}`),
    /** Open homepage field in package.json */
    'open:repo': npm('docs'),
    'test:client': mocha('client/test/**/*.js', { timeout: 3000 }),
    /** Run server tests */
    'test:server': mocha('server/test/**/*.js', { timeout: 3000 }),
    /** Check compatibility */
    'test:support': theSupport('public/**/*.js'),
    analyze: ['analyze:*'],
    /** Build project */
    build: [...tasks.build, 'format'],
    c: 'clean',
    /** Clean all */
    clean: ['clean:shim', 'clean:public', 'clean:cache'],
    /** Shortcut for `debug` task */
    d: 'debug',
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
      'maint:off',
    ],
    /** Docker tasks */
    docker: ['docker:redis/run', 'docker:mysql/run', 'docker:nginx/run'],
    /** Shortcut for `debug:server` task */
    ds: 'debug:server',
    eslint: ['eslint:fix', 'eslint:check'],
    /** Shortcut for `format` task */
    f: 'format',
    /** Format source codes */
    format: [
      'format:conf',
      'format:json',
      'format:client',
      'format:server',
      'format:misc',
    ],
    /** Shortcut for `lint` task */
    l: 'lint',
    /** Apply lint */
    lint: ['lint:loc', 'lint:rules', 'eslint', 'lint:spell'],
    /** Shortcut for `open` task */
    o: 'open',
    /** Open project */
    open: 'open:app',
    /** Shortcut for `open` task */
    or: 'open:repo',
    /** Prepare project */
    prepare: [
      ...tasks.prepare,
      'format',
      'pkg:fix',
      'doc',
      'test:support',
      'analyze',
    ],
    /** Start server */
    start: ['debug:server'],
    /** Stop server */
    stop: [],
    /** Shortcut for `test` task */
    t: 'test',
    /** Run all tess */
    test: ['env:test', 'test:support', 'test:client', 'test:server'],
    /** Shortcut for `upgrade` task */
    u: 'upgrade',
    /** Upgrade package */
    upgrade: ['pkg:upg', 'pkg:install:force', 'pkg:link', 'build'],
    /** Shortcut for `watch` task */
    w: 'watch',
    /** Run watches */
    watch: ['ui:*', 'ui:*/watch'],
  },
)
