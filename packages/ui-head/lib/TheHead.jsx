'use strict'

import c from 'classnames'
import { expand } from 'objnest'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { spinalcase } from 'stringcase'

const addQuery = (url, query) => [url, query].join(/\?/.test(url) ? '&' : '?')
const viewPortString = (values) =>
  Object.keys(values || {})
    .map((key) => [spinalcase(key), values[key]].join('='))
    .join(',')
const stringify = (vars) => (vars ? JSON.stringify(vars) : 'null')

const ogProperty = (key) => {
  if (/^og:/.test(key)) {
    return key
  }

  return ['og', key].join(':')
}

/**
 * Head of the-components
 */
const TheHead = (props) => {
  const {
    base,
    baseTarget,
    cdn,
    charSet,
    children,
    className,
    color,
    css,
    icon,
    id,
    itemProps,
    js,
    manifest,
    metaContents,
    metaProperties,
    ogpContents,
    title,
    touchIcon,
    version,
    versionKey,
    viewPort,
  } = props

  const vQuery = useMemo(() => [versionKey, version].join('='), [
    version,
    versionKey,
  ])

  const urlFor = useCallback(
    (url) => {
      if (!url) {
        return null
      }

      if (vQuery) {
        url = addQuery(url, vQuery)
      }

      if (cdn && /^\//.test(url)) {
        url = new URL(url, cdn).href
      }

      return url
    },
    [vQuery, cdn],
  )

  const globals = expand(props.globals || {})
  const ogpEnabled = Object.keys(ogpContents || {}).length > 0
  const iconUrl = icon && urlFor(icon)
  const touchIconUrl = useMemo(() => {
    if (!touchIcon) {
      return null
    }

    if (typeof touchIcon === 'boolean') {
      return iconUrl
    }

    return touchIcon
  }, [touchIcon, iconUrl])
  return (
    <head
      className={c('the-head', className)}
      id={id}
      prefix={ogpEnabled ? 'og: http://ogp.me/ns#' : null}
    >
      {charSet && <meta charSet={charSet} className='the-head-charset' />}
      {base && (
        <base className='the-head-base' href={base} target={baseTarget} />
      )}
      {title && <title className='the-head-title'>{title}</title>}
      {icon && <link className='the-head-icon' href={iconUrl} rel='icon' />}
      {touchIcon && (
        <link
          className='the-head-touch-icon'
          href={touchIconUrl}
          rel='apple-touch-icon'
        />
      )}
      {viewPort && (
        <meta
          className='the-head-viewport'
          content={viewPortString(viewPort)}
          name='viewport'
        />
      )}
      {Object.keys(metaContents || {}).map((name) => (
        <meta
          className='the-head-meta-content'
          content={metaContents[name]}
          key={name}
          name={name}
        />
      ))}
      {Object.keys(metaProperties || {}).map((name) => (
        <meta
          className='the-head-meta-property'
          key={name}
          name={name}
          property={metaProperties[name]}
        />
      ))}
      {Object.keys(ogpContents || {}).map((property) => (
        <meta
          className='the-head-meta-ogp'
          content={ogpContents[property]}
          key={property}
          property={ogProperty(property)}
        />
      ))}
      {Object.keys(itemProps || {}).map((name) => (
        <meta
          className='the-head-item-prop'
          content={metaContents[name]}
          itemProp={name}
          key={name}
        />
      ))}
      {color && (
        <meta
          className='the-head-theme-color'
          content={color}
          name='theme-color'
        />
      )}
      <meta
        content="default-src * data: blob: 'unsafe-inline' 'unsafe-eval' ws: wss:;"
        httpEquiv='Content-Security-Policy'
      />
      {manifest && (
        <link
          className='the-head-manifest'
          href={urlFor(manifest)}
          rel='manifest'
        />
      )}
      {[]
        .concat(css)
        .filter(Boolean)
        .map((url) => (
          <link
            className='the-head-css'
            href={urlFor(url)}
            key={url}
            rel='stylesheet'
            type='text/css'
          />
        ))}
      {Object.keys(globals).map((name) => (
        <script
          className='the-head-globals'
          dangerouslySetInnerHTML={{
            __html: `window.${name}=${stringify(globals[name])}`,
          }}
          key={name}
          type='text/javascript'
        />
      ))}
      {[]
        .concat(js)
        .filter(Boolean)
        .map((url) => (
          <script
            className='the-head-js'
            defer
            key={url}
            src={urlFor(url)}
            type='text/javascript'
          />
        ))}
      {children}
    </head>
  )
}

TheHead.propTypes = {
  /** CSS class name */
  /** Base url */
  base: PropTypes.string,
  /** Target of base url. '_blank', '_parent', '_self', '_top' or frame name */
  baseTarget: PropTypes.string,
  /** CDN URL */
  cdn: PropTypes.string,
  /** Char set */
  charSet: PropTypes.string,
  className: PropTypes.string,
  /** Theme color */
  color: PropTypes.string,
  /** Global property for fall back */
  fallbackUnless: PropTypes.string,
  /** Global variables */
  globals: PropTypes.object,
  /** Favicon url */
  icon: PropTypes.string,
  /** DOM Id */
  id: PropTypes.string,
  /** Item props */
  itemProps: PropTypes.object,
  /** Path of manifest.json */
  manifest: PropTypes.string,
  /** Met contents */
  metaContents: PropTypes.object,
  /** Met properties */
  metaProperties: PropTypes.object,
  /** OGP contents */
  ogpContents: PropTypes.object,
  /** Document title */
  title: PropTypes.string,
  touchIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Version string */
  version: PropTypes.string,
  /** Key for version query */
  versionKey: PropTypes.string,
  /** View port settings */
  viewPort: PropTypes.object,
}

TheHead.defaultProps = {
  base: null,
  baseTarget: undefined,
  cdn: null,
  charSet: 'utf-8',
  className: null,
  color: null,
  globals: {},
  icon: null,
  id: null,
  itemProps: {},
  manifest: null,
  metaContents: {},
  metaProperties: {},
  ogpContents: {},
  title: null,
  touchIcon: true,
  version: 'unknown',
  versionKey: 'v',
  viewPort: { initialScale: '1.0', width: 'device-width' },
}

TheHead.displayName = 'TheHead'

export default TheHead
