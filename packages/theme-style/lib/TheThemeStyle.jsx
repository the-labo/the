'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { EOL } from 'os'
import { styleString } from 'the-style-util'

import TheAltStyle from 'the-alt/shim/TheAltStyle'
import TheBarStyle from 'the-bar/shim/TheBarStyle'
import TheBodyStyle from 'the-body/shim/TheBodyStyle'
import TheButtonStyle from 'the-button/shim/TheButtonStyle'
import TheCaughtStyle from 'the-caught/shim/TheCaughtStyle'
import TheConditionStyle from 'the-condition/shim/TheConditionStyle'
import TheContainerStyle from 'the-container/shim/TheContainerStyle'
import TheDialogStyle from 'the-dialog/shim/TheDialogStyle'
import TheDoneStyle from 'the-done/shim/TheDoneStyle'
import TheDrawerStyle from 'the-drawer/shim/TheDrawerStyle'
import TheFlickStyle from 'the-flick/shim/TheFlickStyle'
import TheFooterStyle from 'the-footer/shim/TheFooterStyle'
import TheFormStyle from 'the-form/shim/TheFormStyle'
import TheFrameStyle from 'the-frame/shim/TheFrameStyle'
import TheHamburgerStyle from 'the-hamburger/shim/TheHamburgerStyle'
import TheHeaderStyle from 'the-header/shim/TheHeaderStyle'
import TheHtmlStyle from 'the-html/shim/TheHtmlStyle'
import TheIconStyle from 'the-icon/shim/TheIconStyle'
import TheImageStyle from 'the-image/shim/TheImageStyle'
import TheInfoStyle from 'the-info/shim/TheInfoStyle'
import TheInputStyle from 'the-input/shim/TheInputStyle'
import TheLineStyle from 'the-line/shim/TheLineStyle'
import TheLinkStyle from 'the-link/shim/TheLinkStyle'
import TheListStyle from 'the-list/shim/TheListStyle'
import TheMainStyle from 'the-main/shim/TheMainStyle'
import TheMenuStyle from 'the-menu/shim/TheMenuStyle'
import ThePagerStyle from 'the-pager/shim/ThePagerStyle'
import TheRepeatableStyle from 'the-repeatable/shim/TheRepeatableStyle'
import TheRootStyle from 'the-root/shim/TheRootStyle'
import TheRouteStyle from 'the-route/shim/TheRouteStyle'
import TheRouterStyle from 'the-router/shim/TheRouterStyle'
import TheSectionStyle from 'the-section/shim/TheSectionStyle'
import TheSpinStyle from 'the-spin/shim/TheSpinStyle'
import TheStepStyle from 'the-step/shim/TheStepStyle'
import TheStyle from 'the-style/shim/TheStyle'
import TheTabStyle from 'the-tab/shim/TheTabStyle'
import TheTableStyle from 'the-table/shim/TheTableStyle'
import TheToastStyle from 'the-toast/shim/TheToastStyle'
import TheVideoStyle from 'the-video/shim/TheVideoStyle'
import TheViewStyle from 'the-view/shim/TheViewStyle'

/** Theme Style of the-components */
const TheThemeStyle = ({ id, className, prefix, options }) => (
  <TheStyle {...{ id, prefix }}
            className={c('the-theme-style', className)}
            styles={TheThemeStyle.data(options)}
  />
)

TheThemeStyle.displayName = 'TheThemeStyle'
TheThemeStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,

  /** Style selector prefix */
  prefix: PropTypes.string
}

TheThemeStyle.defaultProps = {
  options: {},
  prefix: null
}

TheThemeStyle.data = (options) => {
  return Object.assign({},
    ...[
      TheAltStyle,
      TheBarStyle,
      TheBodyStyle,
      TheButtonStyle,
      TheCaughtStyle,
      TheConditionStyle,
      TheContainerStyle,
      TheDialogStyle,
      TheDoneStyle,
      TheDrawerStyle,
      TheFlickStyle,
      TheFooterStyle,
      TheFormStyle,
      TheFrameStyle,
      TheHamburgerStyle,
      TheHeaderStyle,
      TheHtmlStyle,
      TheIconStyle,
      TheImageStyle,
      TheInfoStyle,
      TheInputStyle,
      TheLineStyle,
      TheLinkStyle,
      TheListStyle,
      TheMainStyle,
      TheMenuStyle,
      ThePagerStyle,
      TheRepeatableStyle,
      TheRootStyle,
      TheRouteStyle,
      TheRouterStyle,
      TheSectionStyle,
      TheSpinStyle,
      TheStepStyle,
      TheStyle,
      TheTabStyle,
      TheTableStyle,
      TheToastStyle,
      TheVideoStyle,
      TheViewStyle
    ].filter((Component) => Component.data).map((Component) => Component.data(options))
  )
}

TheThemeStyle.cssString = (options) => {
  const styles = TheThemeStyle.data(options)
  return styleString.fromStyles(styles)
}

TheThemeStyle.componentPaths = [
  'the-alt/shim/TheAltStyle',
  'the-bar/shim/TheBarStyle',
  'the-body/shim/TheBodyStyle',
  'the-button/shim/TheButtonStyle',
  'the-caught/shim/TheCaughtStyle',
  'the-condition/shim/TheConditionStyle',
  'the-container/shim/TheContainerStyle',
  'the-dialog/shim/TheDialogStyle',
  'the-done/shim/TheDoneStyle',
  'the-drawer/shim/TheDrawerStyle',
  'the-flick/shim/TheFlickStyle',
  'the-footer/shim/TheFooterStyle',
  'the-form/shim/TheFormStyle',
  'the-frame/shim/TheFrameStyle',
  'the-hamburger/shim/TheHamburgerStyle',
  'the-header/shim/TheHeaderStyle',
  'the-html/shim/TheHtmlStyle',
  'the-icon/shim/TheIconStyle',
  'the-image/shim/TheImageStyle',
  'the-info/shim/TheInfoStyle',
  'the-input/shim/TheInputStyle',
  'the-line/shim/TheLineStyle',
  'the-link/shim/TheLinkStyle',
  'the-list/shim/TheListStyle',
  'the-main/shim/TheMainStyle',
  'the-menu/shim/TheMenuStyle',
  'the-pager/shim/ThePagerStyle',
  'the-repeatable/shim/TheRepeatableStyle',
  'the-root/shim/TheRootStyle',
  'the-route/shim/TheRouteStyle',
  'the-router/shim/TheRouterStyle',
  'the-section/shim/TheSectionStyle',
  'the-spin/shim/TheSpinStyle',
  'the-step/shim/TheStepStyle',
  'the-style/shim/TheStyle',
  'the-tab/shim/TheTabStyle',
  'the-table/shim/TheTableStyle',
  'the-toast/shim/TheToastStyle',
  'the-video/shim/TheVideoStyle',
  'the-view/shim/TheViewStyle',

]

export default TheThemeStyle
