import { logger } from '@shopgate/engage/core';
import signInWithAppleAuthorizationRequest from './SignInWithAppleAuthorizationRequest';
import signInWithAppleCredentialStateRequest from './SignInWithAppleCredentialStateRequest';

/**
 * Requests a sign in with apple authorization.
 * @return {Promise}
 */
export const requestSignInWithAppleAuthorization = async () => {
  let response;

  try {
    response = await signInWithAppleAuthorizationRequest.dispatch();
  } catch (e) {
    logger.error(e);
    throw e;
  }

  return response;
};

/**
 * Requests the sign in with apple credential state.
 * @param {string} userIdentifier A sign in with apple user identifier.
 * @return {Promise}
 */
export const requestSignInWithAppleCredentialState = async (userIdentifier) => {
  let response;

  try {
    response = await signInWithAppleCredentialStateRequest.dispatch(userIdentifier);
  } catch (e) {
    logger.error(e);
    throw e;
  }

  return response;
};
