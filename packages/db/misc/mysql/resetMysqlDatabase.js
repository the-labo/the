#!/usr/bin/env node
'use strict'

const { exec } = require('child_process')

module.exports = async function resetMysqlDatabase(
  rootUsername,
  rootPassword,
  config = {},
) {
  const escape = (value) => `${'\\`'}${value}${'\\`'}`
  const { database, host = 'localhost', password, username } = config
  rootUsername = rootUsername || config.rootUsername || 'root'
  rootPassword = rootPassword || config.rootPassword
  const sql = `DROP DATABASE IF EXISTS ${database}; CREATE DATABASE IF NOT EXISTS ${database}; GRANT ALL ON ${escape(
    database,
  )}.* TO '${username}'@'%' IDENTIFIED BY '${password}'`
  const command = `mysql -u${rootUsername} --host=${host} ${
    host === 'localhost' ? '' : '--protocol=tcp '
  }-e"${sql}"`
  const env = Object.assign({}, process.env)
  if (rootPassword) {
    env.MYSQL_PWD = rootPassword
  }

  const { stderr, stdout } = await new Promise((resolve, reject) =>
    exec(command, { env }, (err, stdout, stderr) =>
      err ? reject(err) : resolve({ stderr, stdout }),
    ),
  )
  if (stdout) {
    console.log(stdout)
  }

  if (stderr) {
    console.error(stderr)
  }
}
