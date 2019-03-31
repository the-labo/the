/**
 * Style theme values
 * @enum {string} ThemeValues
 */
'use strict'

const ThemeValues = Object.freeze(
  /** @lends ThemeValues */
  {
    // -----------------------------------
    // Coloring
    // -----------------------------------
    ...{
      altTextColor: '#AAA',
      backgroundColor: '#FFF',
      borderColor: '#AAA',
      captionBorderColor: '#F0F0F0',
      captionTextColor: '#999',
      dangerColor: '#B31818',
      disabledBackgroundColor: '#F0F0F0',
      disabledTextColor: '#CCC',
      dominantColor: '#ee8e0a',
      errorColor: '#B31818',
      infoColor: '#0C843A',
      inputBorderColor: '#AAA',
      inputShadowColor: 'rgba(0,0,0,.05)',
      lightBackgroundColor: '#F8F8F8',
      lightBorderColor: '#EEE',
      lightLinkColor: '#999',
      lightTextColor: '#BBB',
      overlayBackgroundColor: 'rgba(255,255,255,0.8)',
      overlayBorderColor: '#CCC',
      overlayTextColor: '#555',
      tabInactiveColor: '#AAA',
      textColor: '#555',
      warnColor: '#9C9C19',
    },

    // -----------------------------------
    // Sizing
    // -----------------------------------
    ...{
      containerWidth: 1024,
      contentPadding: 4,
      contentWidth: 480,
      headerHeight: 48,
      tappableHeight: 44,
    },

    // -----------------------------------
    // Font
    // -----------------------------------
    ...{
      fontFamily:
        'ヒラギノ角ゴ ProN W3, Hiragino Kaku Gothic ProN, メイリオ, Meiryo, sans-serif',
      fontSize: 16,
    },

    // -----------------------------------
    // Values
    // -----------------------------------
    ...{
      activeOpacity: 0.8,
      hoverOpacity: 0.9,
      largeMediaBreakpoint: 1200,
      mediumMediaBreakpoint: 992,
      smallMediaBreakpoint: 768,
    },
  },
)

module.exports = ThemeValues
