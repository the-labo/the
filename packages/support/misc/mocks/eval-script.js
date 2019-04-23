'use strict'

eval(`
module.exports = () => {
  console.log('this is es6!')
}
`)
eval(`hoge = ${1}`)
eval('const x = 1+2')

const hoge = 'y = 2+3'
eval(hoge)
