'use strict'

import classnames from 'classnames'
import React from 'react'
import { TheContainer } from '@the-/ui-container'
import { TheLink } from '@the-/ui-link'
import { htmlAttributesFor } from '@the-/util-ui'

/**
 * Footer of the-components
 */
const TheFooter = React.memo((props) => {
  const { children, className } = props
  return (
    <footer
      {...htmlAttributesFor(props, { except: ['className'] })}
      className={classnames('the-footer', className)}
    >
      <TheContainer className='the-footer-inner'>{children}</TheContainer>
    </footer>
  )
})

TheFooter.CopyRight = function TheFooterCopyRight({
  children,
  className,
  holder,
  year = new Date().getFullYear(),
}) {
  return (
    <div className={classnames('the-footer-copyright', className)}>
      {holder && `© ${year || ''} ${holder}`}
      {children}
    </div>
  )
}

TheFooter.Link = function TheFooterLink({ children, className, to }) {
  return (
    <TheLink className={classnames('the-footer-link', className)} to={to}>
      {children}
    </TheLink>
  )
}

TheFooter.Links = function TheFooterLinks({ children, className }) {
  return (
    <div className={classnames('the-footer-links', className)}>{children}</div>
  )
}

TheFooter.Row = function TheFooterRow({ children, className }) {
  return (
    <div className={classnames('the-footer-row', className)}>{children}</div>
  )
}

TheFooter.propTypes = {}

TheFooter.defaultProps = {
  role: 'contentinfo',
}

TheFooter.displayName = 'TheFooter'

export default TheFooter
