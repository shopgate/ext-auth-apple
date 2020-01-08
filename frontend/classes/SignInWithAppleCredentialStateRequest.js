import SignInWithAppleRequest from './SignInWithAppleRequest';

export const COMMAND_NAME = 'signInWithAppleCredentialStateRequest';
export const EVENT_NAME = 'signInWithAppleCredentialStateResponse';

/**
 * The SignInWithAppleCredentialStateRequest class.
 */
export class SignInWithAppleCredentialStateRequest extends SignInWithAppleRequest {
  /**
   * Constructor
   */
  constructor() {
    super(COMMAND_NAME, EVENT_NAME, []);
  }

  /**
   * Dispatch method.
   * @param {string} userIdentifier A user identifier.
  *  @returns {Promise}
   */
  dispatch(userIdentifier = null) {
    if (!userIdentifier) {
      return Promise.reject(new Error('Please provide a user identifier.'));
    }

    this.setCommandParams({
      userIdentifier,
    });

    return super.dispatch();
  }
}

export default new SignInWithAppleCredentialStateRequest();
