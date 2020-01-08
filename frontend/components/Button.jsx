import React, { useContext, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { LoadingContext } from '@shopgate/engage/core';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import appConfig from '@shopgate/pwa-common/helpers/config';
import { signInWithApple } from '../action-creators';

/**
 * Transforms the app config language to ISO format.
 * @returns {string}
 */
function getLocale() {
  const pieces = appConfig.language.split('-');
  const locale = `${pieces[0]}_${pieces[1].toUpperCase()}`;
  return locale;
}

const button = css({
  border: 0,
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  width: '100%',
  display: 'block',
  height: 40,
  backgroundImage: `url('https://appleid.cdn-apple.com/appleid/button?height=40&width=375&color=black&locale=${getLocale()}&scale=2')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: 5,
});

const btnDisabled = css({
  opacity: '0.5',
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

  const btnClasses = classnames({
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
    <button type="button" className={btnClasses} onClick={handleSignIn} disabled={loading} />
  );
}

Button.propTypes = {
  signIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  signIn: signInWithApple,
};

export default connect(null, mapDispatchToProps)(memo(Button));
