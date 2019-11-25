'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

/**
 * Html of the-components
 */
const TheHtml = React.memo(({ children, className, id, lang }) => (
  <html className={classnames('the-html', className)} id={id} lang={lang}>
    {children}
  </html>
))

TheHtml.propTypes = {
  /** CSS class name */
  className: PropTypes.string,
  /** DOM Id */
  id: PropTypes.string,
  /** Lang */
  lang: PropTypes.string,
  /** Style objects */
  styles: PropTypes.object,
}

TheHtml.defaultProps = {
  className: null,
  id: 'the-html',
  lang: null,
}

TheHtml.displayName = 'TheHtml'

export default TheHtml
