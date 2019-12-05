import { createSelector } from 'reselect';

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
  return createSelector(
    getExtensionsState,
    state => state.enabled
  );
}
