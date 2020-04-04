import { v4 } from 'uuid';

export const CONNECT_TO_SERVER = 'CONNECT_TO_SERVER';

const userInformation = (state = {}, action) => {
  if (action.type === CONNECT_TO_SERVER) {
    return {
      ...state,
      username: action.username,
      userId: action.userId,
    };
  }
  return state;
};

export const connectToServer = (username) => ({
  type: CONNECT_TO_SERVER,
  username,
  userId: v4(),
});

export default userInformation;
