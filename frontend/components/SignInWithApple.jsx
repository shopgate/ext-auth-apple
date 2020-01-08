import React from 'react';
import PropTypes from 'prop-types';
import cxs from 'classnames';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { isUserLoggedIn } from '@shopgate/engage/user';
import { themeConfig, themeName } from '@shopgate/pwa-common/helpers/config';
import Button from './Button';
import { makeGetIsEnabled } from '../selectors';

const { variables } = themeConfig;
const isIos = themeName.includes('ios');

const container = css({
  position: 'relative',
  marginBottom: variables.gap.small,
  marginLeft: isIos ? variables.gap.bigger : 0,
  marginRight: isIos ? variables.gap.bigger : 0,
});

const contained = css({
  marginLeft: 0,
  marginRight: 0,
});

/**
 * Renders the Sign in with Apple button.
 * @param {Object} props The component props.
 * @returns {JSX}
 */
function SignInWithApple({ visible, contain }) {
  if (!visible) {
    return null;
  }

  const classes = cxs({
    [container]: true,
    [contained]: contain,
  });

  return (
    <div className={classes}>
      <Button />
    </div>
  );
}

SignInWithApple.propTypes = {
  contain: PropTypes.bool,
  visible: PropTypes.bool,
};

SignInWithApple.defaultProps = {
  contain: false,
  visible: false,
};

/**
 * Create the mapStateToProps connector.
 * @returns {Function}
 */
function makeMapStateToProps() {
  const getIsEnabled = makeGetIsEnabled();

  return state => ({
    visible: !isUserLoggedIn(state) && getIsEnabled(state),
  });
}

export default connect(makeMapStateToProps)(SignInWithApple);
