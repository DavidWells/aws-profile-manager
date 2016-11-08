/*eslint-disable */
const localVars = require('./app/_css-variables')
const siteVars = require('serverless-site/src/_variables')
/* postCSS config */
module.exports = [
  require('postcss-cssnext')({ browsers: 'last 2 versions' }),
  /* require global variables */
  require('postcss-simple-vars')({
    variables: function variables() {
      const vars = {...siteVars, ...localVars}
      console.log('localVars', localVars)
      return vars
    },
    unknown: function unknown(node, name, result) {
      node.warn(result, `Unknown variable ${name}`)
    }
  }),
  /* enable nested css selectors like Sass/Less */
  require('postcss-nested'),
]
