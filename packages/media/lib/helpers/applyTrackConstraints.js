'use strict'

module.exports = async function applyTrackConstraints(track, constraint) {
  switch (typeof constraint) {
    case 'boolean': {
      track.enabled = Boolean(constraint)
      break
    }
    case 'object': {
      await track.applyConstraints(constraint)
      break
    }
    default: {
      break
    }
  }
}
