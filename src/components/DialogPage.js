import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import openSocket from 'socket.io-client';
import mapStateToProps from 'react-redux/lib/connect/mapStateToProps';

const DialogPage = (props) => {
  console.log(props);
  const socket = openSocket('http://localhost:8080');

  const [input, setInput] = useState();
  const [dialog, setDialog] = useState([]);

  const addNewMessage = useCallback(
    (message) => {
      setDialog([...dialog, message]);
    },
    [setDialog, dialog],
  );

  useEffect(() => {
    socket.on('message', addNewMessage);
    socket.on('room-event', (msg) => {
      console.log(msg);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNewMessage]);

  const getInput = (event) => {
    setInput(event.target.value);
  };

  const sendValue = (message, name) => {
    socket.emit('chat message', message, name);
  };
  return (
    <div>
      <input onChange={getInput} type="text" />
      <button onClick={() => sendValue(input, 'EUGENE')} type="button">
        SEND
      </button>
      {dialog.map((data) => (
        <p key={data.timestamp}>
          {data.name}
          <br />
          {data.msg}
        </p>
      ))}
    </div>
  );
};

export default connect(null, mapStateToProps)(DialogPage);
