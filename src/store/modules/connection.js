export const CONNECT_TO_SERVER = 'CONNECT_TO_SERVER';
export const DISCONNECT_FROM_SERVER = 'DISCONNECT_FROM_SERVER';
export const CONNECTION_ERROR = 'CONNECTION_ERROR';

const initialState = {
  connectionStatus: 'disconnected',
};

const connection = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_TO_SERVER: {
      return {
        ...state,
        connectionStatus: 'connected',
      };
    }
    case DISCONNECT_FROM_SERVER: {
      return {
        ...state,
        connectionStatus: 'disconnected',
      };
    }
    case CONNECTION_ERROR: {
      return {
        ...state,
        connectionStatus: 'disconnected',
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};

export const connectToServer = () => ({
  type: CONNECT_TO_SERVER,
});

export const disconnectFromServer = () => ({
  type: DISCONNECT_FROM_SERVER,
});

export const connectionError = (error) => ({
  type: CONNECTION_ERROR,
  error,
});

export default connection;
