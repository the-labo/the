/**
 * @class DivIcon
 * @augments L.DivIcon
 */
'use strict'

import L from '@okunishinishi/leaflet-shim'

/** @lends DivIcon */
class DivIcon extends L.DivIcon {
  createIcon(oldIcon) {
    return super.createIcon(oldIcon)
  }
}

export default DivIcon
