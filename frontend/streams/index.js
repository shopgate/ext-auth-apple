import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { main$ } from '@shopgate/pwa-common/streams';
import { userDataReceived$, getUserData } from '@shopgate/engage/user';
import { SIGN_IN_WITH_APPLE, REQUEST_APPLE_CONFIG_SUCCESS } from '../constants';

export const signInWithApple$ = main$
  .filter(({ action }) => action.type === SIGN_IN_WITH_APPLE);

export const receivedAppleConfig$ = main$
  .filter(({ action }) => action.type === REQUEST_APPLE_CONFIG_SUCCESS);

export const receivedUserDataAndAppleConfig$ = receivedAppleConfig$
  .switchMap(({ getState }) => {
    const userData = getUserData(getState());

    if (!userData.userIdentifier) {
      return userDataReceived$;
    }

    return Observable.of(userData);
  });
