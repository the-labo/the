/**
 * @class Html
 */
'use strict'

import React from 'react'
import { TheBody, TheHead, TheHtml, TheRouter } from 'the-components'
import { GlobalKeys, locales, SrcSets, Styles, UI, Urls } from '@self/conf'
import App from './App'
import context from './context'

/** @lends Html */
function Html ({ appScope, renderingContext }) {
  const {
    buildNumber,
    cdnUrl,
    version,
  } = appScope
  const { client, handle, lang, path, store } = renderingContext
  const l = locales.bind(lang)
  handle.setAttributes({ client, l, lang, store })
  context.set({ handle, l, lang, state: store.state })
  const appProps = {
    lang,
  }
  return (
    <TheHtml>
      <TheHead cdn={cdnUrl}
               color={Styles.DOMINANT_COLOR}
               css={SrcSets.cssSet}
               globals={{ [GlobalKeys.APP]: {}, [GlobalKeys.PROPS]: appProps }}
               icon={Urls.ICON_URL}
               js={SrcSets.jsSet}
               title={l('app.APP_NAME')}
               version={[version, buildNumber].join('-')}
      >
      </TheHead>
      <TheBody>
        <div id={UI.APP_CONTAINER_ID}>
          <TheRouter.Static context={renderingContext}
                            location={path}
          >
            <App {...appProps} {...{ client, handle, store }}/>
          </TheRouter.Static>
        </div>
      </TheBody>
    </TheHtml>
  )
}

export default Html
