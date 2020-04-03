import { v4 } from 'uuid';

const CONNECT_TO_SERVER = 'CONNECT_TO_SERVER';

const userInformation = (state = {}, action) => {
  if (action.type === 'CONNECT_TO_SERVER') {
    return {
      ...state,
      userName: action.userName,
    };
  }
  return state;
};

export const connectToServer = (userName) => ({
  type: CONNECT_TO_SERVER,
  userName,
  userId: v4(),
});

export default userInformation;
