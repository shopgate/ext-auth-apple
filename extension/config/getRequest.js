const { shopNumber } = require('../config.json')

/**
 * Returns the bigapi request options to request apple config from config service.
 * @returns {Object}
 */
module.exports = async () => ({
  service: 'config',
  version: 'v1',
  path: `shop/${shopNumber}/apple_login_config?parsed=true`,
  method: 'GET'
})
