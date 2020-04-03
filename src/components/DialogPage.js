import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../store/modules/dialog';

const DialogPage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { dialog, dispatch, userInformation } = props;
  const [input, setInput] = useState();
  const [dialogs, setDialogs] = useState();

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setDialogs(dialog);
  }, [dialogs, dialog]);

  console.log('WATCH HERE', props);
  const getInput = (event) => {
    setInput(event.target.value);
  };

  const messageBox = (data) => {
    console.log(data);
    return (
      <p key={data.timestamp}>
        {data.name}
        <br />
        {data.msg}
      </p>
    );
  };

  // const isEmpty = (obj) => {
  //   return Object.keys(obj).length === 0;
  // };

  const sendValue = (msg, name) => {
    dispatch(sendMessage(name, msg));
  };
  return (
    <div>
      {/* eslint-disable-next-line react/prop-types */}
      {!(typeof dialogs === 'undefined')
        ? Object.entries(dialogs).map((el) => messageBox(el[1]))
        : null}
      <input onChange={getInput} type="text" />
      {/* eslint-disable-next-line react/prop-types */}
      <button onClick={() => sendValue(input, userInformation.userName)} type="button">
        {/* eslint-disable-next-line react/prop-types */}
        {`SEND AS ${userInformation.userName}`}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { dialog, userInformation } = state;
  console.log(state);
  return {
    dialog,
    userInformation,
  };
};

export default connect(mapStateToProps, null)(DialogPage);

// {/* eslint-disable-next-line react/prop-types */}
// {dialog.map((data) => (
//   <p key={data.timestamp}>
//     {data.name}
//     <br />
//     {data.msg}
//   </p>
// ))}
// <input onChange={getInput} type="text" />
// <button onClick={() => console.log(input, 'EUGENE')} type="button">
//   SEND
//   </button>

// eslint-disable-next-line react/prop-types
// const [messages, setMessages] = useState();
// useEffect(() => {
//   // eslint-disable-next-line react/prop-types
//   setMessages(dialog);
//   console.log(messages);
// }, [messages, dialog]);

// const addNewMessage = useCallback(
//   (message) => {
//     setDialog([...dialog, message]);
//   },
//   [setDialog, dialog],
// );

// useEffect(() => {
//   socket.on('message', addNewMessage);
//   socket.on('room-event', (msg) => {
//     console.log(msg);
//   });
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [addNewMessage]);

// const getInput = (event) => {
//   setInput(event.target.value);
// };
