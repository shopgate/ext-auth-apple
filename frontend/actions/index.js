import { PipelineRequest, ERROR_HANDLE_SUPPRESS } from '@shopgate/engage/core';
import {
  requestAppleConfig,
  requestAppleConfigSuccess,
  requestAppleConfigError,
} from '../action-creators';

/**
 * Fetches the Apple Login configuration from the service.
 * @returns {Function}
 */
export function fetchAppleConfig() {
  return async (dispatch) => {
    dispatch(requestAppleConfig());

    try {
      const config = await new PipelineRequest('shopgate.apple.getConfig')
        .setTrusted()
        .setHandleErrors(ERROR_HANDLE_SUPPRESS)
        .dispatch();

      dispatch(requestAppleConfigSuccess(config));
    } catch {
      dispatch(requestAppleConfigError());
    }
  };
}
