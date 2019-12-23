import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import { login, disableLogin } from '@shopgate/engage/user';
import { appWillStart$, LoadingProvider } from '@shopgate/engage/core';
import {
  requestSignInWithAppleAuthorization,
  // requestSignInWithAppleCredentialState,
} from '../classes';
import { signInWithApple$ } from '../streams';
import { fetchAppleConfig } from '../actions';

/**
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
  subscribe(appWillStart$, async ({ dispatch }) => {
    dispatch(fetchAppleConfig());
    // const result = await requestSignInWithAppleCredentialState();
    // Handle logout;
  });

  subscribe(signInWithApple$, async ({ dispatch }) => {
    const { pattern, state: { redirect: { location = '' } = {} } = {} } = getCurrentRoute();
    LoadingProvider.setLoading(pattern);
    dispatch(disableLogin(true));

    try {
      const authorizationResponse = await requestSignInWithAppleAuthorization();
      dispatch(login({ authorizationResponse }, location, 'apple'));
    } finally {
      LoadingProvider.unsetLoading(pattern);
      dispatch(disableLogin(false));
    }
  });
};
