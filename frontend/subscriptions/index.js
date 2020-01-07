import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import {
  login, logout, disableLogin, userDataReceived$,
} from '@shopgate/engage/user';
import {
  LoadingProvider, showModal, i18n,
} from '@shopgate/engage/core';
import {
  requestSignInWithAppleAuthorization,
  requestSignInWithAppleCredentialState,
} from '../classes';
import { signInWithApple$ } from '../streams';
import { fetchAppleConfig } from '../actions';

/**
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
  subscribe(userDataReceived$, async ({ dispatch, action }) => {
    dispatch(fetchAppleConfig());
    const result = await requestSignInWithAppleCredentialState(action.user.userIdentifier);
    if (result !== 'authorized') {
      dispatch(logout());
    }
  });

  subscribe(signInWithApple$, async ({ dispatch }) => {
    const { pattern, state: { redirect: { location = '' } = {} } = {} } = getCurrentRoute();
    LoadingProvider.setLoading(pattern);
    dispatch(disableLogin(true));

    try {
      const authorizationResponse = await requestSignInWithAppleAuthorization();
      dispatch(login({ authorizationResponse }, location, 'apple'));
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
