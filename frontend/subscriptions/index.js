import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import { appWillStart$, LoadingProvider } from '@shopgate/engage/core';
import { requestSignInWithAppleAuthorization } from '@shopgate/pwa-core/commands/signInWithApple';
import { signInWithApple$ } from '../streams';
import { fetchAppleConfig } from '../actions';

/**
 * @param {Function} subscribe The subscribe function.
 */
export default (subscribe) => {
  subscribe(appWillStart$, ({ dispatch }) => {
    dispatch(fetchAppleConfig());
  });

  subscribe(signInWithApple$, () => {
    const { pattern } = getCurrentRoute();

    LoadingProvider.setLoading(pattern);
    requestSignInWithAppleAuthorization();
  });
};
