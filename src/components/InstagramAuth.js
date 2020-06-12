import React from 'react';
import { Button } from 'react-chat-elements';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import renderInstagramAuthLink from '../utils/renderInstagramAuthLink';

const InstagramAuth = () => {
  function onClickRedirect() {
    const newWindow = window.open(
      renderInstagramAuthLink(),
      'instagramAuth',
      'height=200,width=150',
    );
    if (window.focus) newWindow.focus();
    return false;
    // window.location = renderInstagramAuthLink();
  }

  return <Button onClick={onClickRedirect} text="Log in with Instagram" type="button" />;
};

export default connect(null, { push })(InstagramAuth);
