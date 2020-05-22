/* eslint-disable react/prop-types */
import { Input, Button } from 'react-chat-elements';
import React, { useState, useEffect } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { connectToServer } from '../store/modules/connection';
import { logIn, logOut, authenticate } from '../store/modules/userInformation';

import 'react-chat-elements/dist/main.css';
import './MainPage.css';

const MainPage = (props) => {
  const [input, setInput] = useState();

  useEffect(() => {
    props.authenticate();
  }, [props]);

  const { username, userId } = props;

  const getInput = (event) => {
    setInput(event.target.value);
  };

  const connecting = (event) => {
    event.preventDefault();

    if (!username) {
      props.logIn(input);
      localStorage.setItem('userId', userId);
    }
    props.connectToServer();
    props.push('/dialog');
  };

  const logOutHandler = () => {
    props.logOut();
    window.location.reload();
  };

  return (
    <div className="main-page">
      <div className="welcome-container">
        <p className="h1 purple-text-color">Welcome</p>
        {username ? (
          <div className="purple-text-color">
            <p className="h4">Connect as {username}</p>
          </div>
        ) : null}
        <form className="input-container" onSubmit={connecting}>
          {username ? null : (
            <div className="username-container">
              <p className="h4" color="#2dce89">
                Type username:
              </p>
              <Input onChange={getInput} type="text" />
            </div>
          )}
          <Button backgroundColor="#2dce89" type="submit" text="CONNECT" />
        </form>
        {username ? (
          <Button
            onClick={logOutHandler}
            id="button-logout-main-page"
            backgroundColor="transparent"
            color="red"
            text="Log out"
            type="button"
          />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { router, userInformation } = state;
  const { username, userId } = userInformation;
  return {
    router,
    username,
    userId,
  };
};

export default connect(mapStateToProps, {
  push,
  connectToServer,
  logOut,
  logIn,
  authenticate,
})(MainPage);
