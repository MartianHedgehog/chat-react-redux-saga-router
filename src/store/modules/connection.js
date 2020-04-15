export const CONNECT_TO_SERVER = 'CONNECT_TO_SERVER';

const initialState = {
  connectionStatus: 'disconnected',
};

const connection = (state = initialState, action) => {
  if (action.type === CONNECT_TO_SERVER) {
    return {
      ...state,
      connectionStatus: 'connected',
    };
  }
  return state;
};

export const connectToServer = () => ({
  type: CONNECT_TO_SERVER,
});

export default connection;
