'use strict'

import PropTypes from 'prop-types'
import React from 'react'
import { newId } from '@the-/util-ui'
import { get } from '@the-/window'

const MetaContext = React.createContext(null)

/**
 * Dynamic meta attribute injector for the-components
 */
class TheMeta extends React.Component {
  constructor(props) {
    super(props)
    this._id = newId({ prefix: 'the-meta' })
    this._titleQueue = []
  }

  get id() {
    const {
      props: { id = this._id },
    } = this
    return id
  }

  componentDidCatch(e) {
    this.restoreTitle()
    throw e
  }

  componentDidMount() {
    this.updateTitle()
  }

  componentDidUpdate() {
    this.updateTitle()
  }

  componentWillUnmount() {
    this.restoreTitle()
  }

  getTitle(options = {}) {
    const { full } = options
    const {
      props: { title },
    } = this
    const { title: baseTitle } = this.context || {}
    return [title, full ? baseTitle : null]
      .filter(Boolean)
      .map((t) => (typeof t === 'function' ? t() : t))
      .join(' | ')
  }

  render() {
    const {
      props: { children, render },
    } = this
    return (
      <>
        {render({ title: this.getTitle() })}
        {children}
      </>
    )
  }

  restoreTitle() {
    const document = get('window.document')
    while (this._titleQueue.length) {
      document.title = this._titleQueue.pop()
    }
  }

  updateTitle() {
    const document = get('window.document')
    const title = this.getTitle({ full: true })
    if (document.title !== title) {
      this._titleQueue.push(document.title)
      document.title = title
    }
  }
}

TheMeta.Root = React.memo(function TheMetaRoot({ children, title }) {
  return (
    <MetaContext.Provider value={{ title }}>{children}</MetaContext.Provider>
  )
})

TheMeta.contextType = MetaContext

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
