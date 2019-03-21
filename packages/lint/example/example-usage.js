'use strict'

const {TheLint, rules} = require('the-lint')

async function tryExample () {
  const lint = new TheLint()

  // Use Buildin rules
  lint.add('src/controllers/*Ctrl.js', rules.defaultExportRule({
    type: 'function'
  }))

  // Use Custom rules
  lint.add('src/controllers/*Ctrl.js', ({
                                          filename,
                                          content,
                                          report
                                        }) => {
    const {EOL} = require('os')
    if (!content.endsWith(EOL)) {
      report('Should have end with EOL', {
        expect: JSON.stringify(EOL),
        actual: JSON.stringify(content[content.length - 1]),
      })
    }
  })

  await lint.run()
}

tryExample().catch((err) => console.error(err))
