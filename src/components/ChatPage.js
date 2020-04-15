/* eslint-disable react/prop-types */
import { MessageBox, Input, Button } from 'react-chat-elements';
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../store/modules/dialogs';
import { connectToServer } from '../store/modules/connection';
import ChatList from './ChatList';

import 'react-chat-elements/dist/main.css';
import '../assets/css/argon-design-system-react.css';
import './ChatPage.css';

const ChatPage = (props) => {
  const { dialogs, userInformation, connectionStatus } = props;
  const [chatHeight, setChatHeight] = useState();

  const chatPageHeight = useRef();
  const chatInputHeight = useRef();
  const divMessages = useRef();
  const messageInput = useRef();

  useEffect(() => {
    setChatHeight(chatPageHeight.current.clientHeight);
    divMessages.current.scrollIntoView({ block: 'end' });

    window.addEventListener('resize', () => {
      setChatHeight(chatPageHeight.current.clientHeight);
    });
  }, []);

  if (connectionStatus === 'disconnected') {
    props.connectToServer();
  }

  const sendValue = (event) => {
    event.preventDefault();

    props.sendMessage(userInformation.username, messageInput.current.input.value);
    messageInput.current.clear();
  };
  return (
    <div ref={chatPageHeight} className="chat-page">
      <ChatList />
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
        <form ref={chatInputHeight} className="message-input" onSubmit={sendValue}>
          <Input
            ref={messageInput}
            type="text"
            placeholder="Message..."
            autofocus
            autoHeight
            rightButtons={<Button backgroundColor="#2dce89" type="submit" text="SEND" />}
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
