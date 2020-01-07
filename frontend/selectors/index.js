import { createSelector } from 'reselect';
import { isIos, makeSupportsIdentityService } from '@shopgate/engage/core';

const statePrefix = '@shopgate/auth-apple/reducer';

/**
 * @param {Object} state The application state.
 * @returns {Object}
 */
function getExtensionsState(state) {
  return state.extensions[statePrefix];
}

/**
 * Creates the getIsEnabled() selector.
 * @returns {Function}
 */
export function makeGetIsEnabled() {
  const supportsIdentityService = makeSupportsIdentityService('apple');

  return createSelector(
    getExtensionsState,
    isIos,
    supportsIdentityService,
    (state, isIosDevice, supported) => (state.enabled && isIosDevice && supported)
  );
}
