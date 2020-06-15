import { v4 } from 'uuid';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const LOG_IN_VIA_INSTAGRAM = 'LOG_IN_VIA_INSTAGRAM';
export const INSTAGRAM_TOKEN_RECEIVED = 'INSTAGRAM_TOKEN_RECEIVED';
export const USER_ERROR = 'USER_ERROR';

// Reducer

const initialState = {
  username: null,
  userId: localStorage.getItem('userId') || v4(),
};

const userInformation = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        username: action.username,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        username: action.username,
        userId: action.userId,
      };
    }
    case USER_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

// Actions creators

export const authenticate = () => ({
  type: AUTHENTICATE,
});

export const logInViaInstagram = () => ({
  type: LOG_IN_VIA_INSTAGRAM,
});

export const instagramTokenReceived = (token) => ({
  type: INSTAGRAM_TOKEN_RECEIVED,
  token,
});

export const logOut = () => ({
  type: LOG_OUT,
  username: null,
  userId: v4(),
});

export const logIn = (username) => ({
  type: LOG_IN,
  username,
});

export const userError = (error) => ({
  type: USER_ERROR,
  error,
});

export default userInformation;
