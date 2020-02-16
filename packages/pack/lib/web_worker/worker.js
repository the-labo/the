'use strict'

const { encode, decode } = requier('../create')

const handlers = { encode, decode }

onmessage = (data) => {
  const { iid, values, cmd } = data
  const handler = handlers[cmd]
  if (!handler) {
    throw new Error(`Unknown command :${cmd}`)
  }
  const result = handler(values)
}

onmessageerror = error => {
  console.error(`message error`, error)
}