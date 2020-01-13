'use strict'

const { get } = require('bwindow')

const Permissions = {
  DENIED: 'denied',
  GRANTED: 'granted',
}

/**
 * Ask to notification
 * @memberof module:@the-/notify
 * @function askNotification
 * @returns {Promise<boolean>}
 */
async function askNotification() {
  const Notification = get('Notification')
  if (!Notification) {
    console.warn('[@the-/notify] Notification not supported')
    return false
  }

  switch (Notification.permission) {
    case Permissions.DENIED:
      return false
    case Permissions.GRANTED:
      return true
    default: {
      const permission = await Notification.requestPermission()
      if (!Notification.permission) {
        Notification.permission = permission
      }

      return permission === Permissions.GRANTED
    }
  }
}

module.exports = askNotification
