import { login, disableLogin } from '@shopgate/engage/user';
import { signInWithApple$ } from '../../streams';
import { requestSignInWithAppleAuthorization } from '../../classes';
import subscriptions from '../index';

jest.mock('../../classes', () => ({
  requestSignInWithAppleAuthorization: jest.fn(),
}));

jest.mock('@shopgate/engage/user', () => ({
  login: jest.fn(),
  disableLogin: jest.fn(),
}));
jest.mock('@shopgate/engage/core', () => ({
  ...jest.requireActual('@shopgate/engage/core'),
  LoadingProvider: {
    setLoading: jest.fn(),
    unsetLoading: jest.fn(),
  },
}));
jest.mock('@shopgate/pwa-common/helpers/router', () => ({
  getCurrentRoute: jest.fn().mockReturnValue({
    pattern: '/login',
    state: {},
  }),
}));

describe('requestSignInWithAppleAuthorization()', () => {
  const subscribe = jest.fn();
  const dispatch = jest.fn();
  subscriptions(subscribe);

  it('should have N subscriptions', () => {
    expect(subscribe).toBeCalledTimes(3);
  });

  describe('should process sing in with apple', () => {
    beforeEach(() => {
      requestSignInWithAppleAuthorization.mockReset();
      disableLogin.mockReset();
      login.mockReset();
    });

    const [, [stream$, subscriber]] = subscribe.mock.calls;

    it('should have correct stream', async () => {
      expect(stream$).toBe(signInWithApple$);
    });

    it('should process sign in with apple', async () => {
      const response = { foo: 'bar' };
      requestSignInWithAppleAuthorization.mockResolvedValue(response);

      await subscriber({ dispatch });

      expect(login).toBeCalledWith(
        { authorizationResponse: response },
        '',
        'apple'
      );
    });

    it('should process failure from sign in with apple', async () => {
      requestSignInWithAppleAuthorization.mockRejectedValue(new Error('error'));

      await subscriber({ dispatch });

      expect(disableLogin).toBeCalledTimes(2);
      expect(login).not.toHaveBeenCalled();
    });
  });
});
