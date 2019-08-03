/**
 * Pon tasks
 * @file Ponfile
 * @see https://github.com/realglobe-Inc/pon
 */
'use strict'

const deploy = require('hc-deploy-task')
const pon = require('pon')
const {
  command: {
    fork,
    spawn: { git, npm, npx },
  },
  coz,
  env,
  fs: { chmod, concat, cp, del, mkdir, symlink, write },
} = require('pon-task-basic')
const {
  drop,
  dump,
  exp,
  imp,
  load,
  migrate,
  seed,
  setup,
} = require('pon-task-db')
const dockerImage = require('pon-task-docker-image')
const es = require('pon-task-es')
const md = require('pon-task-md')
const pm2 = require('pon-task-pm2')
const { browser, ccjs, css, react } = require('pon-task-web')
const assets = require('@hec-eye/assets')
const {
  Batches,
  JFrogAccounts,
  MySQLConnections,
  WebApps,
} = require('@hec-eye/constants')
const { shared: createSharedDB } = require('@hec-eye/db')
const theAssets = require('@the-/assets')
const theBin = require('@the-/bin/pon')
const thePS = require('@the-/ps/pon')
const { Urls } = require('./conf')
const Bins = require('./misc/project/Bins')
const Directories = require('./misc/project/Directories')
const Pondoc = require('./misc/project/Pondoc')
const migration = require('./server/db/migration')
const Logger = require('./server/helpers/Logger')
const createDB = () =>
  require('./server/db/create')(MySQLConnections.Mapper, {
    enableHook: false,
  })
const BrowserEnv = { APP_DOMAIN: WebApps.Mapper.DOMAIN }

