'use strict'

const { shallowEqual } = require('asobj')
const PropTypes = require('prop-types')
const React = require('react')

const { useCallback, useEffect, useMemo, useState } = React

/**
 * Entry component
 * @memberof module:@the-/context.helpers
 * @function contextEntryFor
 * @returns {*}
 */
function contextEntryFor(context, { store }) {
  /**
   * @memberof module:@the-/context.helpers.contextEntryFor
   * @function ContextEntry
   * @inner
   * @param props
   * @returns {*} */
  function ContextEntry(props) {
    const { init, pipe } = props
    const renderer = useMemo(() => props.children, [props.children])
    const tmp = useMemo(
      () => ({
        pipe,
      }),
      [],
    )
    tmp.pipe = pipe

    const getPiped = useCallback(() => {
      const { pipe } = tmp
      const piped = pipe(store.state)
      if (typeof piped === 'undefined') {
        console.warn(
          `[@the-/context] pipe returns undefined in ${ContextEntry.displayName}. Should returns null`,
        )
        return null
      }
      return piped
    }, [store])

    const initialized = useMemo(() => init(store.state), [store])
    const [piped, setPiped] = useState(getPiped())
    tmp.piped = piped
    tmp.updatePiped = useCallback(() => {
      const { piped } = tmp
      const newPiped = getPiped()
      const skip = shallowEqual(piped, newPiped)
      if (skip) {
        return
      }

      setPiped(newPiped)
    }, [setPiped, getPiped])

    useEffect(() => {
      const { updatePiped } = tmp
      updatePiped()
      const unsubscribeStore = store.subscribe(() => updatePiped())
      return () => {
        unsubscribeStore()
      }
    }, [tmp, store])

    const rendered = renderer({
      ...initialized,
      ...piped,
    })
    if (typeof rendered === 'undefined') {
      console.warn(
        `[@the-/context] render returns undefined in ${ContextEntry.displayName}. Should returns null`,
      )
      return null
    }
    return rendered
  }

  ContextEntry.propTypes = {
    children: PropTypes.func,
    init: PropTypes.func,
    pipe: PropTypes.func,
  }
  ContextEntry.defaultProps = {
    init: () => ({}),
    pipe: (v) => v,
  }
  return ContextEntry
}

module.exports = contextEntryFor
