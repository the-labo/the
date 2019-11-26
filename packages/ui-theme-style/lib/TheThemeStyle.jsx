// Code generated by coz. DO NOT EDIT.
'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { styleString } from '@the-/util-style'

import TheAltStyle from '@the-/ui-alt/shim/TheAltStyle'
import TheBarStyle from '@the-/ui-bar/shim/TheBarStyle'
import TheBodyStyle from '@the-/ui-body/shim/TheBodyStyle'
import TheButtonStyle from '@the-/ui-button/shim/TheButtonStyle'
import TheCaughtStyle from '@the-/ui-caught/shim/TheCaughtStyle'
import TheConditionStyle from '@the-/ui-condition/shim/TheConditionStyle'
import TheContainerStyle from '@the-/ui-container/shim/TheContainerStyle'
import TheDialogStyle from '@the-/ui-dialog/shim/TheDialogStyle'
import TheFooterStyle from '@the-/ui-footer/shim/TheFooterStyle'
import TheFormStyle from '@the-/ui-form/shim/TheFormStyle'
import TheFrameStyle from '@the-/ui-frame/shim/TheFrameStyle'
import TheHamburgerStyle from '@the-/ui-hamburger/shim/TheHamburgerStyle'
import TheHeaderStyle from '@the-/ui-header/shim/TheHeaderStyle'
import TheHtmlStyle from '@the-/ui-html/shim/TheHtmlStyle'
import TheIconStyle from '@the-/ui-icon/shim/TheIconStyle'
import TheImageStyle from '@the-/ui-image/shim/TheImageStyle'
import TheInfoStyle from '@the-/ui-info/shim/TheInfoStyle'
import TheInputStyle from '@the-/ui-input/shim/TheInputStyle'
import TheLinkStyle from '@the-/ui-link/shim/TheLinkStyle'
import TheMainStyle from '@the-/ui-main/shim/TheMainStyle'
import TheMenuStyle from '@the-/ui-menu/shim/TheMenuStyle'
import ThePagerStyle from '@the-/ui-pager/shim/ThePagerStyle'
import TheRootStyle from '@the-/ui-root/shim/TheRootStyle'
import TheRouteStyle from '@the-/ui-route/shim/TheRouteStyle'
import TheRouterStyle from '@the-/ui-router/shim/TheRouterStyle'
import TheSectionStyle from '@the-/ui-section/shim/TheSectionStyle'
import TheSpinStyle from '@the-/ui-spin/shim/TheSpinStyle'
import TheStepStyle from '@the-/ui-step/shim/TheStepStyle'
import TheStyle from '@the-/ui-style/shim/TheStyle'
import TheTabStyle from '@the-/ui-tab/shim/TheTabStyle'
import TheTableStyle from '@the-/ui-table/shim/TheTableStyle'
import TheToastStyle from '@the-/ui-toast/shim/TheToastStyle'
import TheVideoStyle from '@the-/ui-video/shim/TheVideoStyle'
import TheViewStyle from '@the-/ui-view/shim/TheViewStyle'

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
      TheLinkStyle,
      TheMainStyle,
      TheMenuStyle,
      ThePagerStyle,
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
  '@the-/ui-alt/shim/TheAltStyle',
  '@the-/ui-bar/shim/TheBarStyle',
  '@the-/ui-body/shim/TheBodyStyle',
  '@the-/ui-button/shim/TheButtonStyle',
  '@the-/ui-caught/shim/TheCaughtStyle',
  '@the-/ui-condition/shim/TheConditionStyle',
  '@the-/ui-container/shim/TheContainerStyle',
  '@the-/ui-dialog/shim/TheDialogStyle',
  '@the-/ui-footer/shim/TheFooterStyle',
  '@the-/ui-form/shim/TheFormStyle',
  '@the-/ui-frame/shim/TheFrameStyle',
  '@the-/ui-hamburger/shim/TheHamburgerStyle',
  '@the-/ui-header/shim/TheHeaderStyle',
  '@the-/ui-html/shim/TheHtmlStyle',
  '@the-/ui-icon/shim/TheIconStyle',
  '@the-/ui-image/shim/TheImageStyle',
  '@the-/ui-info/shim/TheInfoStyle',
  '@the-/ui-input/shim/TheInputStyle',
  '@the-/ui-link/shim/TheLinkStyle',
  '@the-/ui-main/shim/TheMainStyle',
  '@the-/ui-menu/shim/TheMenuStyle',
  '@the-/ui-pager/shim/ThePagerStyle',
  '@the-/ui-root/shim/TheRootStyle',
  '@the-/ui-route/shim/TheRouteStyle',
  '@the-/ui-router/shim/TheRouterStyle',
  '@the-/ui-section/shim/TheSectionStyle',
  '@the-/ui-spin/shim/TheSpinStyle',
  '@the-/ui-step/shim/TheStepStyle',
  '@the-/ui-style/shim/TheStyle',
  '@the-/ui-tab/shim/TheTabStyle',
  '@the-/ui-table/shim/TheTableStyle',
  '@the-/ui-toast/shim/TheToastStyle',
  '@the-/ui-video/shim/TheVideoStyle',
  '@the-/ui-view/shim/TheViewStyle',

]

export default TheThemeStyle
