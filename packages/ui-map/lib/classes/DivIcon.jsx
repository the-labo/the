/**
 * @class DivIcon
 * @augments L.DivIcon
 */
'use strict'

import L from '@okunishinishi/leaflet-shim'

/** @lends DivIcon */
class DivIcon extends L.DivIcon {
  constructor() {
    super(...arguments)
  }

  createIcon(oldIcon) {
    const div = super.createIcon(oldIcon)

    return div
  }
}

export default DivIcon
