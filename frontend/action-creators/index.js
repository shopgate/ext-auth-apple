import {
  SIGN_IN_WITH_APPLE,
  REQUEST_APPLE_CONFIG,
  REQUEST_APPLE_CONFIG_SUCCESS,
  REQUEST_APPLE_CONFIG_ERROR,
} from '../constants';

/**
 * Creates the SIGN_IN_WITH_APPLE action.
 * @returns {Object}
 */
export function signInWithApple() {
  return {
    type: SIGN_IN_WITH_APPLE,
  };
}

/**
 * Creates the REQUEST_APPLE_CONFIG action.
 * @returns {Object}
 */
export function requestAppleConfig() {
  return {
    type: REQUEST_APPLE_CONFIG,
  };
}

/**
 * Creates the REQUEST_APPLE_CONFIG_SUCCESS action.
 * @param {Object} config The apple config.
 * @returns {Object}
 */
export function requestAppleConfigSuccess(config) {
  return {
    type: REQUEST_APPLE_CONFIG_SUCCESS,
    config,
  };
}

/**
 * Creates the REQUEST_APPLE_CONFIG_ERROR action.
 * @returns {Object}
 */
export function requestAppleConfigError() {
  return {
    type: REQUEST_APPLE_CONFIG_ERROR,
  };
}
