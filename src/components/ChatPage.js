/* eslint-disable react/prop-types */
import { MessageBox, Input, Button } from 'react-chat-elements';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../store/modules/dialogs';
import { connectToServer } from '../store/modules/connection';
import SideMenu from './SideMenu';
import throttle from '../utils/throttle';

import 'react-chat-elements/dist/main.css';
import './ChatPage.css';

const ChatPage = (props) => {
  const { dialogs, userInformation, connectionStatus } = props;

  const [chatHeight, setChatHeight] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  const chatPage = useRef();
  const chatInput = useRef();
  const divMessages = useRef();
  const messageInput = useRef();

  const resizing = () => {
    return () => setChatHeight(chatPage.current?.clientHeight);
  };

  useEffect(() => {
    setChatHeight(chatPage.current.clientHeight);
    window.addEventListener('resize', resizing);
    return () => window.removeEventListener('resize', resizing);
  }, []);

  useEffect(() => {
    divMessages.current.scrollTop = divMessages.current.clientHeight;
  }, [dialogs]);

  // Throttling
  const updateInput = useCallback(
    throttle(() => setIsDisabled(!messageInput?.current?.input.value), 100),
    [],
  );

  // Renewing connection to server
  if (connectionStatus === 'disconnected') {
    props.connectToServer();
  }

  const sendValue = (event) => {
    event.preventDefault();
    if (!messageInput.current?.input.value.trim()) {
      return;
    }
    props.sendMessage(userInformation.username, messageInput.current.input.value);
    messageInput.current.clear();
  };
  return (
    <div ref={chatPage} className="chat-page">
      <SideMenu />
      <div className="dialog" style={{ height: chatHeight || 0 }}>
        <div className="messages" ref={divMessages}>
          {Object.prototype.hasOwnProperty.call(dialogs, 'roomName') ? (
            dialogs.roomName.map((el) => (
              <MessageBox
                position={userInformation.username === el.name ? 'right' : 'left'}
                date={el.timestamp}
                text={el.msg}
                title={el.name}
                key={el.timestamp}
              />
            ))
          ) : (
            <p>No messages here yet</p>
          )}
        </div>
        <form ref={chatInput} className="message-input" onSubmit={sendValue}>
          <Input
            onChange={updateInput}
            ref={messageInput}
            type="text"
            placeholder="Message..."
            autofocus
            autoHeight
            rightButtons={
              <Button
                disabled={isDisabled}
                backgroundColor={isDisabled ? 'grey' : '#2dce89'}
                type="submit"
                text="SEND"
              />
            }
          />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { dialogs, userInformation, connection } = state;
  const { connectionStatus } = connection;
  return {
    dialogs,
    userInformation,
    connectionStatus,
  };
};

export default connect(mapStateToProps, { sendMessage, connectToServer })(ChatPage);
