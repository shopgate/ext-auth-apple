import { REQUEST_APPLE_CONFIG_SUCCESS } from '../constants';

const defaultState = {
  enabled: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_APPLE_CONFIG_SUCCESS:
      return {
        ...state,
        ...action.config,
      };
    default:
      return state;
  }
};
