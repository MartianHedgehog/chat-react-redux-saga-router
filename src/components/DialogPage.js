/* eslint-disable react/prop-types */
import { MessageBox, Input, Button } from 'react-chat-elements';
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../store/modules/dialog';
import { connectToServer } from '../store/modules/connection';
import DialogList from './DialogList';

import 'react-chat-elements/dist/main.css';
import '../assets/css/argon-design-system-react.css';
import './DialogPage.css';

const DialogPage = (props) => {
  const { dialog, userInformation, connectionStatus } = props;
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

  const message = (data) => {
    return (
      <MessageBox
        position={userInformation.username === data.name ? 'right' : 'left'}
        date={data.timestamp}
        text={data.msg}
        title={data.name}
        key={data.timestamp}
      />
    );
  };

  const sendValue = (event) => {
    event.preventDefault();

    props.sendMessage(userInformation.username, messageInput.current.input.value);
    messageInput.current.clear();
  };
  return (
    <div ref={chatPageHeight} className="chat-page">
      <DialogList className="chat-list" />
      <div className="dialog" style={{ height: chatHeight || 0 }}>
        <div className="messages" ref={divMessages}>
          {Object.entries(dialog).length ? (
            Object.entries(dialog).map((el) => message(el[1]))
          ) : (
            <p className="lead">No messages here</p>
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
  const { dialog, userInformation, connection } = state;
  const { connectionStatus } = connection;
  return {
    dialog,
    userInformation,
    connectionStatus,
  };
};

export default connect(mapStateToProps, { sendMessage, connectToServer })(DialogPage);
