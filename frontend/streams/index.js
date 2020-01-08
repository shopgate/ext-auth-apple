import { main$ } from '@shopgate/pwa-common/streams';
import { SIGN_IN_WITH_APPLE } from '../constants';

export const signInWithApple$ = main$
  .filter(({ action }) => action.type === SIGN_IN_WITH_APPLE);
