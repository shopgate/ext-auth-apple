import {
  signInWithApple,
  requestAppleConfig,
  requestAppleConfigSuccess,
  requestAppleConfigError,
} from './index';
import {
  SIGN_IN_WITH_APPLE,
  REQUEST_APPLE_CONFIG,
  REQUEST_APPLE_CONFIG_SUCCESS,
  REQUEST_APPLE_CONFIG_ERROR,
} from '../constants';

describe('action-creators', () => {
  test('signInWithApple()', () => {
    const action = signInWithApple();
    expect(typeof action === 'object').toEqual(true);
    expect(action.type).toEqual(SIGN_IN_WITH_APPLE);
    expect(action).toEqual({ type: SIGN_IN_WITH_APPLE });
  });
  test('requestAppleConfig()', () => {
    const action = requestAppleConfig();
    expect(typeof action === 'object').toEqual(true);
    expect(action.type).toEqual(REQUEST_APPLE_CONFIG);
    expect(action).toEqual({ type: REQUEST_APPLE_CONFIG });
  });
  test('requestAppleConfigSuccess()', () => {
    const action = requestAppleConfigSuccess({ foo: 'bar' });
    expect(typeof action === 'object').toEqual(true);
    expect(action.type).toEqual(REQUEST_APPLE_CONFIG_SUCCESS);
    expect(action.config).toEqual({ foo: 'bar' });
    expect(action).toEqual({
      type: REQUEST_APPLE_CONFIG_SUCCESS,
      config: {
        foo: 'bar',
      },
    });
  });
  test('requestAppleConfigError()', () => {
    const action = requestAppleConfigError();
    expect(typeof action === 'object').toEqual(true);
    expect(action.type).toEqual(REQUEST_APPLE_CONFIG_ERROR);
    expect(action).toEqual({ type: REQUEST_APPLE_CONFIG_ERROR });
  });
});