const privateReposCredentials = {
  password: JFrogAccounts.Deployer.PASSWORD,
  user: JFrogAccounts.Deployer.USERNAME,
}

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
    // Sub Tasks for Assets
    // -----------------------------------
    ...{
      'assets:compile': [
        md('assets/markdowns', 'assets/html/partials', {
          vars: require('./conf/locales'),
        }),
      ],
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
      'db:drop': ['unless:production', drop(createDB)],
      /** Dump data */
      'db:dump': dump(createDB, 'var/backup/dump', { gzip: true, max: 1 }),
      /** Export database into file */
      'db:exp': exp(createDB, 'var/exp'),
      /** Import database from file */
      'db:imp': imp(createDB, 'var/imp'),
      /** Load data from dump */
      'db:load': load.ask(createDB),
      /** Migrate data */
      'db:migrate': migrate(createDB, migration, {}),
      /** Drop and setup database again */
      'db:reset': ['unless:production', 'db:drop', 'db:setup', 'db:seed'],
      /** Generate test data */
      'db:seed': seed(createDB, 'server/db/seeds/:env/*.seed.js'),
      /** Setup database */
      'db:setup': [
        setup(createSharedDB),
        env.dynamic(({ isProduction }) =>
          isProduction()
            ? fork('./misc/tasks/setUpForProduction.js')
            : setup(createDB),
        ),
      ],
      /** Create user */
      'db:user:create': fork('misc/scripts/createUser.js'),
    },
    deploy: deploy({
      host: '13.73.30.218',
      privateKey: '/tmp/deploy_rsa',
      projectPath:
        '/home/daisan/apps/dev.drone-scope.realglobe.work/drone-scope',
      targetBranch: 'latest',
      username: 'daisan',
    }),
    ...{
      /** Set env variables for debug */
      'env:debug': env(
        'development',
        Object.assign({ DEBUG: Logger.level(Logger.DEBUG) }),
      ),
      /** Set env variables for production */
      'env:prod': env(
        'production',
        Object.assign({ DEBUG: Logger.level(Logger.INFO) }),
      ),
      /** Set env variables for test */
      'env:test': env('test'),
    },

    // -----------------------------------
    // Sub Tasks for Git
    // -----------------------------------
    ...{
      /** Catch up to latest git */
      'git:catchup': [git('reset', '--hard'), git('pull')],
      /** Fetch tags from git */
      'git:tags': git('fetch', '--tags'),
    },

    // -----------------------------------
    // Sub Tasks for maintenance
    // -----------------------------------
    ...{
      /** STop maintenance mode */
      'maintenance:off': del('var/app/maintenance'),
      /** Start maintenance mode */
      'maintenance:on': write('var/app/maintenance', ''),
    },

    // -----------------------------------
    // Sub Tasks for Package
    // -----------------------------------
    ...{
      /** Fix package.json */
      'pkg:fix': npx('fixpack'),
      /** Install packages */
      'pkg:install': npm('install', '--ignore-scripts --no-save'),
      /** Install packages forcefully */
      'pkg:install:force': npm('install', '--ignore-scripts --no-save --force'),
      /** Link self packages */
      'pkg:link': symlink(
        {
          'assets/data': 'node_modules/@self/data',
          'package.json': 'shim/package.json',
          'shim/conf': 'node_modules/@self/conf',
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
      'pm2:app': pm2('./bin/app.js', { name: WebApps.Mapper.PROCESS_NAME }),
      /** Run beacon batch with pm2 */
      'pm2:batch:beacon': pm2('./bin/beaconBatch.js', {
        name: Batches.MapperBeacon.PROCESS_NAME,
      }),
      /** Run worker batch with pm2 */
      'pm2:batch:worker': pm2('./bin/workerBatch.js', {
        name: Batches.WorkerBeacon.PROCESS_NAME,
      }),
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
      'prod:js': ccjs.dir('public/build', `public${Urls.PROD_ASSET_URL}`, {}),
      /** Delete source map files for production */
      'prod:map': del('public/**/*.map'),
    },
    'struct:chmod': chmod({
      'bin/**/*.*': '755',
    }),
    'struct:compile': [es('conf', 'shim/conf')],
    'struct:cp': cp(
      {
        [`${assets.IMAGE_DIR}/icons`]: 'public/images/icons',
        [`${assets.IMAGE_DIR}/leaflet`]: 'public/images/leaflet',
        [`${assets.IMAGE_DIR}/logos`]: 'public/images/logos',
        'assets/css': 'public/css',
        'assets/html/errors': 'public/errors',
        'assets/html/partials': 'public/partials',
        'assets/images': 'public/images',
        'assets/js': 'public/js',
        'assets/json': 'public/json',
        'assets/manifest': 'public/manifest',
        'assets/text': 'public',
        'assets/webfonts': 'public/webfonts',
      },
      { force: true },
    ),
    'struct:mkdir': mkdir([...Object.keys(Directories)]),
    'struct:render': [
      coz(['+(assets|bin|client|conf|doc|misc|server)/**/.*.bud', '.*.bud']),
    ],
    /** Bundle browser script */
    'ui:browser': env.dynamic(
      () =>
        browser(
          {
            bundle: 'ui/entrypoint.js',
          },
          'public/build/[name].js',
          {
            context: `${__dirname}/client/shim`,
            env: BrowserEnv,
            publicPath: `${Urls.JS_CHUNK_BASE_URL}/`,
          },
        ),
      { sub: ['watch', 'analyze'] },
    ),
    'ui:css': [
      css('client/ui', 'client/shim/ui', {
        inlineMap: true,
        modules: true,
        pattern: [
          '*.pcss',
          '+(views|layouts|wrappers|stateful|stateless)/**/*.pcss',
        ],
      }),
      concat(
        [
          'client/ui/constants/variables.pcss',
          'client/shim/ui/**/*.css',
          'client/ui/base.pcss',
        ],
        'public/build/bundle.pcss',
        {},
      ),
      css('public/build', 'public/build', { pattern: '*.pcss' }),
      css('assets/css', 'public/css', { pattern: '*.css' }),
    ],
    /** Run css watch */
    'ui:css/watch': 'ui:css/*/watch',
    /** Compile react components */
    'ui:react': react('client', 'client/shim', {
      pattern: ['*.js', '*.jsx', '!(shim)/**/+(*.jsx|*.js|*.json)'],
      sourceRoot: '..',
    }),
    'ui:workers': env.dynamic(
      () =>
        browser.all('workers', 'public', {
          context: `${__dirname}/client/shim`,
          env: BrowserEnv,
        }),
      { sub: ['watch', 'analyze'] },
    ),
    'unless:production': env.notFor('production'),

    // -----------------------------------
    // Sub Tasks for Building docker image
    // -----------------------------------
    ...{
      /** Build docker image */
      'image:build': dockerImage.build('../..', { confDir: 'misc/docker/app' }),
      /** Prepare for building docker image */
      'image:prepare': ['env:prod', 'prod:compile'],
      /** Push docker image */
      'image:push': dockerImage.push('misc/docker/app', {
        privateReposCredentials,
      }),
      /** Push docker image on Travis */
      'image:push:travis': dockerImage.push.onTravis('misc/docker/app', {
        privateReposCredentials,
        targetBranch: 'mapper',
      }),
    },

    // -----------------------------------
    // Sub Tasks for Process
    // -----------------------------------
    ...{
      /** Process check for debug app */
      'ps:debug:app': thePS('var/app/debug/app.pid'),
      /** Process check for debug beacon batch */
      'ps:debug:beacon': thePS('var/app/debug/beacon.pid'),
      /** Process check for debug worker batch */
      'ps:debug:worker': thePS('var/app/debug/worker.pid'),
      /** Process check for e2e */
      'ps:e2e': thePS('var/app/e2e.pid'),
    },

    // -----------------------------------
    // Main Tasks
    // -----------------------------------
    /** Run all assets tasks */
    assets: ['assets:*'],
    /** Build the project */
    build: ['struct:compile', 'pkg:link', 'struct', 'ui'],
    /** Check bins */
    check: ['check:*'],
    /** Prepare DB */
    db: ['db:setup', 'db:migrate', 'db:seed'],
    /** Restart app as daemon */
    default: ['build'],
    /** Show app daemon logs */
    logs: ['pm2:*/logs'],
    /** Prepare project */
    prepare: [
      'check',
      'struct:compile',
      'pkg:link',
      'struct',
      'assets',
      'db',
      'build',
    ],
    /** Prepare and start on production */
    prod: ['env:prod', 'prod:compile', 'prod:db', 'start'],
    /** Restart app as daemon */
    restart: ['pm2:*/restart'],
    /** Show app daemon status */
    show: ['pm2:*/show'],
    /** Start app as daemon */
    start: ['pm2:*/start'],
    /** Stop app as daemon */
    stop: ['pm2:*/stop'],
    /** Run all struct tasks */
    struct: [
      'struct:mkdir',
      'struct:chmod',
      'struct:compile',
      'struct:cp',
      'struct:render',
    ],
    /** Run all ui tasks */
    ui: ['ui:css', 'ui:react', 'ui:browser', 'ui:workers'],

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
