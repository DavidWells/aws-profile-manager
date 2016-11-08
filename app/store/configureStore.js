if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  module.exports = require('./configureStore.production')
} else {
  // eslint-disable-next-line global-require
  module.exports = require('./configureStore.development')
}
