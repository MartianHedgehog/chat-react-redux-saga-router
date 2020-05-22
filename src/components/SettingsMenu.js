import React from 'react';
import { Button } from 'react-chat-elements';
import { push } from 'connected-react-router';

import './SettingsMenu.css';
import { connect } from 'react-redux';
import { disconnectFromServer } from '../store/modules/connection';

const SettingsMenu = (props) => {
  const disconnectButtonHandler = () => {
    props.push('/');
    props.disconnectFromServer();
  };

  return (
    // eslint-disable-next-line react/destructuring-assignment
    <div className={props.classes}>
      <Button
        type="button"
        backgroundColor="red"
        text="DISCONNECT"
        onClick={disconnectButtonHandler}
      />
    </div>
  );
};

export default connect(null, { push, disconnectFromServer })(SettingsMenu);
