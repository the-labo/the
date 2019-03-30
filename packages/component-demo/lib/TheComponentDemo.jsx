'use strict'

import { highlightJsx } from 'ape-highlighting'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheBody, TheBodyStyle } from '@the-/body'
import { TheContainer, TheContainerStyle } from '@the-/container'
import { TheHead } from '@the-/head'
import { TheHeader, TheHeaderStyle } from '@the-/header'
import { TheHtml } from '@the-/html'
import { TheIcon, TheIconStyle } from '@the-/icon'
import { TheImageStyle } from '@the-/image'
import { TheLinkStyle } from '@the-/link'
import { TheMain, TheMainStyle } from '@the-/main'
import { TheRoot, TheRootStyle } from '@the-/root'
import { TheRouter } from '@the-/router'
import { TheStyle } from '@the-/style'

const githubRepoFor = (pkg) => {
  const { repository } = pkg
  if (!repository) {
    return null
  }
  if (typeof repository === 'string') {
    if (/^\//.test(repository)) {
      return `https://github.com/${repository}`
    }
    return repository
  }
  return repository.git
}

/**
 * Live demo of the-components
 */
class TheComponentDemo extends React.PureComponent {
  render() {
    const { props } = this
    let {
      children,
      className,
      id,
      js,
      pkg,
      renderingContext = {},
      snippet,
    } = props
    return (
      <TheHtml
        className={classnames('the-component-demo', className)}
        {...{ id }}
      >
        <TheHead
          description={`Demo of ${pkg.name} package`}
          js={js}
          title={`DEMO: ${pkg.name} `}
          version={pkg.version}
        >
          <TheIcon.CdnLink />
          <TheBodyStyle />
          <TheHeaderStyle />
          <TheIconStyle />
          <TheContainerStyle />
          <TheMainStyle /> <TheLinkStyle />
          <TheRootStyle />
          <TheImageStyle /> <TheStyle>{TheComponentDemo.css}</TheStyle>
        </TheHead>
        <TheBody className='the-component-demo-body' styles={{}}>
          <TheRouter.Static context={renderingContext}>
            <TheHeader>
              <TheHeader.Logo to={pkg.homepage}>{pkg.name}</TheHeader.Logo>
            </TheHeader>
            <TheMain>
              <div className='the-component-demo-workspace'>
                <TheContainer>
                  <TheRoot id='the-demo'>{children}</TheRoot>
                </TheContainer>
              </div>
              <br />
              <div>
                <TheContainer>
                  <pre
                    className='the-component-demo-snippet'
                    dangerouslySetInnerHTML={{
                      __html: snippet && highlightJsx(snippet),
                    }}
                  />
                </TheContainer>
              </div>
              <br />
              <div>
                <TheContainer>
                  <section>
                    <h1>Links</h1>
                    <ul>
                      <li>
                        <a href={githubRepoFor(pkg)}>{pkg.name} at GitHub</a>
                      </li>
                    </ul>
                  </section>
                </TheContainer>
              </div>
            </TheMain>
          </TheRouter.Static>
        </TheBody>
      </TheHtml>
    )
  }
}

TheComponentDemo.propTypes = {
  /** CSS class name */
  className: PropTypes.string,
  /** Package json for demo */
  pkg: PropTypes.object.isRequired,
  /** Snippet script */
  snippet: PropTypes.string,
}

TheComponentDemo.defaultProps = {
  className: null,
  pkg: null,
  snippet: null,
}

TheComponentDemo.displayName = 'TheComponentDemo'

TheComponentDemo.css = `
.the-component-demo-body {
  margin: 0;
  padding: 0;
  color: #555;
  background-color: #FAFAFA;
  font-family: "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", メイリオ, Meiryo, sans-serif;
}

.the-component-demo-workspace {
  display: block;
  padding: 40px;
  min-height: 120px;
  overflow-x: auto;
  background-image: -moz-linear-gradient(45deg, #F0F0F0 25%, transparent 25%), -moz-linear-gradient(-45deg, #F0F0F0 25%, transparent 25%), -moz-linear-gradient(45deg, transparent 75%, #F0F0F0 75%), -moz-linear-gradient(-45deg, transparent 75%, #F0F0F0 75%);
  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, #F0F0F0), color-stop(0.25, transparent)), -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.25, #F0F0F0), color-stop(0.25, transparent)), -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.75, transparent), color-stop(0.75, #F0F0F0)), -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.75, transparent), color-stop(0.75, #F0F0F0));
  background-color: white;
  -moz-background-size: 50px 50px;
  background-size: 50px 50px;
  -webkit-background-size: 50px 51px;
  background-position: 0 0, 25px 0, 25px -25px, 0px 25px;
  border: 1px solid #CCC;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1) inset;
}

.the-component-demo-snippet .syntaxhighlighter{
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #EEE;
  box-sizing: border-box;
}
.the-component-demo-snippet .syntaxhighlighter table td.code .container {
  position: relative !important;
}
`

export default TheComponentDemo
