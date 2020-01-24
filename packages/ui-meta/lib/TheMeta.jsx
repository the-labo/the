'use strict'

import PropTypes from 'prop-types'
import React, { useContext, useEffect, useMemo } from 'react'
import { newId } from '@the-/util-ui'
import { get } from '@the-/window'

const MetaContext = React.createContext(null)

const callIfFunc = (t) => (typeof t === 'function' ? t() : t)
/**
 * Dynamic meta attribute injector for the-components
 */
const TheMeta = ({ children, color, render, title: shortTitle }) => {
  const tmp = useMemo(
    () => ({
      originalTitle: null,
    }),
    [],
  )

  const context = useContext(MetaContext)

  const baseTitle = useMemo(() => callIfFunc(context.title), [context])

  const title = useMemo(() => callIfFunc(shortTitle), [shortTitle])

  const DomIds = useMemo(
    () => ({
      COLOR_META_ID: newId({ prefix: 'color' }),
    }),
    [],
  )

  useEffect(() => {
    if (!color) {
      return
    }

    const document = get('window.document')
    let metaElm = document.getElementById(DomIds.COLOR_META_ID)
    const { head: container } = document
    if (!metaElm) {
      metaElm = document.createElement('meta')
      metaElm.id = DomIds.COLOR_META_ID
      metaElm.classList.add('the-meta-color')
      metaElm.setAttribute('name', 'theme-color')
      container.appendChild(metaElm)
    }

    metaElm.setAttribute('content', color)
    return () => {
      container.removeChild(metaElm)
    }
  }, [color])

  useEffect(() => {
    const document = get('window.document')
    const newTitle = [title, baseTitle].filter(Boolean).join(' | ')
    if (document.title !== newTitle) {
      tmp.originalTitle = document.title
      document.title = newTitle
    }

    return () => {
      document.title = tmp.originalTitle
      tmp.originalTitle = null
    }
  }, [baseTitle, title])

  return (
    <>
      {render({ title })}
      {children}
    </>
  )
}

TheMeta.Root = React.memo(function TheMetaRoot({ children, title }) {
  return (
    <MetaContext.Provider value={{ title }}>{children}</MetaContext.Provider>
  )
})

TheMeta.propTypes = {
  /** Render children */
  render: PropTypes.func,
  /** Document title */
  title: PropTypes.string,
}

TheMeta.defaultProps = {
  render: () => null,
  title: null,
}

TheMeta.displayName = 'TheMeta'

export default TheMeta
