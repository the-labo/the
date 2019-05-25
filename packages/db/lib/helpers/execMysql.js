'use strict'
/**
 * @memberof module:@the-/db.helpers
 * @function execMysql
 */
const { cleanup } = require('asobj')
const mysql = require('mysql2')

/** @lends module:@the-/db.helpers.execMysql */
async function execMysql(env, sqls) {
  const { database, host, password, port, username } = env
  const connection = mysql.createConnection(
    cleanup(
      {
        database,
        host,
        password,
        port,
        user: username,
      },
      {},
    ),
  )
  for (const sql of [].concat(sqls)) {
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, (err, result) =>
        err ? reject(err) : resolve(result),
      )
    })
    console.log(result)
  }
  await connection.close()
}

module.exports = execMysql
