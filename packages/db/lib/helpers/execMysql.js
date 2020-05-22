'use strict'

const { cleanup } = require('asobj')
const mysql = require('mysql2')

/**
 * @memberof module:@the-/db.helpers
 * @function execMysql
 * @param env
 * @param sqls
 */
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
  try {
    for (const sql of [].concat(sqls)) {
      const result = await new Promise((resolve, reject) => {
        connection.query(sql, (err, result) =>
          err ? reject(err) : resolve(result),
        )
      })
      console.log(result)
    }
  } finally {
    await connection.close()
  }
}

module.exports = execMysql
