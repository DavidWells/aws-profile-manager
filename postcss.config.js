/*eslint-disable */
const localVars = require('./app/_css-variables')

/* Global CSS variables for use in CSS and JS */
const baseValue = 1
const unit = 'rem'
const baseFontSize = (baseValue * 1.6) + unit

const siteVars = {
  // -- Sizing
  unit: '1rem',
  navHeight: '70px',
  footerHeight: '155px',
  // -- Colors
  yellow: '#ffd734',
  red: '#e55934',
  gray1: '#aaa',
  gray2: '#202020',
  black1: '#212121',
  black2: '#191919',
  // -- Fonts
  fontSize: baseFontSize,
  fontSizeTiny: formatFont(1.2),
  fontSizeSmall: formatFont(1.4),
  fontSizeNormal: baseFontSize,
  fontSizeBig: formatFont(1.8),
  fontSizeH1: formatFont(3.0),
  fontSizeH2: formatFont(2.15),
  fontSizeH3: formatFont(1.7),
  fontSizeH4: formatFont(1.25),
  fontSizeH5: baseFontSize,
  fontSizeH6: formatFont(0.85),
  fontWeightThin: 300,
  fontWeightNormal: 400,
  fontWeightSemiBold: 500,
  fontWeightBold: 700,
  // -- Indexes
  zIndexHighest: 300,
  zIndexHigher: 200,
  zIndexHigh: 100,
  zIndexNormal: 1,
  zIndexLow: -100,
  zIndexLower: -200,
  // -- Breakpoints
  breakpointXxs: '480px',
  breakpointXs: '600px',
  breakpointSmTablet: '720px',
  breakpointSm: '840px',
  breakpointMd: '960px',
  breakpointLgTablet: '1024px',
  breakpointLg: '1280px',
  breakpointXl: '1440px',
  breakpointXxl: '1600px',
  breakpointXxxl: '1920px',
  // -- Animation
  animationDuration: '.35s',
  animationDelay: '.07s', // $animation-duration / 5,
  animationCurveFastOutSlowIn: 'cubic-bezier(0.4, 0, 0.2, 1)',
  animationCurveLinearOutSlowIn: 'cubic-bezier(0, 0, 0.2, 1)',
  animationCurveFastOutLinearIn: 'cubic-bezier(0.4, 0, 1, 1)',
  animationCurveDefault: 'cubic-bezier(0.4, 0, 0.2, 1)',
}

function formatFont(modifier) {
  return (modifier * baseValue) + unit
}

/* postCSS config */
module.exports = [
  require('postcss-cssnext')({ browsers: 'last 2 versions' }),
  /* require global variables */
  require('postcss-simple-vars')({
    variables: function variables() {
      const vars = {...siteVars, ...localVars}
      return vars
    },
    unknown: function unknown(node, name, result) {
      node.warn(result, `Unknown variable ${name}`)
    }
  }),
  /* enable nested css selectors like Sass/Less */
  require('postcss-nested'),
]
