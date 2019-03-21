'use strict'

const {TheDB} = require('the-db')

// Using sqlite
{
  const sqlite = new TheDB({
    dialect: 'sqlite', // Uses "clay-driver-sqlite" package
    storage: 'var/my-app.db' // File path to save
  })
}

// Using json
{
  const json = new TheDB({
    dialect: 'json', // Uses "clay-driver-json" package
    storage: 'var/my-app.json' // File path to save
  })
}

// Using mysql
{
  const mysql = TheDB({
    dialect: 'mysql', // Uses "clay-driver-mysql" package
    database: 'my-app',
    username: 'user01',
    password: 'xxxxxxxxxxx'
  })
}
