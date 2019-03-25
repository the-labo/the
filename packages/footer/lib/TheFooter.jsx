'use strict'

import classnames from 'classnames'
import React from 'react'
import { TheContainer } from '@the-/container'
import { TheLink } from '@the-/link'
import { htmlAttributesFor } from '@the-/util-component'
import TheFooterStyle from './TheFooterStyle'

/**
 * Footer of the-components
 */
class TheFooter extends React.PureComponent {
  static CopyRight({ children, className, holder, year }) {
    return (
      <div className={classnames('the-footer-copyright', className)}>
        {holder && `© ${year || ''} ${holder}`}
        {children}
      </div>
    )
  }

  static Link({ children, className, to }) {
    return (
      <TheLink className={classnames('the-footer-link', className)} {...{ to }}>
        {children}
      </TheLink>
    )
  }

  static Links({ children, className }) {
    return (
      <div className={classnames('the-footer-links', className)}>
        {children}
      </div>
    )
  }

  static Row({ children, className }) {
    return (
      <div className={classnames('the-footer-row', className)}>{children}</div>
    )
  }

  render() {
    const { props } = this
    const { children, className } = props
    return (
      <footer
        {...htmlAttributesFor(props, { except: ['className'] })}
        className={classnames('the-footer', className)}
      >
        <TheContainer className='the-footer-inner'>{children}</TheContainer>
      </footer>
    )
  }
}

TheFooter.Style = TheFooterStyle

TheFooter.propTypes = {}

TheFooter.defaultProps = {
  role: 'contentinfo',
}

TheFooter.displayName = 'TheFooter'

export default TheFooter
