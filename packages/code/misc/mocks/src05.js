/**
 * Pon tasks
 * @file Ponfile
 * @see https://github.com/realglobe-Inc/pon
 */
'use strict'

const pon = require('pon')
const {
  command: {
    spawn: { git, npx },
  },
  coz,
  env,
  fmtjson,
  fs: { chmod, concat, cp, del, mkdir, symlink, write },
  mocha,
  open,
  pondoc,
} = require('pon-task-basic')
const changelog = require('pon-task-changelog')
const db = require('pon-task-db')
const { mysql, nginx, redis } = require('pon-task-docker')
const es = require('pon-task-es')
const icon = require('pon-task-icon')
const md = require('pon-task-md')
const pm2 = require('pon-task-pm2')
const { browser, ccjs, css, map, react } = require('pon-task-web')
const theAssets = require('@the-/assets')
const { isProduction } = require('@the-/check')
const theCode = require('@the-/code/pon')
const theLint = require('@the-/lint/pon')
const thePS = require('@the-/ps/pon')
const { Urls, locales } = require('./conf')
const Local = require('./Local')
const ExternalIgnorePatch = require('./misc/browser/ExternalIgnorePatch')
const Externals = require('./misc/browser/Externals')
const Containers = require('./misc/docker/Containers')
const Drawings = require('./misc/icon/Drawings')
const Rules = require('./misc/lint/Rules')
const Directories = require('./misc/project/Directories')
const Pondoc = require('./misc/project/Pondoc')
const migration = require('./server/db/migration')
const {
  transforms: { envify },
} = browser
const { secret, setting } = Local
const createDB = () => require('./server/db/create').forTask()

