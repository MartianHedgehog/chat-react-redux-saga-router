import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userInformation from './userInformation';
import dialog from './dialog';

const RootReducer = (history) => {
  const router = connectRouter(history);
  return combineReducers({
    router,
    userInformation,
    dialog,
  });
};

export default RootReducer;
