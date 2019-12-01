'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { styleString } from '@the-/util-style'

const EOL = '\n'

/**
 * Style of the-components
 */
const TheStyle = React.memo((props) => {
  const { children, className, id, prefix, styles, type } = props
  const getChildrenAsString = useCallback(() => {
    if (!children) {
      return null
    }

    return []
      .concat(children)
      .map((child) => child)
      .join(EOL)
  }, [children])

  const getStylesAsString = useCallback(() => {
    if (!styles) {
      return null
    }

    return Object.keys(styles)
      .map((selector) =>
        styleString(
          [prefix, selector].filter(Boolean).join(' '),
          styles[selector],
        ),
      )
      .filter(Boolean)
      .join(EOL)
  }, [prefix, styles])

  const getInnerHTML = useCallback(
    () =>
      [getStylesAsString(), getChildrenAsString()].filter(Boolean).join(EOL),
    [getStylesAsString, getChildrenAsString],
  )

  return (
    <style
      className={c('the-style', className)}
      dangerouslySetInnerHTML={{ __html: getInnerHTML() }}
      id={id}
      type={type}
    />
  )
})

TheStyle.propTypes = {
  /** CSS class name */
  className: PropTypes.string,
  /** DOM Id */
  id: PropTypes.string,
  /** Style selector prefix */
  prefix: PropTypes.string,
  /** Script type */
  type: PropTypes.string,
}

TheStyle.defaultProps = {
  className: null,
  id: null,
  prefix: null,
  type: null,
}

TheStyle.displayName = 'TheStyle'

export default TheStyle
