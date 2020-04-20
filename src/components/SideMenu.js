import React from 'react';
import { connect } from 'react-redux';
import { ChatList, Button } from 'react-chat-elements';
import { push } from 'connected-react-router';
import { disconnectFromServer } from '../store/modules/connection';

import './ChatList.css';

const SideMenu = (props) => {
  const disconnectButtonHandler = () => {
    props.push('/');
    props.disconnectFromServer();
  };
  return (
    <div className="chat-list">
      <Button
        type="button"
        backgroundColor="red"
        text="DISCONNECT"
        onClick={disconnectButtonHandler}
      />
      <ChatList />
    </div>
  );
};

export default connect(null, { push, disconnectFromServer })(SideMenu);
