const pretty = require('pretty-exceptions/lib/index.js')

const onCatch = (caught) => {
  let parsed
  try {
    parsed = pretty(caught, {})
  } catch (e) {
    // DO nothing
  }
  console.error(parsed || caught)

  process.exit(1)
}

process.on('unhandledRejection', onCatch)
process.on('uncaughtException', onCatch)
