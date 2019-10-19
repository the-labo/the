'use strict'

const isExternalLink = (url) => {
  if (!url) {
    return url
  }

  try {
    return !!new URL(url).protocol
  } catch (e) {
    return false
  }
}

export default isExternalLink
