/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { connectToServer } from '../store/modules/userInformation';

const MainPage = (props) => {
  const [input, setInput] = useState();

  const getInput = (event) => {
    setInput(event.target.value);
  };

  const connecting = () => {
    props.connectToServer(input);
    props.push('/dialog');
  };

  return (
    <div>
      <input onChange={getInput} type="text" />
      <button onClick={() => connecting()} type="button">
        CONNECT
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { router, props } = state;
  return {
    router,
    props,
  };
};

export default connect(mapStateToProps, { push, connectToServer })(MainPage);
