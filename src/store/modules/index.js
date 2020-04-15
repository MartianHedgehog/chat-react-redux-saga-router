import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import connection from './connection';
import dialog from './dialog';
import userInformation from './userInformation';

const RootReducer = (history) => {
  const router = connectRouter(history);
  return combineReducers({
    router,
    connection,
    userInformation,
    dialog,
  });
};

export default RootReducer;
