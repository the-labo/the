'use strict'

const logger = {
  logCallbackCall(controllerName, handleName, values) {
    console.groupCollapsed(
      `[TheClient] Callback \`${controllerName}.${handleName}()\``,
    )
    console.log('Signature', `\`${controllerName}.${handleName}()\``)
    console.log('Arguments', values)
    console.groupEnd()
  },
}

module.exports = logger
