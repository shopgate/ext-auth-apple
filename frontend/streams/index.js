import 'rxjs/add/operator/zip';
import 'rxjs/add/observable/of';
import { main$ } from '@shopgate/pwa-common/streams';
import { userDataReceived$ } from '@shopgate/engage/user';
import { SIGN_IN_WITH_APPLE, REQUEST_APPLE_CONFIG_SUCCESS } from '../constants';

export const signInWithApple$ = main$
  .filter(({ action }) => action.type === SIGN_IN_WITH_APPLE);

export const receivedAppleConfig$ = main$
  .filter(({ action }) => action.type === REQUEST_APPLE_CONFIG_SUCCESS);

export const receivedUserDataAndAppleConfig$ = userDataReceived$
  .zip(receivedAppleConfig$)
  .map(([first]) => first);
