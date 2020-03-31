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
});

export default userInformation;
