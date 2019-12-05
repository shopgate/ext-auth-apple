/**
 * Sanitizes incoming config.
 * @param {SDKContext} context context
 * @param {Object} input Step input.
 */
module.exports = async (context, { config }) => ({
  enabled: !!config.enabled
})
