import SignInWithAppleRequest from './SignInWithAppleRequest';

export const COMMAND_NAME = 'signInWithAppleAuthorizationRequest';
export const EVENT_NAME = 'signInWithAppleAuthorizationResponse';

/**
 * The SignInWithAppleAuthorizationRequest class.
 */
export class SignInWithAppleAuthorizationRequest extends SignInWithAppleRequest {
  /**
   * Constructor
   */
  constructor() {
    super(COMMAND_NAME, EVENT_NAME, []);
  }
}

export default new SignInWithAppleAuthorizationRequest();