module.exports = pon(
  /** @module tasks */
  {
    $cwd: __dirname,

    // -----------------------------------
    // Meta info
    // -----------------------------------
    $doc: Pondoc,

    // -----------------------------------
    // Sub Tasks for Assert
    // -----------------------------------
    /** Make sure that not production */
    'assert:not-prod': env.notFor('production'),

    // -----------------------------------
    // Sub Tasks for Assets
    // -----------------------------------
    /** Install asset files */
    'assets:install': () => theAssets().installTo('assets', { copy: true }),
    /** Render markdown assets */
    'assets:markdown': md('assets/markdowns', 'public/partials', {
      vars: { ...locales },
    }),
    /** Cleanup cache files */
    'clean:cache': del('tmp/cache/**/*.*'),
    /** Cleanup public files */
    'clean:public': del('public/build/*.*'),

    // -----------------------------------
    // Sub Tasks for Clean Up
    // -----------------------------------
    /** Cleanup shim files */
    'clean:shim': del(['shim/**/*.*', 'client/shim/**/*.*']),
    /** Open database cli */
    'db:cli': () => createDB().cli(),
    /** Drop database */
    'db:drop': ['assert:not-prod', db.drop(createDB)],
    /** Dump data */
    'db:dump': db.dump(createDB, 'var/backup/dump', {
      max: Local.DUMP_ROTATION,
    }),
    /** Load data from dum */
    'db:load': db.load.ask(createDB),
    /** Migrate data */
    'db:migrate': db.migrate(createDB, migration, {
      snapshot: 'var/migration/snapshots',
    }),
    /** Drop and setup database again */
    'db:reset': ['assert:not-prod', 'db:drop', 'db:setup', 'db:seed'],
    /** Generate test data */
    'db:seed': db.seed(createDB, 'server/db/seeds/:env/*.seed.js'),

    // -----------------------------------
    // Sub Tasks for Database
    // -----------------------------------
    /** Setup database */
    'db:setup': db.setup(createDB),

    // -----------------------------------
    // Sub Tasks for Debug
    // -----------------------------------
    /** Run server for debug */
    'debug:server': [
      'ps:debug',
      'env:debug',
      npx('nodemon', '--config', 'misc/dev/Nodemon.json', 'bin/app.js'),
    ],

    /** Watch files for debug */
    'debug:watch': ['env:debug', 'ui:*/watch'],

    // -----------------------------------
    // Sub Tasks for Document
    // -----------------------------------
    /** Generate changelog file */
    'doc:changelog': changelog(),

    /** Generate pondoc file */
    'doc:pondoc': pondoc(__filename, 'misc/project/Pondoc.json'),

    // -----------------------------------
    // Sub Tasks for Docker
    // -----------------------------------
    /** Prepare mysql docker container */
    'docker:mysql': mysql(Containers.mysql.name, Containers.mysql.options),
    /** Prepare nginx docker container */
    'docker:nginx': nginx(Containers.nginx.name, Containers.nginx.options),
    /** Prepare redis docker container */
    'docker:redis': redis(Containers.redis.name, Containers.redis.options),
    /** Set env variables for debug */
    'env:debug': env('development', { DEBUG: 'app:*', ...Local }),

    // -----------------------------------
    // Sub Tasks for Environment
    // -----------------------------------
    /** Set env variables for production */
    'env:prod': env('production'),
    /** Set env variables for test */
    'env:test': env('test'),

    // -----------------------------------
    // Sub Tasks for Format
    // -----------------------------------
    /** Format client files */
    'format:client': theCode(
      ['client/ui/**/*.pcss', 'client/ui/**/*.jsx', 'client/scenes/**/*.js'],
      { ignore: 'client/**/index.*' },
    ),
    /** Format conf files */
    'format:conf': theCode(['Local.js', 'Ponfile.js', 'conf/*.js'], {
      ignore: 'conf/index.js',
    }),
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
    'format:server': theCode('server/**/*.js', {}),

    // -----------------------------------
    // Sub Tasks for Git
    // -----------------------------------
    /** Catch up to latest git */
    'git:catchup': [git('stash'), git('pull')],

    // -----------------------------------
    // Sub Tasks for Icon
    // -----------------------------------
    /** Generate icons */
    'icon:generate': [
      Drawings.appIcon && icon('assets/images/app-icon.png', Drawings.appIcon),
      Drawings.fbAppIcon &&
        icon('assets/images/fb/fb-app-icon.png', Drawings.fbAppIcon),
      Drawings.officialAccountIcon &&
        icon(
          'assets/images/accounts/official-account-icon.png',
          Drawings.officialAccountIcon,
        ),
    ].filter(Boolean),
    /** Validate locales */
    'lint:loc': () => locales.validate(),

    // -----------------------------------
    // Sub Tasks for Lint
    // -----------------------------------
    'lint:rules': theLint(Rules),

    // -----------------------------------
    // Sub Tasks for Locales
    // -----------------------------------
    /** Print locale settings */
    'loc:print': () => console.log(locales.toCompound()),

    // -----------------------------------
    // Sub Tasks for Local Config
    // -----------------------------------
    /** Print local settings */
    'local:print': () => Local.print(),
    /** Disable maintenance mode */
    'maint:off': del('public/status/maintenance'),

    // -----------------------------------
    // Sub Tasks for Maintenance
    // -----------------------------------
    /** Enable maintenance mode */
    'maint:on': write('public/status/maintenance'),

    // -----------------------------------
    // Sub Tasks for Open
    // -----------------------------------
    /** Open app in browser */
    'open:app': open(`http://localhost:${Local.NGINX_CONTAINER_PORT}`),

    // -----------------------------------
    // Sub Tasks for Package
    // -----------------------------------
    /** Fix package.json */
    'pkg:fix': npx('fixpack'),
    /** Install packages */
    'pkg:install': npx('yarn', 'install', '--ignore-scripts'),
    /** Link self packages */
    'pkg:link': symlink(
      {
        'Local.js': 'node_modules/@self/Local.js',
        'assets/data': 'node_modules/@self/data',
        'shim/conf': 'node_modules/@self/conf',
        'shim/utils': 'node_modules/@self/utils',
        client: 'node_modules/@self/client',
      },
      { force: true },
    ),

    // -----------------------------------
    // Sub Tasks for PM2
    // -----------------------------------
    /** Run app with pm2 */
    'pm2:app': pm2('./bin/app.js', { name: Local.APP_PROCESS_NAME }),
    /** Run backup cron with pm2 */
    'pm2:backup:dump': pm2.pon('db:dump', {
      cron: Local.DUMP_SCHEDULE,
      name: `${Local.BACKUP_PROCESS_NAME}:dump`,
    }),
    /** Compile files for production */
    'prod:compile': ['env:prod', 'build', 'prod:map', 'prod:css', 'prod:js'],
    /** Compile css files for production */
    'prod:css': css.minify(
      [
        `public${Urls.CSS_NORMALIZE_URL}`,
        `public${Urls.CSS_THEME_URL}`,
        `public${Urls.CSS_FONT_URL}`,
        `public${Urls.CSS_BUNDLE_URL}`,
      ],
      `public${Urls.PRODUCTION_CSS_URL}`,
    ),
    /** Prepare database for production */
    'prod:db': ['env:prod', 'db'],
    /** Compile js files for production */
    'prod:js': ccjs(
      [`public${Urls.JS_EXTERNAL_URL}`, `public${Urls.JS_BUNDLE_URL}`],
      `public${Urls.PRODUCTION_JS_URL}`,
    ),

    // -----------------------------------
    // Sub Tasks for Production
    // -----------------------------------
    /** Delete source map files for production */
    'prod:map': del('public/**/*.map'),

    // -----------------------------------
    // Sub Tasks for Process
    // -----------------------------------
    /** Check another process exists */
    'ps:debug': thePS('var/app/debug.pid'),

    // -----------------------------------
    // Sub Tasks for Secret
    // -----------------------------------
    /** Decrypt secret file */
    'secret:dec': () => secret.decrypt(),
    /** Encrypt secret file */
    'secret:enc': () => secret.encrypt(),

    // -----------------------------------
    // Sub Tasks for Structure
    // -----------------------------------
    /** Change file permissions */
    'struct:chmod': chmod({
      '.githooks/**/*.js': '577',
      'bin/**/*.*': '577',
      'misc/**/*.sh': '577',
      'misc/scripts/*.*': '577',
    }),
    /** Compile files */
    'struct:compile': [
      es('conf', 'shim/conf', { sourceRoot: '../../../../conf' }),
      es('utils', 'shim/utils', { sourceRoot: '../../../../conf' }),
    ],
    /** Execute file copy */
    'struct:cp': cp(
      {
        'assets/css': 'public/css',
        'assets/html/server-error': 'public/server-error',
        'assets/images': 'public/images',
        'assets/text': 'public',
        'assets/webfonts': 'public/webfonts',
      },
      { force: true },
    ),
    /** Generate project directories */
    'struct:mkdir': mkdir([...Object.keys(Directories)]),
    /** Prepare sub packages */
    'struct:pkg': [
      cp(
        {
          'package.json': 'shim/package.json',
        },
        { force: true },
      ),
      del('package-lock.json'), // Using yarn
    ],
    /** Render coz templates */
    'struct:render': [
      coz([
        '+(conf|client|server)/**/.index.*.bud',
        '+(assets|bin|client|conf|doc|misc|server|test|utils)/**/.*.bud',
        '.*.bud',
      ]),
    ],

    // -----------------------------------
    // Sub Tasks for Test
    // -----------------------------------
    /** Run client tests */
    'test:client': mocha('client/test/**/*.js', { timeout: 3000 }),
    /** Run server tests */
    'test:server': mocha('server/test/**/*.js', { timeout: 3000 }),
    /** Bundle browser script */
    'ui:browser': env.dynamic(
      ({ isProduction }) =>
        browser('client/shim/ui/entrypoint.js', `public${Urls.JS_BUNDLE_URL}`, {
          externals: Externals,
          fullPaths: !isProduction(),
          transforms: [envify()],
          watchTargets: 'client/shim/**/*.js',
        }),
      { sub: ['watch', 'deps'] },
    ),
    /** Bundle external browser script */
    'ui:browser-external': env.dynamic(
      ({ isProduction }) =>
        browser(
          'client/shim/ui/externals.js',
          `public${Urls.JS_EXTERNAL_URL}`,
          {
            fullPaths: !isProduction(),
            ignores: [
              // TODO remove patch
              ...ExternalIgnorePatch({ isProduction }),
            ],
            requires: Externals,
            skipWatching: true,
            transforms: [envify()],
            watchDelay: 300,
          },
        ),
      { sub: ['deps'] },
    ),

    // -----------------------------------
    // Sub Tasks for UI
    // -----------------------------------
    /** Compile stylesheets */
    'ui:css': [
      css('client/ui', 'client/shim/ui', {
        inlineMap: true,
        modules: true,
        pattern: [
          '*.pcss',
          '+(stateful|stateless|views|layouts|wrappers|components)/**/*.pcss',
        ],
      }),
      concat(
        [
          'client/shim/ui/**/*.css',
          'client/ui/base.pcss',
          'client/ui/constants/variables.pcss',
        ],
        'public/build/bundle.pcss',
        {},
      ),
      css('public/build', 'public/build', { pattern: '*.pcss' }),
    ],
    /** Run css watch */
    'ui:css/watch': 'ui:css/*/watch',
    /** Extract map files */
    'ui:map': map('public', 'public', { pattern: '**/*.js', watchDelay: 400 }),
    /** Compile react components */
    'ui:react': react('client', 'client/shim', {
      extractCss: 'client/shim/ui/bundle.pcss',
      pattern: ['*.js', '*.jsx', '!(shim)/**/+(*.jsx|*.js|*.json)'],
      sourceRoot: '..',
      watchTargets: 'client/ui/**/*.pcss',
    }),

    // -----------------------------------
    // Main Tasks
    // -----------------------------------
    ...{
      /** Run all assets tasks */
      assets: ['assets:*'],
      /** Build all */
      build: ['pkg:link', 'struct', 'format', 'ui'],
      /** Clean all */
      clean: ['clean:shim', 'clean:public', 'clean:cache'],
      /** Prepare DB */
      db: ['db:setup', 'db:seed'],
      /** Start debugging */
      debug: ['ps:debug', 'env:debug', 'build', 'lint', 'debug:*'],
      /** Default for `pon` command */
      default: ['build'],
      /** Deploy project on production */
      deploy: ['maint:on', 'stop', 'git:catchup', 'prod', 'maint:off'],
      /** Generate docs */
      doc: 'doc:*',
      /** Setup docker infra */
      docker: ['docker:redis/run', 'docker:mysql/run', 'docker:nginx/run'],
      /** Format source codes */
      format: ['format:conf', 'format:json', 'format:client', 'format:server'],
      /** Lint all */
      lint: ['lint:loc', 'lint:rules'],
      /** Show app daemon logs */
      logs: ['pm2:app/logs'],
      /** Open project */
      open: 'open:*',
      /** Prepare project */
      prepare: [
        'pkg:link',
        'secret:enc',
        'struct',
        'assets',
        'docker',
        'db',
        'build',
        ...(isProduction() ? [] : ['pkg:fix', 'doc', 'lint']),
      ],
      /** Prepare and start on production */
      prod: ['env:prod', 'prod:compile', 'prod:db', 'start'],
      /** Restart app as daemon */
      restart: ['pm2:app/restart', 'pm2:backup:*/restart'],
      /** Update project settings with interactive shell */
      setting: () => setting.ask(),
      /** Show app daemon status */
      show: ['pm2:app/show'],
      /** Start app as daemon */
      start: isProduction()
        ? ['pm2:app/start', 'pm2:backup:*/start']
        : 'debug:server',
      /** Stop app as daemon */
      stop: isProduction() ? ['pm2:app/stop', 'pm2:backup:*/stop'] : [],
      /** Run all struct tasks */
      struct: [
        'struct:mkdir',
        'struct:compile',
        'struct:cp',
        'struct:pkg',
        'struct:render',
        'struct:chmod',
      ],
      /** Run all tess */
      test: ['env:test', 'test:client', 'test:server'],
      /** Run all ui tasks */
      ui: ['ui:css', 'ui:react', 'ui:browser', 'ui:browser-external', 'ui:map'],
      /** Run watches */
      watch: ['ui:*', 'ui:*/watch'],
    },

    // -----------------------------------
    // Aliases
    // -----------------------------------
    ...{
      /** Shortcut for `build` task */
      b: 'build',
      /** Shortcut for `clean` task */
      c: 'clean',
      /** Shortcut for `debug` task */
      d: 'debug',
      /** Shortcut for `debug:server` task */
      ds: 'debug:server',
      /** Shortcut for `format` task */
      f: 'format',
      /** Shortcut for `lint` task */
      l: 'lint',
      /** Shortcut for `open` task */
      o: 'open',
      /** Shortcut for `prod` task */
      p: 'prod',
      /** Shortcut for `test` task */
      t: 'test',
      /** Shortcut for `watch` task */
      w: 'watch',
    },
  },
)
