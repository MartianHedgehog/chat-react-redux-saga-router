import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import connection from './connection';
import dialogs from './dialogs';
import userInformation from './userInformation';

const RootReducer = (history) => {
  const router = connectRouter(history);
  return combineReducers({
    router,
    connection,
    userInformation,
    dialogs,
  });
};

export default RootReducer;
