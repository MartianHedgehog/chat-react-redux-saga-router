/* eslint-disable react/prop-types */
import { Input, Button } from 'react-chat-elements';
import React, { useState } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { connectToServer } from '../store/modules/connection';
import { createUser } from '../store/modules/userInformation';

import 'react-chat-elements/dist/main.css';
import './MainPage.css';

const MainPage = (props) => {
  const [input, setInput] = useState();
  const { username } = props;

  const getInput = (event) => {
    setInput(event.target.value);
  };

  const connecting = () => {
    if (!username) {
      localStorage.setItem('username', input);
      props.createUser(input, null);
    }
    props.connectToServer();
    props.push('/dialog');
  };

  return (
    <form className="main-page">
      <div className="welcome-container">
        <p className="h1 purple-text-color">Welcome</p>
        {!username ? (
          <div className="username-container">
            <p className="h4" color="#2dce89">
              Type username:
            </p>
            <Input onChange={getInput} type="text" />
          </div>
        ) : (
          <p className="h4 purple-text-color"> Connect as {username}</p>
        )}
        <Button
          backgroundColor="#2dce89"
          id="connect-button"
          onClick={() => connecting()}
          type="button"
          text="CONNECT"
        />
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  const { router, userInformation } = state;
  const { username } = userInformation;
  return {
    router,
    username,
  };
};

export default connect(mapStateToProps, {
  push,
  connectToServer,
  createUser,
})(MainPage);
