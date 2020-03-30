import React, { useState } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

const MainPage = (props) => {
  console.log(props);
  const [input, setInput] = useState();

  const getInput = (event) => {
    setInput(event.target.value);
  };

  // const redirectToDialog = () => {
  //   console.log(props);
  //   push('/dialog');
  // };

  return (
    <div>
      <input onChange={getInput} type="text" />
      {/* eslint-disable-next-line react/prop-types */}
      <button onClick={() => props.push('/dialog')} type="button">
        CONNECT
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { test, router } = state;
  return {
    test,
    router,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  push,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
