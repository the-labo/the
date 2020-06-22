'use strict'

import c from 'classnames'
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter,
  HashRouter,
  Router as AbstractRouter,
  StaticRouter,
} from 'react-router-dom'
import { htmlAttributesFor } from '@the-/util-ui'

/**
 * Router of the-components
 * @returns {*}
 */
function TheRouter({
  basename,
  children,
  className,
  getUserConfirmation,
  history,
  keyLength,
  ...otherProps
}) {
  const [location, setLocation] = useState(null)
  useEffect(() => {
    if (!history) {
      return
    }
    const unlisten = history.listen(() => {
      setLocation(history.location)
    })
    return () => {
      unlisten()
    }
  }, [history, setLocation])

  const Router = history ? AbstractRouter : BrowserRouter
  return (
    <Router
      basename={basename}
      getUserConfirmation={getUserConfirmation}
      history={history}
      keyLength={keyLength}
    >
      <div
        data-pathname={location?.pathname}
        {...htmlAttributesFor(otherProps, { except: ['className'] })}
        className={c('the-router', className)}
      >
        {children}
      </div>
    </Router>
  )
}

TheRouter.Hash = function Hash({
  basename,
  children,
  getUserConfirmation,
  hashType,
}) {
  return (
    <HashRouter
      basename={basename}
      getUserConfirmation={getUserConfirmation}
      hashType={hashType}
    >
      <div className='the-router-hash'>{children}</div>
    </HashRouter>
  )
}

TheRouter.Static = function Static({ basename, children, context, location }) {
  return (
    <StaticRouter basename={basename} context={context} location={location}>
      <div className='the-router-static'>{children}</div>
    </StaticRouter>
  )
}

TheRouter.propTypes = {}

TheRouter.defaultProps = {}

TheRouter.displayName = 'TheRouter'

export default TheRouter
