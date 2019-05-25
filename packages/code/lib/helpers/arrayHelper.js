'use strict'
module.exports = {
  byType: (type) => (entry) => entry.type === type,
  compareBy: (name) => (a, b) => a[name] - b[name],
  compareStrings: (a, b) => a.localeCompare(b),
}
