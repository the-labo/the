'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

/**
 * Html of the-components
 */
class TheHtml extends React.PureComponent {
  /**
   * Define style
   * @param [options={}] options - Optional settings
   * @returns {Object} Style object
   */
  static styles(options = {}) {
    return {
      root: {},
    }
  }

  render() {
    const { props } = this
    const { children, className, id, lang, styles } = props
    return (
      <html
        className={classnames('the-html', className)}
        id={id}
        lang={lang}
        style={styles.root}
      >
        {children}
      </html>
    )
  }
}

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
  styles: TheHtml.styles({}),
}

TheHtml.displayName = 'TheHtml'

export default TheHtml
