import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { instagramTokenReceived } from '../store/modules/userInformation';

const InstagramAuth = () => {
  useEffect(() => {
    window.opener.postMessage(window.location.href.split('=')[1], '*');
    window.close();
  });
  return (
    <>
      <p>Processing</p>
    </>
  );
};

export default connect(null, { instagramTokenReceived })(InstagramAuth);
