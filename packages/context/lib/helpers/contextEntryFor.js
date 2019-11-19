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
    const renderer = useMemo(() => props.children, [])

    const getPiped = useCallback(() => pipe(store.state), [pipe])

    const initialized = useMemo(() => init(store.state), [])
    const [piped, setPiped] = useState(getPiped())

    const updatePiped = useCallback(() => {
      const newPiped = getPiped()
      const skip = shallowEqual(piped, newPiped)
      if (skip) {
        return
      }
      setPiped(newPiped)
    }, [piped, setPiped, getPiped])

    useEffect(() => {
      updatePiped()
      const unsubscribeStore = store.subscribe(() => updatePiped())
      return () => {
        unsubscribeStore()
      }
    }, [])

    return renderer({
      ...initialized,
      ...piped,
    })
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
