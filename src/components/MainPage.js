import React, { useState } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connectToServer } from '../store/modules/userInformation';

const MainPage = (props) => {
  console.log(props);
  const [input, setInput] = useState();

  const getInput = (event) => {
    setInput(event.target.value);
  };

  const connecting = () => {
    // eslint-disable-next-line react/prop-types
    props.dispatch(connectToServer(input));
    // eslint-disable-next-line react/prop-types
    props.push('/dialog');
  };

  return (
    <div>
      <input onChange={getInput} type="text" />
      {/* eslint-disable-next-line react/prop-types */}
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

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ push }, dispatch),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
