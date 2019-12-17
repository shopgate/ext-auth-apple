import { logger } from '@shopgate/engage/core';
import signInWithAppleAuthorizationRequest from '../SignInWithAppleAuthorizationRequest';
import { requestSignInWithAppleAuthorization } from '../index';

const mockedResponse = {
  mock: 'response',
};

jest.mock('../SignInWithAppleAuthorizationRequest', () => ({
  dispatch: jest.fn().mockImplementation(() => Promise.resolve(mockedResponse)),
}));
jest.mock('@shopgate/engage/core', () => ({
  ...jest.requireActual('@shopgate/engage/core'),
  logger: {
    error: jest.fn(),
  },
}));

describe('requestSignInWithAppleAuthorization()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with response data', async () => {
    await expect(requestSignInWithAppleAuthorization()).resolves.toEqual(mockedResponse);
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('should reject with an error', async () => {
    const message = 'Error message';
    const error = new Error(message);
    signInWithAppleAuthorizationRequest.dispatch
      .mockImplementationOnce(() => Promise.reject(error));
    await expect(requestSignInWithAppleAuthorization()).rejects.toThrow(message);
    expect(logger.error).toHaveBeenCalledWith(error);
  });
});
