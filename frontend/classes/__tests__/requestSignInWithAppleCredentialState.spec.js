import { logger } from '@shopgate/engage/core';
import signInWithAppleCredentialStateRequest from '../SignInWithAppleCredentialStateRequest';
import { requestSignInWithAppleCredentialState } from '../index';

const mockedResponse = {
  mock: 'response',
};

jest.mock('../SignInWithAppleCredentialStateRequest', () => ({
  dispatch: jest.fn().mockImplementation(() => Promise.resolve(mockedResponse)),
}));
jest.mock('@shopgate/engage/core', () => ({
  ...jest.requireActual('@shopgate/engage/core'),
  logger: {
    error: jest.fn(),
  },
}));

describe('requestSignInWithAppleCredentialState()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with response data', async () => {
    await expect(requestSignInWithAppleCredentialState()).resolves.toEqual(mockedResponse);
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('should reject with an error', async () => {
    const message = 'Error message';
    const error = new Error(message);
    signInWithAppleCredentialStateRequest.dispatch
      .mockImplementationOnce(() => Promise.reject(error));
    await expect(requestSignInWithAppleCredentialState()).rejects.toThrow(message);
    expect(logger.error).toHaveBeenCalledWith(error);
  });
});
