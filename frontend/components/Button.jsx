import React, { useContext, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import cxs from 'classnames';
import { connect } from 'react-redux';
import { LoadingContext } from '@shopgate/engage/core';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import { signInWithApple } from '../action-creators';

const button = css({
  border: 0,
  padding: 0,
  margin: 0,
  background: 'transparent',
  cursor: 'pointer',
  width: '100%',
  display: 'block',
});

const btnDisabled = css({
  opacity: '0.5',
});

const image = css({
  display: 'block',
  width: '100%',
  height: 'auto',
});

/**
 * Renders the actual login button.
 * @param {Object} props The component props.
 * @returns {JSX}
 */
function Button({ signIn }) {
  const { pattern } = getCurrentRoute();
  const { isLoading } = useContext(LoadingContext);
  const loading = isLoading(pattern);

  const btnClasses = cxs({
    [button]: true,
    [btnDisabled]: loading,
  });

  const handleSignIn = useCallback((event) => {
    event.preventDefault();

    if (!loading) {
      signIn();
    }
  }, [loading, signIn]);

  return (
    <button type="button" className={btnClasses} onClick={handleSignIn} disabled={loading}>
      <img
        className={image}
        src="https://appleid.cdn-apple.com/appleid/button?height=40&width=375&color=black&locale=de_DE&scale=2"
        alt="Sign in with Apple"
      />
    </button>
  );
}

Button.propTypes = {
  signIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  signIn: signInWithApple,
};

export default connect(null, mapDispatchToProps)(memo(Button));
