'use strict'
const theDate = require('@the-/date')

async function tryExample() {
  console.log(
    theDate()
      .addHours(3)
      .toDate(),
  ) // 3 hours later

  const date = theDate('2016/10/10', { lang: 'ja' })
  console.log(date.format('lll')) // -> "2016年10月10日 00:00"
}

tryExample().catch((err) => console.error(err))
