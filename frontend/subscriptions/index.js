import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import { login, logout, disableLogin } from '@shopgate/engage/user';

import {
  LoadingProvider,
  showModal,
  i18n,
  logger,
  clientInformationDidUpdate$,
  makeSupportsIdentityService,
} from '@shopgate/engage/core';
import {
  requestSignInWithAppleAuthorization,
  requestSignInWithAppleCredentialState,
} from '../classes';
import { signInWithApple$, receivedUserDataAndAppleConfig$ } from '../streams';
import { fetchAppleConfig } from '../actions';

/**
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
  const supportsSignInWithApple = makeSupportsIdentityService('apple');

  subscribe(clientInformationDidUpdate$, ({ dispatch, getState }) => {
    if (!supportsSignInWithApple(getState())) {
      return;
    }

    dispatch(fetchAppleConfig());
  });

  subscribe(receivedUserDataAndAppleConfig$, async ({ dispatch, action }) => {
    try {
      const result = await requestSignInWithAppleCredentialState(action.user.userIdentifier);
      if (result !== 'authorized') {
        dispatch(logout());
      }
    } catch (error) {
      logger.error(error);
    }
  });

  subscribe(signInWithApple$, async ({ dispatch }) => {
    const { pattern, state: { redirect: { location = '' } = {} } = {} } = getCurrentRoute();
    LoadingProvider.setLoading(pattern);
    dispatch(disableLogin(true));

    try {
      const authorizationResponse = await requestSignInWithAppleAuthorization();

      if (authorizationResponse !== null) {
        dispatch(login({ authorizationResponse }, location, 'apple'));
      }
    } catch (error) {
      dispatch(showModal({
        confirm: 'modal.ok',
        dismiss: null,
        title: null,
        message: i18n.text('@shopgate/apple-login.try_again_later'),
      }));
    } finally {
      LoadingProvider.unsetLoading(pattern);
      dispatch(disableLogin(false));
    }
  });
};
