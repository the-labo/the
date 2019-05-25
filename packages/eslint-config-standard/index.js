const standard = require('eslint-config-standard')

module.exports = {
  env: {
    ...standard.env,
  },
  globals: {
    ...standard.globals,
    location: true,
    self: true,
    window: true,
  },
  parserOptions: {
    ...standard.parserOptions,
  },
  plugins: [...standard.plugins],
  rules: {
    ...standard.rules,
    'no-irregular-whitespace': 'warn',
  },
}
