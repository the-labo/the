'use strict'

const { get } = require('bwindow')

/**
 * Show notification
 * @memberof module:@the-/notify
 * @param {string} message
 * @param {Object} [options={}]
 * @returns {Promise<null|undefined|{onclick: *, close}|*>}
 */
async function showNotification(message, options = {}) {
  const Notification = get('Notification')
  const { onclick, ...restOptions } = options
  if (!Notification) {
    console.warn('Notification not supported')
    return null
  }
  try {
    const notification = new Notification(message, restOptions)
    notification.onclick = onclick
    return notification
  } catch (e) {
    console.warn('[the-notify] Notification failed', e.message)
  }

  const hasServiceWorker = !!get('navigator.serviceWorker')
  if (hasServiceWorker) {
    await Notification.requestPermission()
    return showNotification.byServiceWorker(message, options)
  }
  return null
}

showNotification.byServiceWorker = async function showNotificationByServiceWorker(
  message,
  options = {},
) {
  const { onclick, tag, ...restOptions } = options
  const serviceWorker = get('navigator.serviceWorker')
  const registration = await serviceWorker.ready
  if (!registration) {
    return
  }
  await registration.showNotification(message, {
    tag,
    ...restOptions,
  })
  const callbacks = { onclick }
  return {
    set onclick(onclick) {
      callbacks.onclick = onclick
      registration.getNotifications({ tag }).then((notifications) => {
        for (const notification of notifications) {
          notification.onclick = onclick
        }
      })
    },
    get onclick() {
      return callbacks.onclick
    },
    close: async () => {
      const notifications = await registration.getNotifications({ tag })
      for (const notification of notifications) {
        notification.close()
      }
    },
  }
}

module.exports = showNotification
