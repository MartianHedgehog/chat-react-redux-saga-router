import React, { useState, useEffect, useCallback } from 'react';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8080');

const MainPage = () => {
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
        SEND_1
      </button>
      <button onClick={() => sendValue(input, 'VASYAN')} type="button">
        SEND_2
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

export default MainPage;
