/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../store/modules/dialog';

const DialogPage = (props) => {
  const { dialog, userInformation } = props;
  const [input, setInput] = useState();
  const [MessagesFeed, setMessagesFeed] = useState();

  useEffect(() => {
    setMessagesFeed(dialog);
  }, [MessagesFeed, dialog]);

  const getInput = (event) => {
    setInput(event.target.value);
  };

  const messageBox = (data) => {
    return (
      <p key={data.timestamp}>
        {data.name}
        <br />
        {data.msg}
      </p>
    );
  };

  const sendValue = (msg, name) => {
    props.sendMessage(name, msg);
  };
  return (
    <div>
      {!(typeof MessagesFeed === 'undefined')
        ? Object.entries(MessagesFeed).map((el) => messageBox(el[1]))
        : null}
      <input onChange={getInput} type="text" />
      <button onClick={() => sendValue(input, userInformation.username)} type="button">
        {`SEND AS ${userInformation.username}`}
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
console.log(DialogPage.defaultProps);

export default connect(mapStateToProps, { sendMessage })(DialogPage);
