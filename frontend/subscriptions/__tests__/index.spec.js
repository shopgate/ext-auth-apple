import { clientInformationDidUpdate$, logger } from '@shopgate/engage/core';
import { login, logout, disableLogin } from '@shopgate/engage/user';
import { signInWithApple$, receivedUserDataAndAppleConfig$ } from '../../streams';
import {
  requestSignInWithAppleCredentialState,
  requestSignInWithAppleAuthorization,
} from '../../classes';
import { fetchAppleConfig } from '../../actions';
import subscriptions from '../index';

const mockedSupportsSignInWithApple = jest.fn().mockReturnValue(true);

jest.mock('../../classes', () => ({
  requestSignInWithAppleCredentialState: jest.fn(),
  requestSignInWithAppleAuthorization: jest.fn(),
}));

jest.mock('@shopgate/engage/user', () => ({
  ...jest.requireActual('@shopgate/engage/user'),
  login: jest.fn(),
  logout: jest.fn(),
  disableLogin: jest.fn(),
}));
jest.mock('@shopgate/engage/core', () => ({
  ...jest.requireActual('@shopgate/engage/core'),
  LoadingProvider: {
    setLoading: jest.fn(),
    unsetLoading: jest.fn(),
  },
  logger: {
    error: jest.fn(),
  },
  makeSupportsIdentityService: () => mockedSupportsSignInWithApple,
}));
jest.mock('@shopgate/pwa-common/helpers/router', () => ({
  getCurrentRoute: jest.fn().mockReturnValue({
    pattern: '/login',
    state: {},
  }),
}));
jest.mock('../../actions', () => ({
  fetchAppleConfig: jest.fn(),
}));

describe('Subscriptions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const subscribe = jest.fn();
  const dispatch = jest.fn();
  const getState = jest.fn();
  subscriptions(subscribe);

  it('should have N subscriptions', () => {
    expect(subscribe).toBeCalledTimes(3);
  });

  describe('clientInformationDidUpdate$', () => {
    const [[stream$, subscriber]] = subscribe.mock.calls;

    it('should have correct stream', () => {
      expect(stream$).toBe(clientInformationDidUpdate$);
    });

    it('should not fetch the apple config when sign in with apple is not supported', () => {
      mockedSupportsSignInWithApple.mockReturnValueOnce(false);
      subscriber({
        dispatch,
        getState,
      });
      expect(getState).toHaveBeenCalledTimes(1);
      expect(dispatch).not.toHaveBeenCalled();
    });

    it('should fetch the apple config', () => {
      subscriber({
        dispatch,
        getState,
      });
      expect(getState).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(fetchAppleConfig).toHaveBeenCalledTimes(1);
    });
  });

  describe('receivedUserDataAndAppleConfig$', () => {
    const [, [stream$, subscriber]] = subscribe.mock.calls;
    const userIdentifier = 'ABC123';
    const action = {
      user: {
        userIdentifier,
      },
    };

    it('should have correct stream', () => {
      expect(stream$).toBe(receivedUserDataAndAppleConfig$);
    });

    it('should logout the user', async () => {
      requestSignInWithAppleCredentialState.mockResolvedValueOnce('not-authorized');
      await subscriber({
        dispatch,
        action,
      });
      expect(requestSignInWithAppleCredentialState).toHaveBeenCalledTimes(1);
      expect(requestSignInWithAppleCredentialState).toHaveBeenCalledWith(userIdentifier);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(logout).toHaveBeenCalledTimes(1);
      expect(logger.error).not.toHaveBeenCalled();
    });

    it('should not logout the user when authorized', async () => {
      requestSignInWithAppleCredentialState.mockResolvedValueOnce('authorized');
      await subscriber({
        dispatch,
        action,
      });
      expect(requestSignInWithAppleCredentialState).toHaveBeenCalledTimes(1);
      expect(requestSignInWithAppleCredentialState).toHaveBeenCalledWith(userIdentifier);
      expect(dispatch).not.toHaveBeenCalled();
      expect(logout).not.toHaveBeenCalled();
      expect(logger.error).not.toHaveBeenCalled();
    });

    it('should log an error', async () => {
      const error = new Error('error');
      requestSignInWithAppleCredentialState.mockRejectedValueOnce(error);
      await subscriber({
        dispatch,
        action,
      });
      expect(requestSignInWithAppleCredentialState).toHaveBeenCalledTimes(1);
      expect(requestSignInWithAppleCredentialState).toHaveBeenCalledWith(userIdentifier);
      expect(dispatch).not.toHaveBeenCalled();
      expect(logout).not.toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledWith(error);
    });
  });

  describe('signInWithApple$', () => {
    const [,, [stream$, subscriber]] = subscribe.mock.calls;

    it('should have correct stream', () => {
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
