/**
 * Pon tasks
 * @file Ponfile
 * @see https://github.com/realglobe-Inc/pon
 */
'use strict'

const pon = require('pon')
const {
  command: {
    spawn: { git, npm, npx },
  },
  coz,
  env,
  fs: { chmod, concat, cp, del, mkdir, symlink, write },
} = require('pon-task-basic')
const db = require('pon-task-db')
const docker = require('pon-task-docker')
const es = require('pon-task-es')
const pm2 = require('pon-task-pm2')
const { browser, ccjs, css, react } = require('pon-task-web')
const theAssets = require('@the-/assets')
const theBin = require('@the-/bin/pon')
const { isProduction } = require('@the-/check')
const thePS = require('@the-/ps/pon')
const { Urls, locales } = require('./conf')
const Local = require('./Local')
const Containers = require('./misc/docker/Containers')
const Bins = require('./misc/project/Bins')
const Directories = require('./misc/project/Directories')
const Pondoc = require('./misc/project/Pondoc')
const migration = require('./server/db/migration')
const { secret, setting } = Local
const createDB = () => require('./server/db/create').forTask()

module.exports = pon(
  /** @module tasks */
  {
    // -----------------------------------
    // Meta info
    // -----------------------------------
    ...{
      $cwd: __dirname,
      $doc: Pondoc,
    },

    // -----------------------------------
    // Sub Tasks for Assert
    // -----------------------------------
    ...{
      /** Make sure that not production */
      'assert:not-prod': env.notFor('production'),
    },

    // -----------------------------------
    // Sub Tasks for Assets
    // -----------------------------------
    ...{
      /** Install asset files */
      'assets:install': () => theAssets().installTo('assets', { copy: true }),
    },

    // -----------------------------------
    // Sub Tasks for Check
    // -----------------------------------
    ...{
      'check:bin': theBin.test(Bins),
    },

    // -----------------------------------
    // Sub Tasks for Database
    // -----------------------------------
    ...{
      /** Open database cli */
      'db:cli': () => createDB().cli(),
      /** Drop database */
      'db:drop': ['assert:not-prod', db.drop(createDB)],
      /** Dump data */
      'db:dump': db.dump(createDB, 'var/backup/dump', { max: 3 }),
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
      /** Setup database */
      'db:setup': db.setup(createDB),
    },

    // -----------------------------------
    // Sub Tasks for Docker
    // -----------------------------------
    ...{
      /** Prepare nginx docker container */
      'docker:nginx': docker.nginx(
        Containers.nginx.name,
        Containers.nginx.options,
      ),
      /** Prepare redis docker container */
      'docker:redis': docker.redis(
        Containers.redis.name,
        Containers.redis.options,
      ),
    },

    // -----------------------------------
    // Sub Tasks for Environment
    // -----------------------------------
    ...{
      /** Set env variables for debug */
      'env:debug': env('development', { DEBUG: 'app:*', ...Local }),
      /** Set env variables for production */
      'env:prod': env('production'),
      /** Set env variables for test */
      'env:test': env('test'),
    },

    // -----------------------------------
    // Sub Tasks for Git
    // -----------------------------------
    ...{
      /** Catch up to latest git */
      'git:catchup': [git('stash'), git('pull')],
    },

    // -----------------------------------
    // Sub Tasks for Locales
    // -----------------------------------
    ...{
      /** Print locale settings */
      'loc:print': () => console.log(locales.toCompound()),
    },

    // -----------------------------------
    // Sub Tasks for Local Config
    // -----------------------------------
    ...{
      /** Print local settings */
      'local:print': () => Local.print(),
    },

    // -----------------------------------
    // Sub Tasks for Maintenance
    // -----------------------------------
    ...{
      /** Disable maintenance mode */
      'maint:off': del('public/status/maintenance'),
      /** Enable maintenance mode */
      'maint:on': write('public/status/maintenance'),
    },

    // -----------------------------------
    // Sub Tasks for Package
    // -----------------------------------
    ...{
      /** Fix package.json */
      'pkg:fix': npx('fixpack'),
      /** Install packages */
      'pkg:install': npm('install', '--ignore-scripts'),
      /** Link self packages */
      'pkg:link': symlink(
        {
          'Local.js': 'node_modules/@self/Local',
          'assets/data': 'node_modules/@self/data',
          'shim/conf': 'node_modules/@self/conf',
          'shim/utils': 'node_modules/@self/utils',
          client: 'node_modules/@self/client',
        },
        { force: true },
      ),
      /** Upgrade packages package.json */
      'pkg:upg': npm('upgrade', '--ignore-scripts'),
    },

    // -----------------------------------
    // Sub Tasks for PM2
    // -----------------------------------
    ...{
      /** Run app with pm2 */
      'pm2:app': pm2('./bin/app.js', { name: Local.APP_PROCESS_NAME }),
    },

    // -----------------------------------
    // Sub Tasks for Production
    // -----------------------------------
    ...{
      /** Cleanup build files */
      'prod:clean': del('public/build/**/*.*'),
      /** Compile files for production */
      'prod:compile': [
        'env:prod',
        'prod:clean',
        'build',
        'prod:map',
        'prod:css',
        'prod:js',
      ],
      /** Compile css files for production */
      'prod:css': css.minify(
        [`public${Urls.CSS_BUNDLE_URL}`],
        `public${Urls.PROD_CSS_BUNDLE_URL}`,
      ),
      /** Prepare database for production */
      'prod:db': ['env:prod', 'db'],
      /** Compile js files for production */
      'prod:js': ccjs.dir(`public/build`, `public${Urls.PROD_ASSET_URL}`, {}),
      /** Delete source map files for production */
      'prod:map': del('public/**/*.map'),
    },

    // -----------------------------------
    // Sub Tasks for Process
    // -----------------------------------
    ...{
      /** Process check for debug */
      'ps:debug': thePS('var/app/debug.pid'),
    },

    // -----------------------------------
    // Sub Tasks for Secret
    // -----------------------------------
    ...{
      /** Decrypt secret file */
      'secret:dec': () => secret.decrypt(),
      /** Encrypt secret file */
      'secret:enc': () => secret.encrypt(),
    },

    // -----------------------------------
    // Sub Tasks for Structure
    // -----------------------------------
    ...{
      /** Change file permissions */
      'struct:chmod': chmod({
        '.githooks/**/*.js': '755',
        'bin/**/*.*': '755',
        'misc/**/*.sh': '755',
        'misc/scripts/*.*': '755',
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
          'assets/js': 'public/js',
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
      ],
      /** Render coz templates */
      'struct:render': [
        coz(
          [
            '+(conf|client|server)/**/.index.*.bud',
            '+(assets|bin|client|conf|doc|misc|server|test|utils)/**/.*.bud',
            '.*.bud',
          ],
          {},
        ),
      ],
    },

    // -----------------------------------
    // Sub Tasks for UI
    // -----------------------------------
    ...{
      'ui:browser': env.dynamic(
        () =>
          browser(
            {
              bundle: 'ui/entrypoint.js',
            },
            `public/build/[name].js`,
            {
              context: `${__dirname}/client/shim`,
              devtool: isProduction() ? false : 'cheap-source-map',
              publicPath: `${Urls.JS_CHUNK_BASE_URL}/`,
            },
          ),
        { sub: ['watch', 'analyze'] },
      ),
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
        css('assets/css', 'public/css', { pattern: '*.css' }),
      ],
      /** Run ws css watch */
      'ui:css/watch': 'ui:css/*/watch',
      /** Compile react components */
      'ui:react': react('client', 'client/shim', {
        extractCss: `client/shim/ui/bundle.pcss`,
        pattern: ['*.js', '*.jsx', '!(shim)/**/+(*.jsx|*.js|*.json)'],
        sourceRoot: '..',
        watchTargets: 'client/ui/**/*.pcss',
      }),
      'ui:workers': env.dynamic(
        () =>
          browser.all('workers', `public`, {
            context: `${__dirname}/client/shim`,
          }),
        { sub: ['watch', 'analyze'] },
      ),
    },

    // -----------------------------------
    // Main Tasks
    // -----------------------------------
    ...{
      /** Run all assets tasks */
      assets: ['assets:*'],
      /** Build all */
      build: ['pkg:link', 'struct', 'ui'],
      /** Check bins */
      check: ['check:*'],
      /** Prepare DB */
      db: ['db:setup', 'db:seed'],
      /** Default for `pon` command */
      default: ['build'],
      /** Deploy project on production */
      deploy: [
        'maint:on',
        'stop',
        'git:catchup',
        'pkg:install',
        'prod',
        'db:migrate',
        'db:seed',
        'maint:off',
      ],
      /** Generate docs */
      doc: 'doc:*',
      /** Setup docker infra */
      docker: ['docker:redis/run', 'docker:nginx/run'],
      /** Show app daemon logs */
      logs: ['pm2:app/logs'],
      /** Prepare project */
      prepare: [
        'check',
        'struct:compile',
        'pkg:link',
        'secret:enc',
        'struct',
        'assets',
        'docker',
        'db',
        'build',
      ],
      /** Prepare and start on production */
      prod: ['env:prod', 'prod:compile', 'prod:db', 'start'],
      /** Restart app as daemon */
      restart: ['pm2:app/restart'],
      /** Update project settings with interactive shell */
      setting: () => setting.ask(),
      /** Show app daemon status */
      show: ['pm2:app/show'],
      /** Start app as daemon */
      start: ['pm2:app/start'],
      /** Stop app as daemon */
      stop: ['pm2:app/stop'],
      /** Run all struct tasks */
      struct: [
        'struct:mkdir',
        'struct:compile',
        'struct:cp',
        'struct:pkg',
        'struct:render',
        'struct:chmod',
      ],
      /** Run all ui tasks */
      ui: ['ui:css', 'ui:react', 'ui:browser', 'ui:workers'],
    },

    // -----------------------------------
    // Aliases
    // -----------------------------------
    ...{
      /** Shortcut for `build` task */
      b: 'build',
      /** Shortcut for `prod` task */
      p: 'prod',
      /** Shortcut for 'prepare` task */
      pre: 'prepare',
    },
  },
)
