import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { instagramTokenReceived } from '../store/modules/userInformation';

const InstagramAuth = () => {
  useEffect(() => {
    window.opener.postMessage(window.location.href.split('code=')[1].split('#')[0], '*');
    window.opener.focus();
    window.close();
  });
  return (
    <>
      <p>Processing</p>
    </>
  );
};

export default connect(null, { instagramTokenReceived })(InstagramAuth);
